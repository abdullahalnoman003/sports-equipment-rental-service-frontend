import { Users, Package, DollarSign, TrendingUp } from "lucide-react"
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
    { label: "Total Users", value: String(users.length), icon: Users, color: "text-blue-600 bg-blue-100", change: "" },
    { label: "Active Gear", value: String(gear.length), icon: Package, color: "text-green-600 bg-green-100", change: "" },
    { label: "Total Rentals", value: String(rentals.length), icon: DollarSign, color: "text-purple-600 bg-purple-100", change: "" },
    { label: "Revenue", value: `$${rentals.filter((r) => r.status !== "CANCELED").reduce((sum, r) => sum + r.total_price, 0).toLocaleString()}`, icon: TrendingUp, color: "text-orange-600 bg-orange-100", change: "" },
  ]

  return (
    <DashboardLayout role="ADMIN">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Platform overview and management
          </p>
        </div>
        <StatsCards stats={stats} />
        <div className="grid gap-6 md:grid-cols-2">
          <RecentUsers users={users.slice(0, 5)} />
          <RecentRentals rentals={rentals.slice(0, 5)} />
        </div>
      </div>
    </DashboardLayout>
  )
}
