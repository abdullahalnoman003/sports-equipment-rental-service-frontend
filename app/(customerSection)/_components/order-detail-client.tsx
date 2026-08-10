"use client"

import { useState } from "react"
import { OrderTimeline } from "./order-timeline"
import { ReviewForm } from "./review-form"
import { PaymentCard } from "./payment-card"
import { createPaymentSession } from "../_actions/orders"
import toast from "react-hot-toast"
import type { Rental } from "@/lib/types"

interface OrderDetailClientProps {
  order: Rental
}

export function OrderDetailClient({ order }: OrderDetailClientProps) {
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

  const handlePay = async () => {
    const res = await createPaymentSession(order.id)
    if (res.success && res.data) {
      window.location.href = res.data as string
    } else {
      toast.error(res.message || "Failed to create payment")
    }
  }

  return (
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
  )
}
