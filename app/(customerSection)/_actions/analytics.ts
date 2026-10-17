"use server"

import { api } from "@/service/api"
import { getToken } from "@/lib/get-token"
import { categorySeries, monthlySeries, totalOf, type Point } from "@/lib/charts"
import type { Rental } from "@/lib/types"

export interface SpendingSummary {
  spendSeries: Point[]
  orderSeries: Point[]
  categorySpend: Point[]
  totals: { spend: number; orders: number; averageOrder: number }
}

const toNumber = (value: unknown): number => {
  const n = Number(value)
  return Number.isFinite(n) ? n : 0
}

/**
 * The rentals endpoint answers 404 with "No rentals found" when an account has
 * never rented. That is an empty dataset, not a failure, so the charts render
 * their own empty state. An auth failure still hides them entirely.
 */
function isEmptyDataset(success: boolean, statusCode: number, message: string): boolean {
  if (success) return true
  if (statusCode === 404) return true
  return /no rentals found/i.test(message ?? "")
}

/** Local, not exported: "use server" modules may only export async functions. */
function emptySpending(): SpendingSummary {
  return {
    spendSeries: monthlySeries([], 6, () => null, () => 0),
    orderSeries: monthlySeries([], 6, () => null, () => 0),
    categorySpend: [],
    totals: { spend: 0, orders: 0, averageOrder: 0 },
  }
}

/** Monthly spend and category breakdown for the signed-in customer. */
export async function fetchCustomerSpending(): Promise<SpendingSummary | null> {
  const token = await getToken()
  if (!token) return null

  const res = await api<Rental[]>("/api/rental/get-rentals", {}, token)

  if (!isEmptyDataset(res.success, res.statusCode, res.message)) return null

  const rentals: Rental[] = (res.data as Rental[]) ?? []
  if (rentals.length === 0) return emptySpending()

  const billable = rentals.filter((r) => r.status !== "CANCELED")
  const spend = totalOf(billable, (r) => toNumber(r.total_price))

  return {
    spendSeries: monthlySeries(
      billable,
      6,
      (r) => r.created_at ?? r.start_date,
      (r) => toNumber(r.total_price)
    ),
    orderSeries: monthlySeries(rentals, 6, (r) => r.created_at ?? r.start_date, () => 1),
    categorySpend: categorySeries(
      billable,
      (r) => r.gear?.category_Name,
      (r) => toNumber(r.total_price),
      6
    ),
    totals: {
      spend,
      orders: rentals.length,
      averageOrder: billable.length ? Math.round(spend / billable.length) : 0,
    },
  }
}