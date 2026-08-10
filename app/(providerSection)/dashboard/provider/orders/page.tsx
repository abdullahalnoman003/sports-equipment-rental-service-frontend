"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { OrdersTable } from "../../../_components/orders-table"
import { fetchProviderOrders, updateOrderStatus } from "../../../_actions/gear"
import toast from "react-hot-toast"
import type { RentalWithPayment } from "@/lib/types"

export default function ProviderOrdersPage() {
  const [orders, setOrders] = useState<RentalWithPayment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetchProviderOrders()
        if (res.success) {
          setOrders(res.data as RentalWithPayment[])
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

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    const res = await updateOrderStatus(orderId, newStatus)
    if (res.success) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus as RentalWithPayment["status"] } : o))
      )
      toast.success("Order status updated!")
    } else {
      toast.error(res.message || "Failed to update status")
    }
  }

  return (
    <DashboardLayout role="PROVIDER">
      {loading ? (
        <div className="space-y-6">
          <div className="h-8 w-40 animate-pulse rounded bg-muted" />
          <div className="h-10 w-44 animate-pulse rounded-md bg-muted" />
          <div className="h-96 animate-pulse rounded-xl border border-border bg-card" />
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Incoming Orders</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage rental orders for your gear
            </p>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <OrdersTable orders={orders} onStatusUpdate={handleStatusUpdate} />
        </div>
      )}
    </DashboardLayout>
  )
}
