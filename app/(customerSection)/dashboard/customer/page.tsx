import { Package, CreditCard, Clock, TrendingUp, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { StatsCards } from "@/components/shared/stats-cards"
import { StatusBadge } from "@/components/shared/status-badge"
import { RecentRentals } from "../../_components/recent-rentals"
import { fetchMyRentals } from "../../_actions/orders"
import { fetchPaymentHistory } from "../../_actions/payments"
import type { Rental, Payment } from "@/lib/types"

export const revalidate = 30

export default async function CustomerDashboard() {
  const [rentalsRes, paymentsRes] = await Promise.all([
    fetchMyRentals({ next: { revalidate: 30 } }),
    fetchPaymentHistory({ next: { revalidate: 30 } }),
  ])

  const rentals = rentalsRes.success ? (rentalsRes.data as Rental[]) : []
  const payments = paymentsRes.success ? (paymentsRes.data as Payment[]) : []

  const activeCount = rentals.filter((r) => ["PLACED", "CONFIRMED", "PAID", "PICKED_UP"].includes(r.status)).length
  const totalSpent = rentals
    .filter((r) => r.status !== "CANCELED")
    .reduce((sum, r) => sum + r.total_price, 0)
  const pendingReturns = rentals.filter((r) => r.status === "PICKED_UP").length

  const stats = [
    { label: "Active Rentals", value: String(activeCount), icon: Package, color: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300" },
    { label: "Total Spent", value: `৳${totalSpent.toLocaleString()}`, icon: CreditCard, color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300" },
    { label: "Pending Returns", value: String(pendingReturns), icon: Clock, color: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300" },
    { label: "Total Orders", value: String(rentals.length), icon: TrendingUp, color: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300" },
  ]

  const recentRentals = rentals.slice(0, 5).map((r) => ({
    id: r.id,
    gear: r.gear.name,
    status: r.status,
    dates: `${new Date(r.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${new Date(r.end_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`,
    total: r.total_price,
  }))

  const recentPayments = payments.slice(0, 5)

  return (
    <DashboardLayout role="CUSTOMER">
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-primary" />
              Customer Overview
            </span>
            <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">Welcome back!</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Here&apos;s an overview of your rental activity.
            </p>
          </div>
          <Link
            href="/gear"
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 text-sm font-medium transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
          >
            Browse gear
            <ArrowUpRight className="size-4 text-primary transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <StatsCards stats={stats} />

        <div className="grid gap-6 lg:grid-cols-2">
          <RecentRentals rentals={recentRentals} />
          <div className="overflow-hidden rounded-3xl border border-border bg-card transition-colors hover:border-primary/25">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
                  <CreditCard className="size-4 text-primary" />
                </span>
                <h2 className="text-lg font-bold tracking-tight">Recent Payments</h2>
              </div>
              <Link href="/dashboard/customer/payments" className="group inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80">
                View all
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="divide-y divide-border/70">
              {recentPayments.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-muted">
                    <CreditCard className="size-5 text-muted-foreground/60" />
                  </span>
                  <p className="mt-3 text-sm text-muted-foreground">No payments yet.</p>
                </div>
              ) : (
                recentPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between gap-3 px-6 py-4 transition-colors hover:bg-muted/30"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {payment.rental?.gear.name ?? "Rental Payment"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(payment.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <StatusBadge status={payment.status} />
                      <p className="text-sm font-bold">৳{payment.amount}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
