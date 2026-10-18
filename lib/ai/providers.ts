/**
 * LLM provider registry for the Section 9 AI features.
 *
 * Every entry is a provider that offers a usable free tier and was verified to
 * have a live endpoint. Providers are tried in order, so the first one that
 * answers wins and the rest are only reached when an earlier provider fails or
 * runs out of quota.
 *
 * Two wire formats are supported:
 *
 * - `gemini` uses Google's `generateContent` shape with `x-goog-api-key`.
 * - `openai` uses the OpenAI `chat/completions` shape with a bearer token. Groq,
 *   OpenRouter, NVIDIA and Mistral all speak it, so one adapter covers four
 *   providers.
 *
 * A provider with no API key set is skipped entirely, which is what lets you run
 * with just one key and add more later without touching code.
 */

export type WireFormat = "gemini" | "openai"

export interface Provider {
  id: string
  /** Shown in the README and in the assistant UI. */
  label: string
  format: WireFormat
  /** Server-only env var holding the key. Never NEXT_PUBLIC_. */
  envKey: string
  /** Base URL without the trailing path. */
  baseUrl: string
  /**
   * Tried in order. The first is the best default, the rest are insurance
   * against a single model being retired.
   */
  models: string[]
  /** Where to get a free key. */
  signupUrl: string
  /** Short note on the free tier, for the README. */
  note: string
}

export const PROVIDERS: Provider[] = [
  {
    id: "gemini",
    label: "Google Gemini",
    format: "gemini",
    envKey: "GEMINI_API_KEY",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
    // Verified against a live key. Note that a model can appear in the account's
    // model list and still 404 on generateContent, so each id here was actually
    // called rather than copied from a listing. gemini-2.0-flash and
    // gemini-2.5-flash have both been retired.
    models: ["gemini-3.8-flash", "gemini-3.7-flash", "gemini-3.6-flash", "gemini-3.5-flash-lite"],
    signupUrl: "https://aistudio.google.com/apikey",
    note: "Generous free tier, no card required.",
  },
  {
    id: "groq",
    label: "Groq",
    format: "openai",
    envKey: "GROQ_API_KEY",
    baseUrl: "https://api.groq.com/openai/v1",
    models: ["llama-3.3-70b-versatile", "llama-3.1-8b-instant", "openai/gpt-oss-120b"],
    signupUrl: "https://console.groq.com/keys",
    note: "Very fast inference on a free tier.",
  },
  {
    id: "openrouter",
    label: "OpenRouter",
    format: "openai",
    envKey: "OPENROUTER_API_KEY",
    baseUrl: "https://openrouter.ai/api/v1",
    models: ["google/gemma-4-31b-it:free", "google/gemma-4-26b-a4b-it:free"],
    signupUrl: "https://openrouter.ai/keys",
    note: "One key, many models, several tagged :free.",
  },
  {
    id: "nvidia",
    label: "NVIDIA NIM",
    format: "openai",
    envKey: "NVIDIA_API_KEY",
    baseUrl: "https://integrate.api.nvidia.com/v1",
    models: ["google/gemma-4-31b-it", "nvidia/llama-3.1-nemotron-ultra-253b-v1"],
    signupUrl: "https://build.nvidia.com/settings/api-keys",
    note: "Developer programme keys, strong open model catalogue.",
  },
  {
    id: "mistral",
    label: "Mistral",
    format: "openai",
    envKey: "MISTRAL_API_KEY",
    baseUrl: "https://api.mistral.ai/v1",
    models: ["mistral-small-latest", "mistral-large-latest"],
    signupUrl: "https://console.mistral.ai/api-keys",
    note: "Free experimental tier with a small model.",
  },
]

/** Providers that have a key in the environment, in fallback order. */
export function configuredProviders(): Provider[] {
  return PROVIDERS.filter((p) => Boolean(process.env[p.envKey]?.trim()))
}

/** Which providers are usable, for display in the assistant and the README. */
export function providerStatus(): { label: string; configured: boolean; signupUrl: string }[] {
  return PROVIDERS.map((p) => ({
    label: p.label,
    configured: Boolean(process.env[p.envKey]?.trim()),
    signupUrl: p.signupUrl,
  }))
}

/** True when at least one provider can answer. */
export function anyProviderConfigured(): boolean {
  return configuredProviders().length > 0
}