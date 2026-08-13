import Link from "next/link"
import { Package, ArrowUpRight } from "lucide-react"
import { StatusBadge } from "@/components/shared/status-badge"
import type { RentalStatus } from "@/lib/types"

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
    <div className="overflow-hidden rounded-3xl border border-border bg-card transition-colors hover:border-primary/25">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
            <Package className="size-4 text-primary" />
          </span>
          <h2 className="text-lg font-bold tracking-tight">Recent Orders</h2>
        </div>
        <Link
          href="/dashboard/provider/orders"
          className="group inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          View all
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
      <div className="divide-y divide-border/70">
        {orders.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-muted">
              <Package className="size-5 text-muted-foreground/60" />
            </span>
            <p className="mt-3 text-sm text-muted-foreground">No orders yet.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between gap-3 px-6 py-3.5 transition-colors hover:bg-muted/30"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{order.gear}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {order.customer} &middot; {order.dates}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1.5">
                <StatusBadge status={order.status} className="px-2 py-0.5 text-[10px]" />
                <p className="text-sm font-bold">৳{order.total}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
