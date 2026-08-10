import { Package, CreditCard, Clock, TrendingUp } from "lucide-react"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { StatsCards } from "../../_components/stats-cards"
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

  const stats = [
    { label: "Active Rentals", value: String(rentals.filter((r) => ["PLACED", "CONFIRMED", "PAID", "PICKED_UP"].includes(r.status)).length), icon: Package, color: "text-blue-600 bg-blue-100" },
    { label: "Total Spent", value: `$${rentals.filter((r) => r.status !== "CANCELED").reduce((sum, r) => sum + r.total_price, 0).toLocaleString()}`, icon: CreditCard, color: "text-green-600 bg-green-100" },
    { label: "Pending Returns", value: String(rentals.filter((r) => r.status === "PICKED_UP").length), icon: Clock, color: "text-orange-600 bg-orange-100" },
    { label: "Total Orders", value: String(rentals.length), icon: TrendingUp, color: "text-purple-600 bg-purple-100" },
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
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back!</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s an overview of your rental activity.
          </p>
        </div>
        <StatsCards stats={stats} />
        <div className="grid gap-6 md:grid-cols-2">
          <RecentRentals rentals={recentRentals} />
          <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="text-lg font-semibold">Recent Payments</h2>
              <a href="/dashboard/customer/payments" className="text-sm text-primary hover:underline">
                View all
              </a>
            </div>
            <div className="p-0">
              {recentPayments.length === 0 ? (
                <div className="px-6 py-8 text-center text-sm text-muted-foreground">
                  No payments yet.
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {recentPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between gap-3 px-6 py-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {payment.rental?.gear.name ?? "Rental Payment"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(payment.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          payment.status === "SUCCESS" ? "bg-green-100 text-green-700" :
                          payment.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                          payment.status === "FAILED" ? "bg-red-100 text-red-700" :
                          "bg-orange-100 text-orange-700"
                        }`}>
                          {payment.status}
                        </span>
                        <p className="text-sm font-semibold">${payment.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
