"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { OrdersTable } from "../../../_components/orders-table"
import { fetchMyRentals, createPaymentSession } from "../../../_actions/orders"
import toast from "react-hot-toast"
import type { Rental } from "@/lib/types"

export default function CustomerOrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Rental[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetchMyRentals()
        if (res.success) {
          setOrders(res.data as Rental[])
        } else {
          setError(res.message || "Failed to fetch orders")
          toast.error(res.message || "Failed to fetch orders")
        }
      } catch {
        setError("Failed to fetch orders")
        toast.error("Failed to fetch orders")
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const handlePay = async (rentalId: string) => {
    const res = await createPaymentSession(rentalId)
    if (res.success && res.data) {
      window.location.href = res.data as string
    } else {
      toast.error(res.message || "Failed to create payment")
    }
  }

  const handleReview = (orderId: string) => {
    router.push(`/dashboard/customer/orders/${orderId}`)
  }

  return (
    <DashboardLayout role="CUSTOMER">
      {loading ? (
        <div className="space-y-6">
          <div className="h-8 w-32 animate-pulse rounded bg-muted" />
          <div className="h-96 animate-pulse rounded-xl border border-border bg-card" />
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Rentals</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Track and manage all your rental orders
            </p>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <OrdersTable orders={orders} onPay={handlePay} onReview={handleReview} />
        </div>
      )}
    </DashboardLayout>
  )
}
