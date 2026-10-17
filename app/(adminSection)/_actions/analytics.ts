"use server"

import { api } from "@/service/api"
import { getToken } from "@/lib/get-token"
import {
  countSeries,
  monthlySeries,
  percentChange,
  totalOf,
  type Point,
} from "@/lib/charts"
import type { Gear, Rental, RentalStatus, User } from "@/lib/types"

export interface AdminAnalytics {
  revenueSeries: Point[]
  rentalVolumeSeries: Point[]
  statusSeries: Point[]
  categoryRevenueSeries: Point[]
  topGearSeries: Point[]
  userGrowthSeries: Point[]
  roleSeries: Point[]
  totals: {
    users: number
    newUsersThisMonth: number
    userGrowthPct: number | null
    gear: number
    rentals: number
    revenue: number
    activeRentals: number
    completedRentals: number
    cancelledRentals: number
  }
}

const REVENUE_EXCLUDED: RentalStatus[] = ["CANCELED"]
const ACTIVE_STATUSES: RentalStatus[] = ["PLACED", "CONFIRMED", "PAID", "PICKED_UP"]

const RENTAL_STATUS_ORDER = [
  "PLACED",
  "CONFIRMED",
  "PAID",
  "PICKED_UP",
  "RETURNED",
  "CANCELED",
]

const toNumber = (value: unknown): number => {
  const n = Number(value)
  return Number.isFinite(n) ? n : 0
}

/**
 * Aggregates admin analytics from the three endpoints the platform already
 * exposes. No dedicated analytics endpoint exists, so this is computed in the
 * server layer to keep it off the client bundle.
 */
export async function fetchAdminAnalytics(): Promise<AdminAnalytics | null> {
  // Admin endpoints are role gated, so the session cookie must be forwarded.
  const token = await getToken()
  if (!token) return null

  const [usersRes, rentalsRes, gearRes] = await Promise.all([
    api<User[]>("/api/admin/users", { next: { revalidate: 60 } }, token),
    api<Rental[]>("/api/admin/rentals", { next: { revalidate: 60 } }, token),
    api<Gear[]>("/api/admin/gear", { next: { revalidate: 60 } }, token),
  ])

  if (!rentalsRes.success || !gearRes.success) return null

  const users: User[] = usersRes.success ? ((usersRes.data as User[]) ?? []) : []
  const rentals: Rental[] = (rentalsRes.data as Rental[]) ?? []
  const gear: Gear[] = (gearRes.data as Gear[]) ?? []

  const billable = rentals.filter((r) => !REVENUE_EXCLUDED.includes(r.status))

  // Monthly revenue from rentals that were not cancelled.
  const revenueSeries = monthlySeries(
    billable,
    6,
    (r) => r.created_at ?? r.start_date,
    (r) => toNumber(r.total_price)
  )

  const rentalVolumeSeries = monthlySeries(
    rentals,
    6,
    (r) => r.created_at ?? r.start_date,
    () => 1
  )

  const userGrowthSeries = monthlySeries(users, 6, (u) => u.createdAt, () => 1)

  // Revenue attributed to each gear category via its rentals.
  const revenueByCategory = new Map<string, number>()
  for (const rental of billable) {
    const category = rental.gear?.category_Name
    if (!category) continue
    revenueByCategory.set(category, (revenueByCategory.get(category) ?? 0) + toNumber(rental.total_price))
  }

  const categoryRevenueSeries = Array.from(revenueByCategory.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6)

  // Best performing gear by revenue.
  const revenueByGear = new Map<string, number>()
  for (const rental of billable) {
    const name = rental.gear?.name
    if (!name) continue
    revenueByGear.set(name, (revenueByGear.get(name) ?? 0) + toNumber(rental.total_price))
  }

  const topGearSeries = Array.from(revenueByGear.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)

  const now = new Date()
  const thisMonthCount = users.filter((u) => {
    const d = new Date(u.createdAt)
    return (
      !Number.isNaN(d.getTime()) &&
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth()
    )
  }).length

  const prevMonthCount = users.filter((u) => {
    const d = new Date(u.createdAt)
    if (Number.isNaN(d.getTime())) return false
    const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    return d.getFullYear() === prev.getFullYear() && d.getMonth() === prev.getMonth()
  }).length

  return {
    revenueSeries,
    rentalVolumeSeries,
    statusSeries: countSeries(rentals, (r) => r.status, RENTAL_STATUS_ORDER),
    categoryRevenueSeries,
    topGearSeries,
    userGrowthSeries,
    roleSeries: countSeries(users, (u) => u.role, ["CUSTOMER", "PROVIDER", "ADMIN"]),
    totals: {
      users: users.length,
      newUsersThisMonth: thisMonthCount,
      userGrowthPct: percentChange(thisMonthCount, prevMonthCount),
      gear: gear.length,
      rentals: rentals.length,
      revenue: totalOf(billable, (r) => toNumber(r.total_price)),
      activeRentals: rentals.filter((r) => ACTIVE_STATUSES.includes(r.status)).length,
      completedRentals: rentals.filter((r) => r.status === "RETURNED").length,
      cancelledRentals: rentals.filter((r) => r.status === "CANCELED").length,
    },
  }
}