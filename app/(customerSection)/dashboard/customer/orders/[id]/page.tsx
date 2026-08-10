import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { fetchRentalDetails } from "../../../../_actions/orders"
import { OrderDetailClient } from "../../../../_components/order-detail-client"
import type { Rental } from "@/lib/types"

export const revalidate = 30

export default async function CustomerOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: rentalId } = await params
  const res = await fetchRentalDetails(rentalId, { next: { revalidate: 30 } })

  if (!res.success || !res.data) {
    return (
      <DashboardLayout role="CUSTOMER">
        <div className="space-y-6">
          <Link href="/dashboard/customer/orders" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="size-4" />
            Back to Rentals
          </Link>
          <p className="text-sm text-destructive">Order not found</p>
        </div>
      </DashboardLayout>
    )
  }

  const order = res.data as Rental

  return (
    <DashboardLayout role="CUSTOMER">
      <div className="space-y-6">
        <Link href="/dashboard/customer/orders" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="size-4" />
          Back to Rentals
        </Link>
        <OrderDetailClient order={order} />
      </div>
    </DashboardLayout>
  )
}
