"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { RentalsStats } from "../../../_components/rentals-stats"
import { RentalsTable } from "../../../_components/rentals-table"
import { fetchAllRentals } from "../../../_actions/rentals"
import toast from "react-hot-toast"
import type { Rental } from "@/lib/types"

export default function AdminRentalsPage() {
  const [rentals, setRentals] = useState<Rental[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchRentals() {
      try {
        const res = await fetchAllRentals()
        if (res.success) {
          setRentals(res.data as Rental[])
        } else {
          setError(res.message || "Failed to fetch rentals")
          toast.error(res.message || "Failed to fetch rentals")
        }
      } catch {
        setError("Failed to fetch rentals")
        toast.error("Failed to fetch rentals")
      } finally {
        setLoading(false)
      }
    }
    fetchRentals()
  }, [])

  const totals = {
    all: rentals.length,
    active: rentals.filter((r) => ["PLACED", "CONFIRMED", "PAID", "PICKED_UP"].includes(r.status)).length,
    completed: rentals.filter((r) => r.status === "RETURNED").length,
    revenue: rentals.filter((r) => r.status !== "CANCELED").reduce((sum, r) => sum + r.total_price, 0),
  }

  return (
    <DashboardLayout role="ADMIN">
      {loading ? (
        <div className="space-y-6">
          <div className="h-8 w-32 animate-pulse rounded bg-muted" />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded-xl border border-border bg-card" />
            ))}
          </div>
          <div className="h-96 animate-pulse rounded-xl border border-border bg-card" />
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">All Rentals</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Platform-wide rental order management
            </p>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <RentalsStats totals={totals} />
          <RentalsTable rentals={rentals} />
        </div>
      )}
    </DashboardLayout>
  )
}
