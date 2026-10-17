/**
 * Text normalisation for user-visible strings.
 *
 * House rule: no em dashes or en dashes anywhere on the site. Some copy is
 * authored here, but a lot arrives from the backend (gear names, descriptions,
 * review comments) where we cannot edit the source. Sanitising at the API
 * boundary keeps the rule enforced everywhere with a single choke point.
 */

const EM_DASH = "\u2014"
const EN_DASH = "\u2013"

/**
 * Replaces em/en dashes with plain punctuation.
 *
 *   "Coleman \u2014 premium"  ->  "Coleman, premium"
 *   "rated 1\u20135"          ->  "rated 1-5"
 *   "Terms \u2014"           ->  "Terms"
 */
export function cleanText(input: string): string {
  return input
    .replace(/\s*\u2014\s*/g, ", ")
    .replace(/\u2013/g, "-")
    .replace(/\s*,(?=\s*,)/g, "")
    .replace(/^(?:\s*,\s*)+/, "")
    .replace(/(?:\s*,\s*)+$/, "")
    .replace(/\s{2,}/g, " ")
    .trim()
}

/**
 * Deep-walks an API payload and cleans every string it contains.
 * Preserves nulls, numbers, booleans and nesting.
 */
export function sanitizePayload<T>(value: T): T {
  if (typeof value === "string") return cleanText(value) as unknown as T
  if (Array.isArray(value)) return value.map((item) => sanitizePayload(item)) as unknown as T

  if (value !== null && typeof value === "object") {
    const out: Record<string, unknown> = {}
    for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
      out[key] = sanitizePayload(item)
    }
    return out as unknown as T
  }

  return value
}

export { EM_DASH, EN_DASH }