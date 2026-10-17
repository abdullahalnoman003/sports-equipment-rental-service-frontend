"use client"

import { useMemo, useState } from "react"
import { CreditCard, ChevronLeft, ChevronRight, Search, X } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "@/components/shared/status-badge"
import { useSort } from "@/components/shared/use-table-sort"
import { SortableHead } from "@/components/shared/sortable-head"
import { cn } from "@/lib/utils"
import type { Payment } from "@/lib/types"

const ITEMS_PER_PAGE = 10
const ALL_STATUSES = "ALL"

interface PaymentsTableProps {
  payments: Payment[]
}

function dateValue(payment: Payment): string {
  return payment.paid_at ?? payment.created_at ?? ""
}

export function PaymentsTable({ payments }: PaymentsTableProps) {
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState(ALL_STATUSES)

  const accessors = useMemo(
    () => ({
      gear: (p: Payment) => p.rental?.gear.name ?? "",
      transaction: (p: Payment) => p.transaction_id ?? "",
      date: (p: Payment) => dateValue(p),
      status: (p: Payment) => p.status ?? "",
      amount: (p: Payment) => Number(p.amount) || 0,
    }),
    []
  )

  const statuses = useMemo(
    () => Array.from(new Set(payments.map((p) => p.status).filter(Boolean))).sort(),
    [payments]
  )

  const searched = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return payments
    return payments.filter(
      (p) =>
        (p.rental?.gear.name ?? "").toLowerCase().includes(q) ||
        (p.transaction_id ?? "").toLowerCase().includes(q)
    )
  }, [payments, query])

  const filtered = useMemo(
    () => (status === ALL_STATUSES ? searched : searched.filter((p) => p.status === status)),
    [searched, status]
  )

  const { sorted, sort, toggleSort } = useSort(filtered, accessors)

  // Sorting resets to the first page so the user never lands on an empty one.
  const sortProps = {
    activeColumn: sort.column,
    direction: sort.direction,
    onToggle: (column: string) => setPage(toggleSort(column)),
  }

  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paged = sorted.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE)

  const hasFilters = query.trim() !== "" || status !== ALL_STATUSES

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setPage(1)
            }}
            placeholder="Search gear or transaction..."
            aria-label="Search payments"
            className="h-10 rounded-xl pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {[ALL_STATUSES, ...statuses].map((s) => {
            const active = status === s
            return (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setStatus(s)
                  setPage(1)
                }}
                aria-pressed={active}
                className={cn(
                  "inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-all",
                  active
                    ? "border-transparent bg-primary text-primary-foreground shadow-sm"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                )}
              >
                {s === ALL_STATUSES ? "All" : s}
              </button>
            )
          })}
        </div>

        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery("")
              setStatus(ALL_STATUSES)
              setPage(1)
            }}
            className="gap-1.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="size-3.5" />
            Clear
          </Button>
        )}
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <Table className="min-w-[500px]">
          <TableHeader>
            <TableRow className="bg-muted/50">
              <SortableHead label="Gear" column="gear" {...sortProps} />
              <SortableHead label="Transaction ID" column="transaction" {...sortProps} />
              <SortableHead label="Date" column="date" {...sortProps} />
              <SortableHead label="Status" column="status" {...sortProps} />
              <SortableHead label="Amount" column="amount" align="right" {...sortProps} />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <CreditCard className="size-4 text-primary" />
                    <span className="font-medium">{payment.rental?.gear.name ?? "N/A"}</span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {payment.transaction_id}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {dateValue(payment)
                    ? new Date(dateValue(payment)).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <StatusBadge status={payment.status} />
                </TableCell>
                <TableCell className="text-right font-medium">৳{payment.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {sorted.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            {payments.length === 0
              ? "No payment history found."
              : "No payments match your filters."}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(safePage - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {Math.min(safePage * ITEMS_PER_PAGE, sorted.length)} of {sorted.length} payments
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={safePage === 1}
              onClick={() => setPage(safePage - 1)}
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {safePage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              disabled={safePage === totalPages}
              onClick={() => setPage(safePage + 1)}
              aria-label="Next page"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}