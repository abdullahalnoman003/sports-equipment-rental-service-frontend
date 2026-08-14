import type { Metadata } from "next"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { fetchProviderOrders } from "../../../_actions/gear"
import { ProviderOrdersClient } from "../../../_components/provider-orders-client"
import type { RentalWithPayment } from "@/lib/types"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Incoming Orders",
  description: "Manage and update rental orders for your gear on the GearUp provider dashboard.",
}

export default async function ProviderOrdersPage() {
  const res = await fetchProviderOrders()
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
