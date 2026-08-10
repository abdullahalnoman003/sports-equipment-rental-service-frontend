"use client"

import { useState } from "react"
import { Package } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { Rental } from "@/lib/types"

const STATUS_COLORS: Record<string, string> = {
  PLACED: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  PAID: "bg-purple-100 text-purple-700",
  PICKED_UP: "bg-green-100 text-green-700",
  RETURNED: "bg-gray-100 text-gray-600",
  CANCELED: "bg-red-100 text-red-700",
}

interface OrdersTableProps {
  orders: Rental[]
  onPay?: (orderId: string) => void
  onReview?: (orderId: string) => void
}

export function OrdersTable({ orders, onPay, onReview }: OrdersTableProps) {
  const [filter, setFilter] = useState<string>("ALL")
  const [search, setSearch] = useState("")

  const filtered = orders
    .filter((o) => filter === "ALL" || o.status === filter)
    .filter((o) => o.gear.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Input
            type="text"
            placeholder="Search gear..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
          <Package className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
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
              <TableHead>Gear</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((order) => {
              const startDate = new Date(order.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
              const endDate = new Date(order.end_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
              return (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                        <Package className="size-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{order.gear.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.gear.brand}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {startDate} - {endDate}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={STATUS_COLORS[order.status]}
                      variant="outline"
                    >
                      {order.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${order.total_price}
                  </TableCell>
                  <TableCell className="text-right">
                    {order.status === "CONFIRMED" && (
                      <button
                        onClick={() => onPay?.(order.id)}
                        className="text-sm text-primary hover:underline"
                      >
                        Pay Now
                      </button>
                    )}
                    {order.status === "RETURNED" && (
                      <button
                        onClick={() => onReview?.(order.id)}
                        className="text-sm text-primary hover:underline"
                      >
                        Leave Review
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No orders match your filters.
          </div>
        )}
      </div>
    </>
  )
}
