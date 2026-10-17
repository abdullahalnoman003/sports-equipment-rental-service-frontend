"use server"

import { api } from "@/service/api"
import { EMPTY_REVIEW_SUMMARY, summariseReviews } from "@/lib/reviews"
import type { ApiResponse, Gear, GearReview, ReviewSummary } from "@/lib/types"

interface FetchOptions {
  next?: { revalidate?: number | false; tags?: string[] }
}

/**
 * Public reviews for a gear item.
 *
 * The backend currently documents only `POST /api/review`, so this reads from
 * `GET /api/review?gear_id=…`. If that route does not exist yet the call simply
 * resolves to an empty result and the UI renders its "no reviews yet" state.
 * It lights up automatically as soon as the route is added, with no code change.
 */
export async function fetchGearReviews(
  gearId: string,
  options?: FetchOptions
): Promise<ApiResponse<GearReview[]>> {
  try {
    return await api<GearReview[]>(`/api/review?gear_id=${encodeURIComponent(gearId)}`, {
      next: options?.next,
    })
  } catch {
    return { success: false, statusCode: 0, message: "Reviews unavailable", data: null }
  }
}

export async function fetchGearReviewSummary(
  gearId: string,
  options?: FetchOptions
): Promise<ReviewSummary> {
  const res = await fetchGearReviews(gearId, options)
  if (!res.success || !res.data) return EMPTY_REVIEW_SUMMARY
  return summariseReviews(res.data as GearReview[])
}

/**
 * Similar gear: same category first, then the same brand as a fallback.
 * The item itself is always excluded.
 */
export async function fetchRelatedGear(
  gear: Gear,
  limit = 4,
  options?: FetchOptions
): Promise<Gear[]> {
  try {
    const res = await api<Gear[]>("/api/gear", { next: options?.next })
    const all = res.success ? ((res.data as Gear[]) ?? []) : []

    const pool = all.filter((item) => item.id !== gear.id)

    const sameCategory = pool.filter((item) => item.category_Name === gear.category_Name)
    const sameBrand = pool.filter(
      (item) => item.brand === gear.brand && item.category_Name !== gear.category_Name
    )
    const rest = pool.filter(
      (item) =>
        item.category_Name !== gear.category_Name &&
        item.brand !== gear.brand &&
        item.quantity > 0
    )

    // Stable ordering keeps the row full and deterministic across renders.
    const byPopularity = (a: Gear, b: Gear) =>
      (b.quantity ?? 0) - (a.quantity ?? 0) || b.price - a.price

    return [...sameCategory, ...sameBrand, ...rest]
      .sort((a, b) => byPopularity(a, b))
      .slice(0, limit)
  } catch {
    return []
  }
}