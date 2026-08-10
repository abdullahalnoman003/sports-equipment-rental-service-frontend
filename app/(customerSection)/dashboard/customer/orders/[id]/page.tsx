"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { DashboardSidebar } from "@/components/shared/dashboard-sidebar"
import { OrderTimeline } from "../../../../_components/order-timeline"
import { ReviewForm } from "../../../../_components/review-form"
import { PaymentCard } from "../../../../_components/payment-card"
import { useState, useEffect } from "react"
import { fetchRentalDetails, createPaymentSession } from "../../../../_actions/orders"
import toast from "react-hot-toast"
import type { Rental } from "@/lib/types"
import { useParams } from "next/navigation"

export default function CustomerOrderDetailPage() {
  const params = useParams()
  const rentalId = params.id as string
  const [reviewSubmitted, setReviewSubmitted] = useState(false)
  const [order, setOrder] = useState<Rental | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetchRentalDetails(rentalId)
        if (res.success) {
          setOrder(res.data as Rental)
        } else {
          setError(res.message || "Failed to fetch order")
          toast.error(res.message || "Failed to fetch order")
        }
      } catch {
        setError("Failed to fetch order")
        toast.error("Failed to fetch order")
      } finally {
        setLoading(false)
      }
    }
    if (rentalId) fetchOrder()
  }, [rentalId])

  const handlePay = async () => {
    if (!order) return
    const res = await createPaymentSession(order.id)
    if (res.success && res.data) {
      window.location.href = res.data as string
    } else {
      toast.error(res.message || "Failed to create payment")
    }
  }

  if (loading) {
    return (
      <div className="flex flex-1">
        <DashboardSidebar role="CUSTOMER" />
        <main className="flex-1 overflow-auto p-6 lg:p-8">
          <p className="text-sm text-muted-foreground">Loading order details...</p>
        </main>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="flex flex-1">
        <DashboardSidebar role="CUSTOMER" />
        <main className="flex-1 overflow-auto p-6 lg:p-8">
          <p className="text-sm text-destructive">{error || "Order not found"}</p>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-1">
      <DashboardSidebar role="CUSTOMER" />
      <main className="flex-1 overflow-auto p-6 lg:p-8">
        <Link href="/dashboard/customer/orders" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="size-4" />
          Back to Rentals
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{order.gear.name}</h1>
              <p className="text-muted-foreground">{order.gear.brand} &middot; {order.gear.category_Name}</p>
            </div>

            <OrderTimeline currentStatus={order.status} />

            {order.status === "RETURNED" && !reviewSubmitted && (
              <ReviewForm rentalId={order.id} onSubmit={() => setReviewSubmitted(true)} />
            )}
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <PaymentCard
              gearName={order.gear.name}
              gearBrand={order.gear.brand}
              startDate={order.start_date}
              endDate={order.end_date}
              pricePerDay={order.gear.price}
              total={order.total_price}
              showPayButton={order.status === "CONFIRMED"}
              onPay={handlePay}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
