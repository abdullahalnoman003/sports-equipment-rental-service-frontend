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
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-primary" />
            Payments
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">Payment history</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View all your past transactions
          </p>
        </div>
        <PaymentsTable payments={payments} />
      </div>
    </DashboardLayout>
  )
}
