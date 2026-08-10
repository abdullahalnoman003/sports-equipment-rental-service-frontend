import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { PaymentsTable } from "../../../_components/payments-table"
import { fetchPaymentHistory } from "../../../_actions/payments"
import type { Payment } from "@/lib/types"

export const revalidate = 30

export default async function CustomerPaymentsPage() {
  const res = await fetchPaymentHistory({ next: { revalidate: 30 } })
  const payments = res.success ? (res.data as Payment[]) : []

  return (
    <DashboardLayout role="CUSTOMER">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payment History</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View all your past transactions
          </p>
        </div>
        <PaymentsTable payments={payments} />
      </div>
    </DashboardLayout>
  )
}
