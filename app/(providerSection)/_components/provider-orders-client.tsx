"use client"

import { useRouter } from "next/navigation"
import { OrdersTable } from "./orders-table"
import { updateOrderStatus } from "../_actions/gear"
import { friendlyError } from "@/lib/messages"
import toast from "react-hot-toast"
import type { RentalWithPayment } from "@/lib/types"

interface ProviderOrdersClientProps {
  orders: RentalWithPayment[]
}

export function ProviderOrdersClient({ orders }: ProviderOrdersClientProps) {
  const router = useRouter()

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    const res = await updateOrderStatus(orderId, newStatus)
    if (res.success) {
      toast.success("Order status updated!")
      router.refresh()
    } else {
      toast.error(friendlyError(res.message, "Please login to manage orders"))
    }
  }

  return <OrdersTable orders={orders} onStatusUpdate={handleStatusUpdate} />
}
