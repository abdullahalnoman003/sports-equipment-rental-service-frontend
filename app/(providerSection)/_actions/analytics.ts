"use server"

import { api } from "@/service/api"
import { getToken } from "@/lib/get-token"
import { categorySeries, monthlySeries, totalOf, type Point } from "@/lib/charts"
import type { Gear, Rental } from "@/lib/types"

export interface EarningsSummary {
  earningsSeries: Point[]
  orderSeries: Point[]
  topGear: Point[]
  utilisation: Point[]
  totals: { earnings: number; orders: number; gearListed: number }
}

const toNumber = (value: unknown): number => {
  const n = Number(value)
  return Number.isFinite(n) ? n : 0
}

/**
 * An account with no orders gets a 404 "no orders" back rather than an empty
 * list. That is an empty dataset, not a failure, so the charts render their own
 * empty state. Auth failures still hide them entirely.
 */
function isEmptyDataset(success: boolean, statusCode: number, message: string): boolean {
  if (success) return true
  if (statusCode === 404) return true
  return /no (rentals|orders)/i.test(message ?? "")
}

/** Local, not exported: "use server" modules may only export async functions. */
function emptyEarnings(): EarningsSummary {
  return {
    earningsSeries: monthlySeries([], 6, () => null, () => 0),
    orderSeries: monthlySeries([], 6, () => null, () => 0),
    topGear: [],
    utilisation: [],
    totals: { earnings: 0, orders: 0, gearListed: 0 },
  }
}

/** Earnings and inventory utilisation for the signed-in provider. */
export async function fetchProviderEarnings(): Promise<EarningsSummary | null> {
  const token = await getToken()
  if (!token) return null

  const [ordersRes, gearRes] = await Promise.all([
    api<Rental[]>("/api/provider/orders/", {}, token),
    api<Gear[]>("/api/provider/gear/getallgear", {}, token),
  ])

  if (!isEmptyDataset(ordersRes.success, ordersRes.statusCode, ordersRes.message)) return null

  const orders: Rental[] = (ordersRes.data as Rental[]) ?? []
  const gear: Gear[] = gearRes.success ? ((gearRes.data as Gear[]) ?? []) : []

  if (orders.length === 0 && gear.length === 0) return emptyEarnings()

  const billable = orders.filter((r) => r.status !== "CANCELED")

  return {
    earningsSeries: monthlySeries(
      billable,
      6,
      (r) => r.created_at ?? r.start_date,
      (r) => toNumber(r.total_price)
    ),
    orderSeries: monthlySeries(orders, 6, (r) => r.created_at ?? r.start_date, () => 1),
    topGear: categorySeries(
      billable,
      (r) => r.gear?.name,
      (r) => toNumber(r.total_price),
      5
    ),
    // Share of each listing that has been rented at least once.
    utilisation: gear
      .map((item) => ({
        label: item.name,
        value: orders.some((o) => o.gear_id === item.id) ? 100 : 0,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6),
    totals: {
      earnings: totalOf(billable, (r) => toNumber(r.total_price)),
      orders: orders.length,
      gearListed: gear.length,
    },
  }
}