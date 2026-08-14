import type { Metadata } from "next"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { RentalsStats } from "../../../_components/rentals-stats"
import { RentalsTable } from "../../../_components/rentals-table"
import { fetchAllRentals } from "../../../_actions/rentals"
import type { Rental } from "@/lib/types"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "All Rentals",
  description: "Inspect all rental orders across the GearUp platform.",
}

export default async function AdminRentalsPage() {
  const res = await fetchAllRentals()
  const rentals = (res.success ? (res.data as Rental[]) : []).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  const totals = {
    all: rentals.length,
    active: rentals.filter((r) => ["PLACED", "CONFIRMED", "PAID", "PICKED_UP"].includes(r.status)).length,
    completed: rentals.filter((r) => r.status === "RETURNED").length,
    revenue: rentals.filter((r) => r.status !== "CANCELED").reduce((sum, r) => sum + r.total_price, 0),
  }

  return (
    <DashboardLayout role="ADMIN">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">All Rentals</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Platform-wide rental order management
          </p>
        </div>
        <RentalsStats totals={totals} />
        <RentalsTable rentals={rentals} />
      </div>
    </DashboardLayout>
  )
}
