"use server"

/**
 * Server actions backing the Section 9 AI features.
 *
 * Each action asks Gemini for a better result and always returns something
 * usable. The local fallback is not a stub: it is a real, deterministic
 * implementation over live catalog data, so the features work with or without
 * an API key, and degrade in quality rather than disappearing.
 */

import { askAi, askAiText, isAiConfigured } from "@/lib/ai"
import { taskPrompt } from "@/lib/ai/context"
import { fetchAllGear } from "@/app/(publicSection)/_actions/gear"
import { getToken } from "@/lib/get-token"
import { api } from "@/service/api"
import type { Gear, Rental } from "@/lib/types"

// ---------------------------------------------------------------------------
// Shared context
// ---------------------------------------------------------------------------

interface CatalogEntry {
  id: string
  name: string
  brand: string
  category: string
  price: number
  available: boolean
}

/**
 * Compact catalog digest for the prompt. Sending every field of every item
 * wastes tokens, and on the free tier tokens are the scarce resource.
 */
async function catalog(limit = 40): Promise<CatalogEntry[]> {
  const res = await fetchAllGear("", { next: { revalidate: 300 } })
  if (!res.success) return []

  const items = (res.data as Gear[]) ?? []
  return items.slice(0, limit).map((g) => ({
    id: g.id,
    name: g.name,
    brand: g.brand ?? "",
    category: g.category_Name ?? "",
    price: Number(g.price) || 0,
    // Stock is tracked as a quantity rather than a boolean.
    available: Number(g.quantity) > 0,
  }))
}

function catalogLine(c: CatalogEntry): string {
  return `${c.name} | brand: ${c.brand || "n/a"} | category: ${c.category || "n/a"} | BDT ${c.price}${c.available ? "" : " | unavailable"}`
}

// ---------------------------------------------------------------------------
// Feature 1: AI search suggestions
// ---------------------------------------------------------------------------

export interface Suggestion {
  label: string
  kind: "gear" | "category" | "brand" | "question"
}

/** Token overlap between the query and a catalog item. Cheap but effective. */
function scoreLocal(query: string, entry: CatalogEntry): number {
  const q = query.toLowerCase()
  const haystack = `${entry.name} ${entry.brand} ${entry.category}`.toLowerCase()

  let score = 0
  if (haystack.includes(q)) score += 5
  for (const token of q.split(/\s+/).filter(Boolean)) {
    if (entry.name.toLowerCase().includes(token)) score += 3
    if (entry.category.toLowerCase().includes(token)) score += 2
    if (entry.brand.toLowerCase().includes(token)) score += 2
  }
  return score
}

/**
 * Suggestions shown under the search box as the user types.
 * The local path matches against the real catalog, so it always has something
 * useful to offer even with no API key.
 */
export async function suggestSearch(query: string): Promise<Suggestion[]> {
  const q = query.trim()
  if (q.length < 2) return []

  const items = await catalog(40)

  const local = (): Suggestion[] => {
    const scored = items
      .map((entry) => ({ entry, score: scoreLocal(q, entry) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map<Suggestion>((r) => ({ label: r.entry.name, kind: "gear" }))

    const categories = Array.from(new Set(items.map((i) => i.category).filter(Boolean)))
      .filter((c) => c.toLowerCase().includes(q.toLowerCase()))
      .slice(0, 2)
      .map<Suggestion>((c) => ({ label: c, kind: "category" }))

    const brands = Array.from(new Set(items.map((i) => i.brand).filter(Boolean)))
      .filter((b) => b.toLowerCase().includes(q.toLowerCase()))
      .slice(0, 2)
      .map<Suggestion>((b) => ({ label: b, kind: "brand" }))

    return [...scored, ...categories, ...brands].slice(0, 6)
  }

  const { value, powered } = await askAi<Suggestion[]>({
    task: taskPrompt({
      task: `The user has typed "${q}" in the search box. Suggest up to 5 completions a real renter would find useful. Prefer exact catalog item names.`,
      extra: ["Aim for one or two words each. Match the kind to the label."],
    }),
    catalog: items.map(catalogLine).join("\n"),
    shape: '{ "suggestions": [{ "label": string, "kind": "gear" | "category" | "brand" | "question" }] }',
    fallback: local(),
    cacheKey: `suggest:${q.toLowerCase()}`,
    validate: (v): v is Suggestion[] => {
      const arr = unwrap<unknown>(v)
      return (
        Array.isArray(arr) &&
        arr.length <= 8 &&
        arr.every((s) => {
          const o = s as Partial<Suggestion>
          return (
            !!o && typeof o.label === "string" && o.label.length > 0 && o.label.length <= 60
          )
        })
      )
    },
  })

  // Only report the model's suggestions when a provider actually produced them.
  if (!powered) return local()
  return unwrap<Suggestion[]>(value)
}

/** The model sometimes wraps its array in an object. Accept either shape. */
function unwrap<T>(value: unknown): T {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const obj = value as Record<string, unknown>
    for (const key of ["suggestions", "results", "items", "data"]) {
      if (Array.isArray(obj[key])) return obj[key] as T
    }
  }
  return value as T
}

// ---------------------------------------------------------------------------
// Feature 2: Personalised recommendations
// ---------------------------------------------------------------------------

export interface Recommendation {
  gearId: string
  reason: string
}

/**
 * Recommendations for a signed-in customer, based on the categories and gear
 * they have actually rented before. Logged out visitors get the local ranking.
 */
export async function recommendGear(): Promise<{
  items: Recommendation[]
  personalised: boolean
  powered: boolean
  provider: string | null
}> {
  const items = await catalog(40)

  const token = await getToken()
  const rentedCategories: string[] = []
  const rentedNames: string[] = []

  if (token) {
    const res = await api<Rental[]>("/api/rental/get-rentals", {}, token)
    // A backend with no rentals returns 404, which api() reports as a failure.
    // That is an empty history, not an error worth surfacing.
    if (res.success && Array.isArray(res.data)) {
      for (const rental of res.data) {
        const cat = rental.gear?.category_Name
        if (cat && !rentedCategories.includes(cat)) rentedCategories.push(cat)
        const name = rental.gear?.name
        if (name && !rentedNames.includes(name)) rentedNames.push(name)
      }
    }
  }

  const personalised = rentedCategories.length > 0

  const local = (): Recommendation[] => {
    const ranked = items
      .map((entry) => {
        let score = 0
        if (rentedCategories.includes(entry.category)) score += 10
        if (rentedNames.includes(entry.name)) score -= 20
        if (entry.available) score += 3
        return { entry, score }
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)

    return ranked.map(({ entry }) => ({
      gearId: entry.id,
      reason: personalised
        ? `You have rented ${entry.category || "gear"} before`
        : "Popular choice across GearUp",
    }))
  }

  if (!isAiConfigured() || items.length === 0) {
    return { items: local(), personalised, powered: false, provider: null }
  }

  const history = personalised
    ? `This customer has rented in these categories: ${rentedCategories.join(", ")}. Specific gear they have rented: ${rentedNames.slice(0, 6).join(", ")}.`
    : "This is a first time visitor with no rental history."

  const { value, powered, provider } = await askAi<{
    recommendations: { gearId: string; reason: string }[]
  }>({
    task: taskPrompt({
      task: "Recommend 4 listings to this customer. Give a one short sentence reason for each, referring to what they actually rented.",
      extra: [
        "Only use gearId values that appear in the catalog.",
        "Never recommend something they have already rented.",
      ],
    }),
    catalog: items.map(catalogLine).join("\n"),
    extra: [history],
    shape: '{ "recommendations": [{ "gearId": string, "reason": string }] }',
    fallback: { recommendations: local() },
    cacheKey: `reco:${rentedCategories.join(",")}:${rentedNames.length}`,
    validate: (v): v is { recommendations: { gearId: string; reason: string }[] } => {
      const recs = (v as { recommendations?: unknown })?.recommendations
      return Array.isArray(recs) && recs.every((r) => r && typeof r.gearId === "string")
    },
  })

  const valid = new Set(items.map((i) => i.id))
  const recommendations = (value.recommendations ?? [])
    .filter((r) => valid.has(r.gearId) && typeof r.reason === "string" && r.reason.length <= 140)
    .slice(0, 4)

  // If the model returned nothing usable, fall back rather than render an
  // empty section, and report honestly that no provider was used.
  if (recommendations.length === 0) {
    return { items: local(), personalised, powered: false, provider: null }
  }

  return { items: recommendations, personalised, powered, provider }
}

// ---------------------------------------------------------------------------
// Feature 3: AI chat assistant
// ---------------------------------------------------------------------------

export interface ChatTurn {
  role: "user" | "assistant"
  text: string
}

/**
 * Answers questions about renting, using the real catalog as ground truth so it
 * cannot invent gear that does not exist.
 */
export async function askAssistant(
  question: string
): Promise<{ text: string; powered: boolean; provider: string | null }> {
  const q = question.trim()
  if (!q) return { text: "Ask me anything about renting gear.", powered: false, provider: null }

  const items = await catalog(40)

  const local = (): string => {
    const lower = q.toLowerCase()

    const matched = items
      .map((entry) => ({ entry, score: scoreLocal(lower, entry) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)

    if (matched.length > 0) {
      const lines = matched.map(
        ({ entry }) =>
          `${entry.name} at BDT ${entry.price} per day${entry.available ? "" : " (currently unavailable)"}`
      )
      return `Here is what matches "${q}":\n${lines.map((l) => `- ${l}`).join("\n")}\n\nOpen the gear page to see full details and book by the day.`
    }

    if (/pay|price|cost|how much|rate/i.test(lower)) {
      const cheapest = [...items].filter((i) => i.available).sort((a, b) => a.price - b.price)[0]
      return cheapest
        ? `GearUp charges a daily rate. Right now the cheapest available item is ${cheapest.name} at BDT ${cheapest.price} per day. Every listing shows its own daily rate before you book.`
        : "Every listing shows its own daily rate before you book. Prices are set by each provider."
    }

    if (/book|rent|how|start|process/i.test(lower)) {
      return "Renting on GearUp takes four steps. Create an account, find gear on the Browse Gear page, pick your dates, then pay securely by card. The provider confirms and you collect the gear."
    }

    if (/provider|own|list|earn/i.test(lower)) {
      return "To list gear, sign up as a provider from the register page. You then get a provider dashboard where you can add listings, set your daily rate, and manage incoming orders."
    }

    if (/return|refund|cancel/i.test(lower)) {
      return "Orders move through confirmed, picked up, returned and completed. If you need to cancel, contact support from the Help Center and the provider will confirm the change."
    }

    return `I could not find gear matching "${q}". Try browsing the Browse Gear page, or ask me about pricing, booking, or how to become a provider.`
  }

  const result = await askAiText({
    task: taskPrompt({
      task: `The renter asked: "${q}". Answer in at most 4 short sentences.`,
      extra: [
        "Use only the catalog above for listings and prices.",
        "If the catalog does not cover it, say so plainly and point to the Help Center at /help.",
        "Give the page path when you suggest somewhere to go, for example /gear or /how-it-works.",
      ],
    }),
    catalog: items.map(catalogLine).join("\n"),
    fallback: local(),
    maxLength: 900,
    cacheKey: `ask:${q.toLowerCase()}`,
  })

  return result
}