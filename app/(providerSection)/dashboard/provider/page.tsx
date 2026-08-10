"use client"

import { useEffect, useState } from "react"
import { Package, DollarSign, Clock, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { StatsCards } from "../../_components/stats-cards"
import { GearList } from "../../_components/gear-list"
import { OrdersList } from "../../_components/orders-list"
import { fetchProviderGear, fetchProviderOrders } from "../../_actions/gear"
import { getMe } from "@/service/getMe"
import type { Gear, RentalWithPayment } from "@/lib/types"
import toast from "react-hot-toast"

export default function ProviderDashboard() {
  const [gear, setGear] = useState<Gear[]>([])
  const [orders, setOrders] = useState<RentalWithPayment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const userRes = await getMe()
        const userEmail = userRes.success ? (userRes.data as { email: string }).email : ""

        const [gearRes, ordersRes] = await Promise.all([
          fetchProviderGear(),
          fetchProviderOrders(),
        ])

        if (gearRes.success) {
          const allGear = gearRes.data as Gear[]
          setGear(userEmail ? allGear.filter((g) => g.provider_email === userEmail) : allGear)
        }
        if (ordersRes.success) setOrders(ordersRes.data as RentalWithPayment[])
      } catch {
        toast.error("Failed to fetch dashboard data")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const stats = [
    { label: "Total Gear Listed", value: String(gear.length), icon: Package, color: "text-blue-600 bg-blue-100" },
    { label: "Active Rentals", value: String(orders.filter((o) => ["PAID", "PICKED_UP"].includes(o.status)).length), icon: Clock, color: "text-green-600 bg-green-100" },
    { label: "Pending Orders", value: String(orders.filter((o) => o.status === "PLACED").length), icon: DollarSign, color: "text-orange-600 bg-orange-100" },
    { label: "Total Earnings", value: `$${orders.filter((o) => o.payment?.status === "SUCCESS").reduce((sum, o) => sum + o.total_price, 0).toLocaleString()}`, icon: DollarSign, color: "text-purple-600 bg-purple-100" },
  ]

  const recentGear = gear.slice(0, 3)
  const recentOrders = orders.slice(0, 5).map((o) => ({
    id: o.id,
    customer: o.user.name,
    gear: o.gear.name,
    status: o.status,
    dates: `${new Date(o.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${new Date(o.end_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`,
    total: o.total_price,
  }))

  return (
    <DashboardLayout role="PROVIDER">
      {loading ? (
        <div className="space-y-6">
          <div className="h-8 w-48 animate-pulse rounded bg-muted" />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 animate-pulse rounded-xl border border-border bg-card" />
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="h-64 animate-pulse rounded-xl border border-border bg-card" />
            <div className="h-64 animate-pulse rounded-xl border border-border bg-card" />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Provider Dashboard</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage your gear inventory and rental orders
              </p>
            </div>
            <Button asChild>
              <Link href="/dashboard/provider/gear/new">
                <Plus className="size-4" />
                Add Gear
              </Link>
            </Button>
          </div>
          <StatsCards stats={stats} />
          <div className="grid gap-6 md:grid-cols-2">
            <GearList gear={recentGear} />
            <OrdersList orders={recentOrders} />
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
