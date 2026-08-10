import Link from "next/link"
import type { RentalStatus } from "@/lib/types"

const STATUS_COLORS: Record<string, string> = {
  PLACED: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  PAID: "bg-purple-100 text-purple-700",
  PICKED_UP: "bg-green-100 text-green-700",
  RETURNED: "bg-gray-100 text-gray-600",
  CANCELED: "bg-red-100 text-red-700",
}

interface OrderItem {
  id: string
  customer: string
  gear: string
  status: RentalStatus
  dates: string
  total: number
}

interface OrdersListProps {
  orders: OrderItem[]
}

export function OrdersList({ orders }: OrdersListProps) {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <h2 className="text-lg font-semibold">Recent Orders</h2>
        <Link href="/dashboard/provider/orders" className="text-sm text-primary hover:underline">
          View all
        </Link>
      </div>
      <div className="divide-y divide-border">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{order.gear}</p>
              <p className="text-xs text-muted-foreground">
                {order.customer} &middot; {order.dates}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${STATUS_COLORS[order.status]}`}
              >
                {order.status.replace("_", " ")}
              </span>
              <p className="text-sm font-semibold">${order.total}</p>
            </div>
          </div>
        ))}
        {orders.length === 0 && (
          <div className="px-6 py-8 text-center text-sm text-muted-foreground">
            No orders yet.
          </div>
        )}
      </div>
    </div>
  )
}
