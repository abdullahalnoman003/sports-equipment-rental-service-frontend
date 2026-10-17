"use server"

import { fetchAllCategories, fetchAllGear } from "./gear"
import type { Category, Gear } from "@/lib/types"

export interface PlatformStats {
  gearListings: number
  categories: number
  providers: number
  unitsAvailable: number
  fromPrice: number | null
  averageDailyRate: number | null
}

export interface ProviderSpotlight {
  id: string
  name: string
  email: string
  gearCount: number
  units: number
  fromPrice: number | null
  categories: string[]
}

const EMPTY_STATS: PlatformStats = {
  gearListings: 0,
  categories: 0,
  providers: 0,
  unitsAvailable: 0,
  fromPrice: null,
  averageDailyRate: null,
}

async function loadGear(): Promise<Gear[]> {
  try {
    const res = await fetchAllGear("", { next: { revalidate: 300 } })
    return res.success ? ((res.data as Gear[]) ?? []) : []
  } catch {
    return []
  }
}

function priceOf(gear: Gear): number {
  const price = Number(gear.price)
  return Number.isFinite(price) && price > 0 ? price : 0
}

/**
 * Live platform metrics derived from the public catalog API.
 * Nothing here is hard-coded. Every number comes from the backend.
 */
export async function fetchPlatformStats(): Promise<PlatformStats> {
  try {
    const [gear, catRes] = await Promise.all([
      loadGear(),
      fetchAllCategories({ next: { revalidate: 300 } }).catch(() => null),
    ])

    const categories: Category[] = catRes?.success ? ((catRes.data as Category[]) ?? []) : []
    const prices = gear.map(priceOf).filter((p) => p > 0)
    const providers = new Set(
      gear.map((g) => g.provider_id || g.provider_email).filter(Boolean) as string[]
    )

    return {
      gearListings: gear.length,
      categories: categories.length,
      providers: providers.size,
      unitsAvailable: gear
        .filter((g) => g.quantity > 0)
        .reduce((sum, g) => sum + (Number(g.quantity) || 0), 0),
      fromPrice: prices.length ? Math.min(...prices) : null,
      averageDailyRate: prices.length
        ? Math.round(prices.reduce((sum, p) => sum + p, 0) / prices.length)
        : null,
    }
  } catch {
    return EMPTY_STATS
  }
}

/** Premium, in-stock listings used for the "Featured gear" grid. */
export async function fetchFeaturedGear(limit = 8): Promise<Gear[]> {
  const gear = await loadGear()
  return gear
    .filter((g) => g.quantity > 0 && priceOf(g) > 0)
    .sort((a, b) => priceOf(b) - priceOf(a))
    .slice(0, limit)
}

/**
 * Popularity ranking for the "Trending now" rail.
 *
 * This is a deterministic heuristic over live catalog data (recency +
 * availability + price band). Phase 3 will replace the scoring function with
 * real user-activity signals; the signature and rendering stay the same.
 */
export async function fetchTrendingGear(limit = 4): Promise<Gear[]> {
  const gear = await loadGear()
  const now = Date.now()

  const scored = gear
    .map((item) => {
      const created = new Date(item.createdAt ?? 0).getTime()
      const ageDays = Number.isFinite(created) ? Math.max(0, (now - created) / 86_400_000) : 365
      const recency = 1 / (1 + ageDays / 30)
      const availability = Math.min(1, (Number(item.quantity) || 0) / 5)
      const priceBand = Math.min(1, priceOf(item) / 3000)

      return { item, score: recency * 0.5 + availability * 0.3 + priceBand * 0.2 }
    })
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, limit).map((s) => s.item)
}

/**
 * Real providers aggregated from live listings, replacing invented testimonials
 * with verifiable data (gear counts, stock and starting prices).
 */
export async function fetchProviderSpotlight(limit = 4): Promise<ProviderSpotlight[]> {
  const gear = await loadGear()

  const grouped = new Map<string, Gear[]>()
  for (const item of gear) {
    const key = item.provider_id || item.provider_email
    if (!key) continue
    const bucket = grouped.get(key)
    if (bucket) bucket.push(item)
    else grouped.set(key, [item])
  }

  return Array.from(grouped.entries())
    .map(([id, items]) => {
      const prices = items.map(priceOf).filter((p) => p > 0)
      const email = items[0]?.provider_email ?? ""
      return {
        id,
        name: email.split("@")[0]?.replace(/[._-]+/g, " ").trim() || "GearUp Provider",
        email,
        gearCount: items.length,
        units: items.reduce((sum, g) => sum + (Number(g.quantity) || 0), 0),
        fromPrice: prices.length ? Math.min(...prices) : null,
        categories: Array.from(new Set(items.map((g) => g.category_Name).filter(Boolean))),
      }
    })
    .sort((a, b) => b.gearCount - a.gearCount || b.units - a.units)
    .slice(0, limit)
}