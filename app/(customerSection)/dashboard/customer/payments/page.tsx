"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { PaymentsTable } from "../../../_components/payments-table"
import { fetchPaymentHistory } from "../../../_actions/payments"
import toast from "react-hot-toast"
import type { Payment } from "@/lib/types"

export default function CustomerPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchPayments() {
      try {
        const res = await fetchPaymentHistory()
        if (res.success) {
          setPayments(res.data as Payment[])
        } else {
          setError(res.message || "Failed to fetch payments")
          toast.error(res.message || "Failed to fetch payments")
        }
      } catch {
        setError("Failed to fetch payments")
        toast.error("Failed to fetch payments")
      } finally {
        setLoading(false)
      }
    }
    fetchPayments()
  }, [])

  return (
    <DashboardLayout role="CUSTOMER">
      {loading ? (
        <div className="space-y-6">
          <div className="h-8 w-40 animate-pulse rounded bg-muted" />
          <div className="h-96 animate-pulse rounded-xl border border-border bg-card" />
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Payment History</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              View all your past transactions
            </p>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <PaymentsTable payments={payments} />
        </div>
      )}
    </DashboardLayout>
  )
}
