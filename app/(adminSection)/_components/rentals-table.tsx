"use client"

import { useState } from "react"
import { Search, Package } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import type { Rental } from "@/lib/types"

const STATUS_COLORS: Record<string, string> = {
  PLACED: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  PAID: "bg-purple-100 text-purple-700",
  PICKED_UP: "bg-green-100 text-green-700",
  RETURNED: "bg-gray-100 text-gray-600",
  CANCELED: "bg-red-100 text-red-700",
}

interface RentalsTableProps {
  rentals: Rental[]
}

export function RentalsTable({ rentals }: RentalsTableProps) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")

  const filtered = rentals
    .filter((r) => statusFilter === "ALL" || r.status === statusFilter)
    .filter(
      (r) =>
        r.user.name.toLowerCase().includes(search.toLowerCase()) ||
        r.gear.name.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search customer or gear..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-44">
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
        <Table className="min-w-[550px]">
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Customer</TableHead>
              <TableHead>Gear</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((rental) => {
              const startDate = new Date(rental.start_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
              const endDate = new Date(rental.end_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
              return (
                <TableRow key={rental.id}>
                  <TableCell>
                    <p className="font-medium">{rental.user.name}</p>
                    <p className="text-xs text-muted-foreground">{rental.user.email}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Package className="size-4 text-primary" />
                      {rental.gear.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {startDate} - {endDate}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${STATUS_COLORS[rental.status]} border-none`}>
                      {rental.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">${rental.total_price}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No rentals found.
          </div>
        )}
      </div>
    </div>
  )
}
