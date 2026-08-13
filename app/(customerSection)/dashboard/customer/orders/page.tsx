import type { Metadata } from "next"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { fetchMyRentals } from "../../../_actions/orders"
import { CustomerOrdersClient } from "../../../_components/customer-orders-client"
import type { Rental } from "@/lib/types"

export const revalidate = 30

export const metadata: Metadata = {
  title: "My Rentals",
  description: "Track and manage all your rental orders on GearUp.",
}

export default async function CustomerOrdersPage() {
  const res = await fetchMyRentals({ next: { revalidate: 30 } })
  const orders = (res.success ? (res.data as Rental[]) : []).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  return (
    <DashboardLayout role="CUSTOMER">
      <div className="space-y-6">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-primary" />
            My Rentals
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">Rental orders</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track and manage all your rental orders
          </p>
        </div>
        <CustomerOrdersClient orders={orders} />
      </div>
    </DashboardLayout>
  )
}
