import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { fetchProviderOrders } from "../../../_actions/gear"
import { ProviderOrdersClient } from "../../../_components/provider-orders-client"
import type { RentalWithPayment } from "@/lib/types"

export const revalidate = 30

export default async function ProviderOrdersPage() {
  const res = await fetchProviderOrders({ next: { revalidate: 30 } })
  const orders = (res.success ? (res.data as RentalWithPayment[]) : []).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  return (
    <DashboardLayout role="PROVIDER">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Incoming Orders</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage rental orders for your gear
          </p>
        </div>
        <ProviderOrdersClient orders={orders} />
      </div>
    </DashboardLayout>
  )
}
