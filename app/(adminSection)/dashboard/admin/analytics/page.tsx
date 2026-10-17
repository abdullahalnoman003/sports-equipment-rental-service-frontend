import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { BarChart, ChartFrame, LineChart, PieChart } from "@/components/shared/charts/chart-kit"
import { fetchAdminAnalytics } from "../../../_actions/analytics"
import { formatCompact } from "@/lib/charts"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Analytics",
  description: "Revenue, rental volume and user growth insights across the GearUp platform.",
}

const money = (value: number) => `৳${Math.round(value).toLocaleString("en-US")}`

function Delta({ value }: { value: number | null }) {
  if (value === null) {
    return <span className="text-xs text-muted-foreground">No prior month</span>
  }
  const up = value >= 0
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold ${
        up ? "text-primary" : "text-destructive"
      }`}
    >
      {up ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
      {up ? "+" : ""}
      {value}% vs last month
    </span>
  )
}

export default async function AdminAnalyticsPage() {
  const analytics = await fetchAdminAnalytics()

  return (
    <DashboardLayout role="ADMIN">
      <div className="space-y-6">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
            <BarChart3 className="size-3.5" />
            Analytics
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
            Platform insights
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Aggregated from live users, rentals and gear data.
          </p>
        </div>

        {!analytics ? (
          <div className="rounded-3xl border border-dashed border-border py-24 text-center text-muted-foreground">
            Analytics are unavailable right now. Please try again shortly.
          </div>
        ) : (
          <>
            {/* Headline numbers */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Total revenue", value: money(analytics.totals.revenue), delta: null },
                {
                  label: "Rental volume",
                  value: analytics.totals.rentals.toLocaleString(),
                  delta: null,
                },
                {
                  label: "Total users",
                  value: analytics.totals.users.toLocaleString(),
                  delta: analytics.totals.userGrowthPct,
                },
                {
                  label: "Active rentals",
                  value: analytics.totals.activeRentals.toLocaleString(),
                  delta: null,
                },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-3xl border border-border bg-card p-5"
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {card.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold tracking-tight">{card.value}</p>
                  <div className="mt-2">
                    <Delta value={card.delta} />
                  </div>
                </div>
              ))}
            </div>

            {/* Revenue + volume */}
            <div className="grid gap-6 xl:grid-cols-2">
              <ChartFrame
                title="Revenue trend"
                description="Monthly revenue across the last 6 months, excluding cancelled rentals"
                empty={analytics.revenueSeries.every((p) => p.value === 0)}
              >
                <LineChart data={analytics.revenueSeries} format={money} />
              </ChartFrame>

              <ChartFrame
                title="Rental volume"
                description="Orders placed per month"
                empty={analytics.rentalVolumeSeries.every((p) => p.value === 0)}
              >
                <BarChart data={analytics.rentalVolumeSeries} format={(v) => `${v} orders`} />
              </ChartFrame>
            </div>

            {/* Status + roles */}
            <div className="grid gap-6 xl:grid-cols-2">
              <ChartFrame
                title="Rental status split"
                description="Where every order currently sits in the lifecycle"
                empty={analytics.statusSeries.length === 0}
              >
                <PieChart data={analytics.statusSeries} totalLabel="Orders" />
              </ChartFrame>

              <ChartFrame
                title="Users by role"
                description="Registered accounts split across the three roles"
                empty={analytics.roleSeries.length === 0}
              >
                <PieChart data={analytics.roleSeries} totalLabel="Users" />
              </ChartFrame>
            </div>

            {/* Category + top gear */}
            <div className="grid gap-6 xl:grid-cols-2">
              <ChartFrame
                title="Revenue by category"
                description="Which categories are actually generating income"
                empty={analytics.categoryRevenueSeries.length === 0}
              >
                <BarChart data={analytics.categoryRevenueSeries} format={money} />
              </ChartFrame>

              <ChartFrame
                title="Top gear by revenue"
                description="Best performing individual listings"
                empty={analytics.topGearSeries.length === 0}
              >
                <BarChart data={analytics.topGearSeries} format={money} />
              </ChartFrame>
            </div>

            {/* Growth */}
            <ChartFrame
              title="User growth"
              description="New accounts registered each month"
              empty={analytics.userGrowthSeries.every((p) => p.value === 0)}
            >
              <LineChart data={analytics.userGrowthSeries} format={(v) => `${v} users`} />
            </ChartFrame>

            {/* Completion summary */}
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Completed", value: analytics.totals.completedRentals },
                { label: "In progress", value: analytics.totals.activeRentals },
                { label: "Cancelled", value: analytics.totals.cancelledRentals },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border bg-card px-5 py-4"
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-1.5 text-xl font-bold">{item.value.toLocaleString()}</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground">
              Figures exclude cancelled rentals from revenue. Highest single month:{" "}
              <span className="font-semibold text-foreground">
                {formatCompact(Math.max(...analytics.revenueSeries.map((p) => p.value), 0))}
              </span>
              .
            </p>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}