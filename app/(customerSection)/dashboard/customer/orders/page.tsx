import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { fetchMyRentals } from "../../../_actions/orders"
import { CustomerOrdersClient } from "../../../_components/customer-orders-client"
import type { Rental } from "@/lib/types"

export const revalidate = 30

export default async function CustomerOrdersPage() {
  const res = await fetchMyRentals({ next: { revalidate: 30 } })
  const orders = (res.success ? (res.data as Rental[]) : []).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  return (
    <DashboardLayout role="CUSTOMER">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Rentals</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track and manage all your rental orders
          </p>
        </div>
        <CustomerOrdersClient orders={orders} />
      </div>
    </DashboardLayout>
  )
}
