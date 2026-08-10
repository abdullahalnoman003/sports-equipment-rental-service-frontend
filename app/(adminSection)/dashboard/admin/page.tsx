"use client"

import { useEffect, useState } from "react"
import { Users, Package, DollarSign, TrendingUp } from "lucide-react"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { StatsCards } from "../../_components/stats-cards"
import { RecentUsers } from "../../_components/recent-users"
import { RecentRentals } from "../../_components/recent-rentals"
import { fetchAllUsers } from "../../_actions/users"
import { fetchAllRentals } from "../../_actions/rentals"
import { fetchAllGear } from "../../_actions/gear"
import type { User, Rental } from "@/lib/types"
import toast from "react-hot-toast"

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [rentals, setRentals] = useState<Rental[]>([])
  const [gear, setGear] = useState<{ id: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [usersRes, rentalsRes, gearRes] = await Promise.all([
          fetchAllUsers(),
          fetchAllRentals(),
          fetchAllGear(),
        ])
        if (usersRes.success) setUsers(usersRes.data as User[])
        else toast.error(usersRes.message || "Failed to fetch users")
        if (rentalsRes.success) setRentals(rentalsRes.data as Rental[])
        else toast.error(rentalsRes.message || "Failed to fetch rentals")
        if (gearRes.success) setGear(gearRes.data as { id: string }[])
        else toast.error(gearRes.message || "Failed to fetch gear")
      } catch {
        toast.error("Failed to load dashboard data")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const stats = [
    { label: "Total Users", value: String(users.length), icon: Users, color: "text-blue-600 bg-blue-100", change: "" },
    { label: "Active Gear", value: String(gear.length), icon: Package, color: "text-green-600 bg-green-100", change: "" },
    { label: "Total Rentals", value: String(rentals.length), icon: DollarSign, color: "text-purple-600 bg-purple-100", change: "" },
    { label: "Revenue", value: `$${rentals.filter((r) => r.status !== "CANCELED").reduce((sum, r) => sum + r.total_price, 0).toLocaleString()}`, icon: TrendingUp, color: "text-orange-600 bg-orange-100", change: "" },
  ]

  return (
    <DashboardLayout role="ADMIN">
      {loading ? (
        <div className="space-y-6">
          <div className="h-8 w-48 animate-pulse rounded bg-muted" />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 animate-pulse rounded-xl border border-border bg-card" />
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="h-80 animate-pulse rounded-xl border border-border bg-card" />
            <div className="h-80 animate-pulse rounded-xl border border-border bg-card" />
          </div>
        </div>
      ) : (
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
      )}
    </DashboardLayout>
  )
}
