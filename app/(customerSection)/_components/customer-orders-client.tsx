"use client"

import { useRouter } from "next/navigation"
import { OrdersTable } from "./orders-table"
import { createPaymentSession } from "../_actions/orders"
import { friendlyError } from "@/lib/messages"
import toast from "react-hot-toast"
import type { Rental } from "@/lib/types"

interface CustomerOrdersClientProps {
  orders: Rental[]
}

export function CustomerOrdersClient({ orders }: CustomerOrdersClientProps) {
  const router = useRouter()

  const handlePay = async (rentalId: string) => {
    const res = await createPaymentSession(rentalId)
    if (res.success && res.data) {
      window.location.href = res.data as string
    } else {
      toast.error(friendlyError(res.message, "Please login to view your orders"))
    }
  }

  const handleReview = (orderId: string) => {
    router.push(`/dashboard/customer/orders/${orderId}`)
  }

  return <OrdersTable orders={orders} onPay={handlePay} onReview={handleReview} />
}
