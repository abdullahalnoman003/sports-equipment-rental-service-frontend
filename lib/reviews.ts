import type { GearReview, ReviewSummary } from "@/lib/types"

export const EMPTY_REVIEW_SUMMARY: ReviewSummary = {
  average: 0,
  total: 0,
  distribution: [0, 0, 0, 0, 0],
}

function toStars(value: unknown): number {
  const n = Number(value)
  return Number.isFinite(n) && n >= 1 && n <= 5 ? Math.round(n) : 0
}

/**
 * Average rating + star distribution computed from real reviews.
 * Invalid or out-of-range ratings are ignored rather than coerced.
 */
export function summariseReviews(reviews: GearReview[] | null | undefined): ReviewSummary {
  const distribution = [0, 0, 0, 0, 0]
  let total = 0

  for (const review of Array.isArray(reviews) ? reviews : []) {
    const stars = toStars(review?.rating)
    if (stars === 0) continue
    distribution[stars - 1] += 1
    total += stars
  }

  const count = distribution.reduce((sum, n) => sum + n, 0)

  return {
    average: count === 0 ? 0 : Math.round((total / count) * 10) / 10,
    total: count,
    distribution,
  }
}