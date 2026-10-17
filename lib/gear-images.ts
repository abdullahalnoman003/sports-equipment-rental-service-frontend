import type { Gear } from "@/lib/types"

const isHttpUrl = (value: unknown): value is string =>
  typeof value === "string" && /^https?:\/\//i.test(value.trim())

/**
 * Builds the gallery for a gear item.
 *
 * Providers may store several images either as an array, a comma-separated
 * string, or (on older listings) a single URL in `image`. All three are
 * accepted so the gallery works regardless of what the backend returns.
 * Duplicates and non-HTTP entries are dropped; `image` is always included first.
 */
export function normaliseGearImages(gear: Pick<Gear, "image" | "images">): string[] {
  const raw: string[] = []

  const push = (value: unknown) => {
    if (Array.isArray(value)) value.forEach(push)
    else if (typeof value === "string") {
      value
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean)
        .forEach((part) => raw.push(part))
    }
  }

  push(gear.images)
  if (gear.image) raw.push(gear.image)

  const seen = new Set<string>()
  const result: string[] = []

  for (const url of raw) {
    if (!isHttpUrl(url)) continue
    const clean = url.trim()
    if (seen.has(clean)) continue
    seen.add(clean)
    result.push(clean)
  }

  return result
}