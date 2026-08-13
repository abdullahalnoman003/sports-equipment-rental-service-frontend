"use client"

import { useState } from "react"
import { Package, ChevronLeft, ChevronRight } from "lucide-react"
import { StatusBadge } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { RentalWithPayment } from "@/lib/types"

const ALL_STATUSES = [
  { value: "PLACED", label: "Placed" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "PAID", label: "Paid" },
  { value: "PICKED_UP", label: "Picked Up" },
  { value: "RETURNED", label: "Returned" },
  { value: "CANCELED", label: "Canceled" },
]

const ITEMS_PER_PAGE = 10

interface OrdersTableProps {
  orders: RentalWithPayment[]
  onStatusUpdate?: (orderId: string, newStatus: string) => void
}

export function OrdersTable({ orders: initialOrders, onStatusUpdate }: OrdersTableProps) {
  const [filter, setFilter] = useState<string>("ALL")
  const [orders, setOrders] = useState(initialOrders)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [pendingStatus, setPendingStatus] = useState<Record<string, string>>({})
  const [page, setPage] = useState(1)

  const filtered = orders.filter((o) => filter === "ALL" || o.status === filter)

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const handleFilterChange = (value: string) => {
    setFilter(value)
    setPage(1)
  }

  const handleConfirm = (orderId: string) => {
    const newStatus = pendingStatus[orderId]
    if (!newStatus || newStatus === orders.find((o) => o.id === orderId)?.status) return
    setUpdatingId(orderId)
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus as RentalWithPayment["status"] } : o)),
    )
    onStatusUpdate?.(orderId, newStatus)
    setPendingStatus((prev) => {
      const next = { ...prev }
      delete next[orderId]
      return next
    })
    setTimeout(() => setUpdatingId(null), 500)
  }

  return (
    <>
      <div className="mb-4 flex items-center gap-2">
        <Select value={filter} onValueChange={handleFilterChange}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="All Orders" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Orders</SelectItem>
            <SelectItem value="PLACED">Placed</SelectItem>
            <SelectItem value="CONFIRMED">Confirmed</SelectItem>
            <SelectItem value="PAID">Paid</SelectItem>
            <SelectItem value="PICKED_UP">Picked Up</SelectItem>
            <SelectItem value="RETURNED">Returned</SelectItem>
            <SelectItem value="CANCELED">Canceled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <Table className="min-w-[600px]">
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Customer</TableHead>
              <TableHead>Gear</TableHead>
              <TableHead className="hidden sm:table-cell">Dates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((order) => {
              const startDate = new Date(order.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
              const endDate = new Date(order.end_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
              const isReturned = order.status === "RETURNED"
              const selected = pendingStatus[order.id]
              const hasPending = selected && selected !== order.status
              return (
                <TableRow key={order.id}>
                  <TableCell>
                    <p className="font-medium">{order.user.name}</p>
                    <p className="text-xs text-muted-foreground">{order.user.email}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Package className="size-4 text-primary" />
                      {order.gear.name}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">
                    {startDate} - {endDate}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ৳{order.total_price}
                  </TableCell>
                  <TableCell className="text-right">
                    {isReturned ? (
                      <span className="text-xs text-muted-foreground">N/A</span>
                    ) : (
                      <div className="flex items-center justify-end gap-2">
                        <Select
                          value={selected || ""}
                          onValueChange={(val) => setPendingStatus((prev) => ({ ...prev, [order.id]: val }))}
                          disabled={updatingId === order.id}
                        >
                          <SelectTrigger className="h-8 w-auto min-w-[130px] text-xs">
                            <SelectValue placeholder="Update status" />
                          </SelectTrigger>
                          <SelectContent>
                            {ALL_STATUSES.map((s) => (
                              <SelectItem key={s.value} value={s.value} disabled={s.value === order.status}>
                                {s.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          size="sm"
                          className="h-8 text-xs"
                          disabled={!hasPending || updatingId === order.id}
                          onClick={() => handleConfirm(order.id)}
                        >
                          Confirm
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No orders match this filter.
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(page - 1) * ITEMS_PER_PAGE + 1} to {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} orders
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
