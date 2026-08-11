import { Package, DollarSign, Clock, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { StatsCards } from "@/components/shared/stats-cards"
import { GearList } from "../../_components/gear-list"
import { OrdersList } from "../../_components/orders-list"
import { fetchProviderGear, fetchProviderOrders } from "../../_actions/gear"
import { getMe } from "@/service/getMe"
import type { Gear, RentalWithPayment } from "@/lib/types"

export const revalidate = 30

export default async function ProviderDashboard() {
  const userRes = await getMe()
  const userEmail = userRes.success ? (userRes.data as { email: string }).email : ""

  const [gearRes, ordersRes] = await Promise.all([
    fetchProviderGear({ next: { revalidate: 30 } }),
    fetchProviderOrders({ next: { revalidate: 30 } }),
  ])

  const allGear = gearRes.success ? (gearRes.data as Gear[]) : []
  const gear = userEmail ? allGear.filter((g) => g.provider_email === userEmail) : allGear
  const orders = ordersRes.success ? (ordersRes.data as RentalWithPayment[]) : []

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
    </DashboardLayout>
  )
}
