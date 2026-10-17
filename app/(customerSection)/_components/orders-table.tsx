"use client"

import { useMemo, useState } from "react"
import { Package, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { StatusBadge } from "@/components/shared/status-badge"
import { useSort } from "@/components/shared/use-table-sort"
import { SortableHead } from "@/components/shared/sortable-head"
import type { Rental } from "@/lib/types"

const ITEMS_PER_PAGE = 10

function getPageItems(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  if (current <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis", total]
  }
  if (current >= total - 3) {
    return [1, "ellipsis", total - 4, total - 3, total - 2, total - 1, total]
  }
  return [1, "ellipsis", current - 1, current, current + 1, "ellipsis", total]
}

interface OrdersTableProps {
  orders: Rental[]
  onPay?: (orderId: string) => void
  onReview?: (orderId: string) => void
}

export function OrdersTable({ orders, onPay, onReview }: OrdersTableProps) {
  const [filter, setFilter] = useState<string>("ALL")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const filtered = orders
    .filter((o) => filter === "ALL" || o.status === filter)
    .filter((o) => o.gear.name.toLowerCase().includes(search.toLowerCase()))
  const accessors = useMemo(
    () => ({
      gear: (o: Rental) => o.gear?.name ?? "",
      dates: (o: Rental) => o.start_date ?? "",
      status: (o: Rental) => o.status ?? "",
      total: (o: Rental) => Number(o.total_price) || 0,
    }),
    []
  )

  const { sorted, sort, toggleSort } = useSort(filtered, accessors)

  // Sorting resets to the first page so the user never lands on an empty one.
  const sortProps = {
    activeColumn: sort.column,
    direction: sort.direction,
    onToggle: (column: string) => setPage(toggleSort(column)),
  }


  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const paged = sorted.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const handleFilterChange = (value: string) => {
    setFilter(value)
    setPage(1)
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Input
            type="text"
            placeholder="Search gear..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
          />
          <Package className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        <Select value={filter} onValueChange={handleFilterChange}>
          <SelectTrigger className="w-45">
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
        <Table className="min-w-150">
          <TableHeader>
            <TableRow className="bg-muted/50">
              <SortableHead label="Gear" column="gear" {...sortProps} />
              <TableHead>Dates</TableHead>
              <SortableHead label="Status" column="status" {...sortProps} />
              <SortableHead label="Total" column="total" align="right" {...sortProps} />
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((order) => {
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
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ৳{order.total_price}
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

      {totalPages > 1 && (
        <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} orders
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => setPage(currentPage - 1)}
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" />
            </Button>

            {getPageItems(currentPage, totalPages).map((item, i) =>
              item === "ellipsis" ? (
                <span
                  key={`ellipsis-${i}`}
                  className="flex size-9 items-center justify-center text-muted-foreground"
                  aria-hidden
                >
                  <MoreHorizontal className="size-4" />
                </span>
              ) : (
                <Button
                  key={item}
                  variant={item === currentPage ? "default" : "outline"}
                  size="icon"
                  onClick={() => setPage(item)}
                  aria-current={item === currentPage ? "page" : undefined}
                >
                  {item}
                </Button>
              )
            )}

            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() => setPage(currentPage + 1)}
              aria-label="Next page"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
