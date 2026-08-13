import { Users, Package, CreditCard, TrendingUp, Shield } from "lucide-react"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { StatsCards } from "../../_components/stats-cards"
import { RecentUsers } from "../../_components/recent-users"
import { RecentRentals } from "../../_components/recent-rentals"
import { fetchAllUsers } from "../../_actions/users"
import { fetchAllRentals } from "../../_actions/rentals"
import { fetchAllGear } from "../../_actions/gear"
import type { User, Rental } from "@/lib/types"

export const revalidate = 60

export default async function AdminDashboard() {
  const [usersRes, rentalsRes, gearRes] = await Promise.all([
    fetchAllUsers({ next: { revalidate: 60 } }),
    fetchAllRentals({ next: { revalidate: 60 } }),
    fetchAllGear({ next: { revalidate: 60 } }),
  ])

  const users = usersRes.success ? (usersRes.data as User[]) : []
  const rentals = rentalsRes.success ? (rentalsRes.data as Rental[]) : []
  const gear = gearRes.success ? (gearRes.data as { id: string }[]) : []

  const stats = [
    { label: "Total Users", value: String(users.length), icon: Users, color: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300", change: "" },
    { label: "Active Gear", value: String(gear.length), icon: Package, color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300", change: "" },
    { label: "Total Rentals", value: String(rentals.length), icon: CreditCard, color: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300", change: "" },
    { label: "Revenue", value: `৳${rentals.filter((r) => r.status !== "CANCELED").reduce((sum, r) => sum + r.total_price, 0).toLocaleString()}`, icon: TrendingUp, color: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300", change: "" },
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
        <div className="grid gap-6 lg:grid-cols-2">
          <RecentUsers users={users.slice(0, 5)} />
          <RecentRentals rentals={rentals.slice(0, 5)} />
        </div>
      </div>
    </DashboardLayout>
  )
}
