import { Package, CreditCard, Clock, Plus, ArrowUpRight, Store } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { StatsCards } from "@/components/shared/stats-cards"
import { BarChart, ChartFrame, LineChart } from "@/components/shared/charts/chart-kit"
import { GearList } from "../../_components/gear-list"
import { OrdersList } from "../../_components/orders-list"
import { fetchProviderGear, fetchProviderOrders } from "../../_actions/gear"
import { fetchProviderEarnings } from "../../_actions/analytics"
import { getMe } from "@/service/getMe"
import type { Gear, RentalWithPayment } from "@/lib/types"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Provider Dashboard",
  description: "Track your inventory, orders, and earnings at a glance on your GearUp provider dashboard.",
}

export default async function ProviderDashboard() {
  const userRes = await getMe()
  const userEmail = userRes.success ? (userRes.data as { email: string }).email : ""

  const [gearRes, ordersRes] = await Promise.all([
    fetchProviderGear(),
    fetchProviderOrders(),
  ])

  const allGear = gearRes.success ? (gearRes.data as Gear[]) : []
  const gear = userEmail ? allGear.filter((g) => g.provider_email === userEmail) : allGear
  const orders = ordersRes.success ? (ordersRes.data as RentalWithPayment[]) : []

  const stats = [
    { label: "Total Gear Listed", value: String(gear.length), icon: Package, color: "bg-slate-accent/10 text-slate-accent" },
    { label: "Active Rentals", value: String(orders.filter((o) => ["PAID", "PICKED_UP"].includes(o.status)).length), icon: Clock, color: "bg-primary/10 text-primary" },
    { label: "Pending Orders", value: String(orders.filter((o) => o.status === "PLACED").length), icon: CreditCard, color: "bg-gold/15 text-gold-deep" },
    { label: "Total Earnings", value: `৳${orders.filter((o) => o.payment?.status === "SUCCESS").reduce((sum, o) => sum + o.total_price, 0).toLocaleString()}`, icon: Store, color: "bg-primary/10 text-primary" },
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

  const earnings = await fetchProviderEarnings()

  const money = (value: number) => `৳${Math.round(value).toLocaleString("en-US")}`

  return (
    <DashboardLayout role="PROVIDER">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-primary" />
              Provider Overview
            </span>
            <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">Manage your gear</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Track your inventory, orders, and earnings at a glance.
            </p>
          </div>
          <Button asChild size="lg" className="group gap-2 rounded-xl shadow-lg shadow-primary/20">
            <Link href="/dashboard/provider/gear/new">
              <Plus className="size-4" />
              Add Gear
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
        <StatsCards stats={stats} />
        {earnings && (
          <div className="grid gap-6 xl:grid-cols-2">
            <ChartFrame
              title="Earnings over time"
              description="Monthly earnings across the last 6 months"
              empty={earnings.earningsSeries.every((p) => p.value === 0)}
            >
              <LineChart data={earnings.earningsSeries} format={money} />
            </ChartFrame>

            <ChartFrame
              title="Best performing gear"
              description="Listings ranked by earnings"
              empty={earnings.topGear.length === 0}
            >
              <BarChart data={earnings.topGear} format={money} />
            </ChartFrame>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <GearList gear={recentGear} />
          <OrdersList orders={recentOrders} />
        </div>
      </div>
    </DashboardLayout>
  )
}
