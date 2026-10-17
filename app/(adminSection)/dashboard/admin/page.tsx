import { Users, Package, CreditCard, TrendingUp, Shield } from "lucide-react"
import type { Metadata } from "next"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { StatsCards } from "../../_components/stats-cards"
import { RecentUsers } from "../../_components/recent-users"
import { RecentRentals } from "../../_components/recent-rentals"
import { ChartFrame, LineChart, PieChart } from "@/components/shared/charts/chart-kit"
import { fetchAllUsers } from "../../_actions/users"
import { fetchAllRentals } from "../../_actions/rentals"
import { fetchAllGear } from "../../_actions/gear"
import { fetchAdminAnalytics } from "../../_actions/analytics"
import type { User, Rental } from "@/lib/types"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Platform Overview",
  description: "Monitor users, gear, rentals, and revenue across the GearUp platform.",
}

const money = (value: number) => `৳${Math.round(value).toLocaleString("en-US")}`

export default async function AdminDashboard() {
  const [usersRes, rentalsRes, gearRes, analytics] = await Promise.all([
    fetchAllUsers(),
    fetchAllRentals(),
    fetchAllGear(),
    fetchAdminAnalytics(),
  ])

  const users = usersRes.success ? (usersRes.data as User[]) : []
  const rentals = rentalsRes.success ? (rentalsRes.data as Rental[]) : []
  const gear = gearRes.success ? (gearRes.data as { id: string }[]) : []

  const stats = [
    { label: "Total Users", value: String(users.length), icon: Users, color: "bg-slate-accent/10 text-slate-accent", change: "" },
    { label: "Active Gear", value: String(gear.length), icon: Package, color: "bg-primary/10 text-primary", change: "" },
    { label: "Total Rentals", value: String(rentals.length), icon: CreditCard, color: "bg-gold/15 text-gold-deep", change: "" },
    { label: "Revenue", value: `৳${rentals.filter((r) => r.status !== "CANCELED").reduce((sum, r) => sum + r.total_price, 0).toLocaleString()}`, icon: TrendingUp, color: "bg-primary/10 text-primary", change: "" },
  ]

  return (
    <DashboardLayout role="ADMIN">
      <div className="space-y-6">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
            <Shield className="size-3.5" />
            Admin Overview
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">Platform overview</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor users, gear, rentals, and revenue across GearUp.
          </p>
        </div>
        <StatsCards stats={stats} />

        {analytics && (
          <div className="grid gap-6 xl:grid-cols-2">
            <ChartFrame
              title="Revenue trend"
              description="Last 6 months, cancelled rentals excluded"
              empty={analytics.revenueSeries.every((p) => p.value === 0)}
            >
              <LineChart data={analytics.revenueSeries} format={money} />
            </ChartFrame>

            <ChartFrame
              title="Rental status split"
              description="Where orders sit in the lifecycle"
              empty={analytics.statusSeries.length === 0}
            >
              <PieChart data={analytics.statusSeries} totalLabel="Orders" />
            </ChartFrame>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <RecentUsers users={users.slice(0, 5)} />
          <RecentRentals rentals={rentals.slice(0, 5)} />
        </div>
      </div>
    </DashboardLayout>
  )
}
