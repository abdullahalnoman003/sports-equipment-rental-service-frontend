/**
 * Multi-provider LLM access for the Section 9 AI features.
 *
 * Design rules, in priority order:
 *
 * 1. **The keys never leave the server.** Everything here is called from server
 *    actions, and nothing in this file is imported by a client component.
 * 2. **Never throw.** Providers get rate limited, time out and get retired. Each
 *    entry point takes a fallback and returns it rather than failing, so a dead
 *    API degrades the experience instead of breaking it.
 * 3. **Fail over fast.** Without a circuit breaker, every request would sit
 *    through a dead provider's timeout before trying the next one. After two
 *    consecutive failures a provider is skipped for a cool-off window.
 * 4. **Stay inside the free tier.** Identical prompts are cached, and calls are
 *    capped per provider.
 * 5. **Obey the house rule.** Output is cleaned of em and en dashes, because
 *    models write them regardless of what the prompt says.
 */

import { cleanText } from "@/lib/text"
import { systemContext } from "@/lib/ai/context"
import { configuredProviders, anyProviderConfigured, type Provider } from "@/lib/ai/providers"

const TIMEOUT_MS = 8000

/** True when at least one provider has a key. */
export function isAiConfigured(): boolean {
  return anyProviderConfigured()
}

// ---------------------------------------------------------------------------
// Cache
// ---------------------------------------------------------------------------

const cache = new Map<string, { at: number; value: unknown }>()
const CACHE_TTL_MS = 10 * 60 * 1000
const CACHE_MAX = 200

function cacheGet(key: string): unknown | undefined {
  const hit = cache.get(key)
  if (!hit) return undefined
  if (Date.now() - hit.at > CACHE_TTL_MS) {
    cache.delete(key)
    return undefined
  }
  return hit.value
}

function cacheSet(key: string, value: unknown) {
  if (cache.size >= CACHE_MAX) {
    const oldest = cache.keys().next().value
    if (oldest !== undefined) cache.delete(oldest)
  }
  cache.set(key, { at: Date.now(), value })
}

// ---------------------------------------------------------------------------
// Rate limiting
// ---------------------------------------------------------------------------

const MAX_PER_MINUTE = 20
const WINDOW_MS = 60_000

class Bucket {
  private hits: number[] = []

  allow(): boolean {
    const now = Date.now()
    while (this.hits.length && now - this.hits[0] > WINDOW_MS) this.hits.shift()
    return this.hits.length < MAX_PER_MINUTE
  }

  record() {
    this.hits.push(Date.now())
  }
}

const buckets = new Map<string, Bucket>()
function bucketFor(id: string): Bucket {
  let b = buckets.get(id)
  if (!b) {
    b = new Bucket()
    buckets.set(id, b)
  }
  return b
}

// ---------------------------------------------------------------------------
// Circuit breaker
// ---------------------------------------------------------------------------

const FAILURES_BEFORE_TRIP = 2
const COOL_OFF_MS = 120_000

interface Breaker {
  failures: number
  openUntil: number
}

const breakers = new Map<string, Breaker>()

function isTripped(provider: Provider): boolean {
  const b = breakers.get(provider.id)
  return Boolean(b && b.openUntil > Date.now())
}

function recordFailure(provider: Provider) {
  const b = breakers.get(provider.id) ?? { failures: 0, openUntil: 0 }
  b.failures += 1
  if (b.failures >= FAILURES_BEFORE_TRIP) {
    b.openUntil = Date.now() + COOL_OFF_MS
    b.failures = 0
  }
  breakers.set(provider.id, b)
}

function recordSuccess(provider: Provider) {
  breakers.delete(provider.id)
}

/** Exposed for diagnostics and the README. */
export function breakerState(): Record<string, { failures: number; openUntil: number }> {
  return Object.fromEntries(breakers.entries())
}

// ---------------------------------------------------------------------------
// Response parsing
// ---------------------------------------------------------------------------

/**
 * Pulls JSON out of a model response. Models sometimes wrap JSON in a markdown
 * fence or add a sentence of preamble despite being asked for JSON only, so this
 * strips fences and falls back to slicing the outermost braces.
 */
export function parseModelJson<T>(raw: string): T | null {
  const text = raw.trim()
  if (!text) return null

  const candidates = [text]

  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (fenced?.[1]) candidates.push(fenced[1].trim())

  const first = text.indexOf("{")
  const last = text.lastIndexOf("}")
  if (first !== -1 && last > first) candidates.push(text.slice(first, last + 1))

  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate) as T
    } catch {
      continue
    }
  }
  return null
}

// ---------------------------------------------------------------------------
// Wire adapters
// ---------------------------------------------------------------------------

interface WirePart {
  text: string
}
interface WireResponse {
  candidates?: { content?: { parts?: WirePart[] } }[]
  choices?: { message?: { content?: string } }[]
}

/**
 * Google `generateContent`.
 *
 * `jsonMode` only sets `responseMimeType` when the caller actually wants JSON.
 * Forcing it on a plain text answer makes Gemini wrap the reply in an object,
 * which then renders to the user as raw JSON.
 */
async function callGemini(
  provider: Provider,
  model: string,
  key: string,
  system: string,
  prompt: string,
  jsonMode: boolean
): Promise<string | null> {
  const generationConfig: Record<string, unknown> = {
    temperature: 0.4,
    maxOutputTokens: 1024,
  }
  if (jsonMode) generationConfig.responseMimeType = "application/json"

  const res = await fetch(`${provider.baseUrl}/models/${model}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: "no-store",
  })

  if (!res.ok) return null

  const json = (await res.json()) as WireResponse
  const parts = json.candidates?.[0]?.content?.parts
  const text = parts?.map((p) => p.text ?? "").join("") ?? ""
  return text || null
}

/** OpenAI `chat/completions`, which Groq, OpenRouter, NVIDIA and Mistral all speak. */
async function callOpenAi(
  provider: Provider,
  model: string,
  key: string,
  system: string,
  prompt: string
): Promise<string | null> {
  const res = await fetch(`${provider.baseUrl}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
      max_tokens: 1024,
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: "no-store",
  })

  if (!res.ok) return null

  const json = (await res.json()) as WireResponse
  const text = json.choices?.[0]?.message?.content ?? ""
  return text || null
}

/**
 * Walks every configured provider, then every model within each, until one
 * answers. Returns the text plus which provider served it, so the UI can be
 * honest about who replied.
 */
async function callAnyProvider(
  system: string,
  prompt: string,
  jsonMode: boolean
): Promise<{ text: string; provider: string } | null> {
  for (const provider of configuredProviders()) {
    if (isTripped(provider)) continue

    const key = process.env[provider.envKey]?.trim()
    if (!key) continue

    const bucket = bucketFor(provider.id)
    if (!bucket.allow()) continue

    for (const model of provider.models) {
      try {
        bucket.record()

        const text =
          provider.format === "gemini"
            ? await callGemini(provider, model, key, system, prompt, jsonMode)
            : await callOpenAi(provider, model, key, system, prompt)

        if (text) {
          recordSuccess(provider)
          return { text, provider: provider.label }
        }

        // A failure here usually means that model is gone for this key. Record
        // it and move to the next model rather than the next provider, because
        // the next provider's primary model is unrelated.
        recordFailure(provider)
      } catch {
        // Timeout or network error.
        recordFailure(provider)
      }
    }
  }

  return null
}

// ---------------------------------------------------------------------------
// Public entry point
// ---------------------------------------------------------------------------

/** Applies the no-dash house rule to every string in a model response. */
function sanitizeStrings<T>(value: T): T {
  if (typeof value === "string") return cleanText(value) as unknown as T
  if (Array.isArray(value)) return value.map(sanitizeStrings) as unknown as T
  if (value !== null && typeof value === "object") {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) out[k] = sanitizeStrings(v)
    return out as unknown as T
  }
  return value
}

/**
 * Asks the configured providers for JSON matching `shape`, falling back when
 * anything goes wrong.
 *
 * `shape` is a human readable description of the expected JSON, passed to the
 * model as a schema hint. It is not enforced at runtime, so `validate` exists to
 * reject malformed output before it reaches the UI.
 *
 * The system prompt is always the shared site context, so every provider answers
 * as GearUp regardless of which one ends up serving the request.
 */
export async function askAi<T>(opts: {
  task: string
  catalog?: string
  extra?: string[]
  shape: string
  fallback: T
  validate?: (value: unknown) => value is T
  cacheKey?: string
}): Promise<{ value: T; powered: boolean; provider: string | null }> {
  const { task, catalog, extra, shape, fallback, validate, cacheKey } = opts

  if (!isAiConfigured()) return { value: fallback, powered: false, provider: null }

  const key = cacheKey ?? `${task}::${catalog ?? ""}`
  const cached = cacheGet(key)
  if (cached !== undefined) {
    return { value: cached as T, powered: true, provider: lastProvider }
  }

  const system = [
    systemContext(),
    "",
    `Respond with JSON only, no prose and no markdown fences. Shape: ${shape}`,
  ].join("\n")

  const prompt = [catalog ? `Live catalog:\n${catalog}` : "", ...(extra ?? []), task]
    .filter(Boolean)
    .join("\n\n")

  const raw = await callAnyProvider(system, prompt, true)
  if (!raw) return { value: fallback, powered: false, provider: null }

  const parsed = parseModelJson<T>(raw.text)
  if (parsed === null) return { value: fallback, powered: false, provider: null }
  if (validate && !validate(parsed)) return { value: fallback, powered: false, provider: null }

  lastProvider = raw.provider
  const value = sanitizeStrings(parsed)
  cacheSet(key, value)
  return { value, powered: true, provider: raw.provider }
}

/**
 * Plain text variant, for the chat assistant which does not want JSON.
 */
export async function askAiText(opts: {
  task: string
  catalog?: string
  extra?: string[]
  fallback: string
  maxLength?: number
  cacheKey?: string
}): Promise<{ text: string; powered: boolean; provider: string | null }> {
  const { task, catalog, extra, fallback, maxLength = 900, cacheKey } = opts

  if (!isAiConfigured()) return { text: fallback, powered: false, provider: null }

  const key = cacheKey ?? `text:${task}::${catalog ?? ""}`
  const cached = cacheGet(key)
  if (cached !== undefined) {
    return { text: cached as string, powered: true, provider: lastProvider }
  }

  const system = systemContext()
  const prompt = [
    catalog ? `Live catalog:\n${catalog}` : "",
    ...(extra ?? []),
    task,
    "Answer in plain prose. Do not wrap your answer in JSON or any other format.",
  ]
    .filter(Boolean)
    .join("\n\n")

  const raw = await callAnyProvider(system, prompt, false)
  if (!raw) return { text: fallback, powered: false, provider: null }

  const text = cleanText(unwrapAnswer(raw.text).trim())
  if (!text || text.length > maxLength) return { text: fallback, powered: false, provider: null }

  lastProvider = raw.provider
  cacheSet(key, text)
  return { text, powered: true, provider: raw.provider }
}

/**
 * Safety net for the chat assistant.
 *
 * Even without `responseMimeType`, a model can decide to answer in JSON, and the
 * key name it picks is unpredictable (`answer`, `response`, `text`...). Rather
 * than show raw JSON to a renter, dig out the first usable string field. If the
 * reply is genuine prose, it passes through untouched.
 */
function unwrapAnswer(raw: string): string {
  const trimmed = raw.trim()
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return trimmed

  const parsed = parseModelJson<unknown>(trimmed)
  if (parsed === null) return trimmed

  if (typeof parsed === "string") return parsed

  if (Array.isArray(parsed)) {
    const first = parsed.find((v) => typeof v === "string")
    return typeof first === "string" ? first : trimmed
  }

  if (parsed && typeof parsed === "object") {
    const record = parsed as Record<string, unknown>
    // Prefer the conventional answer keys, then fall back to the first string.
    for (const key of ["answer", "response", "text", "message", "reply", "content"]) {
      const value = record[key]
      if (typeof value === "string" && value.trim()) return value
    }
    const firstString = Object.values(record).find(
      (v) => typeof v === "string" && v.trim().length > 0
    )
    if (typeof firstString === "string") return firstString
  }

  return trimmed
}

/**
 * Remembers which provider produced the most recent answer, so a cache hit can
 * still be attributed to the right one.
 */
let lastProvider: string | null = null