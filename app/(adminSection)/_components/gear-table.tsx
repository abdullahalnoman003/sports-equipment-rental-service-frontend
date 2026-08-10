"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Eye, Package } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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
import type { Gear } from "@/lib/types"

interface GearTableProps {
  gear: Gear[]
}

export function GearTable({ gear }: GearTableProps) {
  const [search, setSearch] = useState("")
  const [catFilter, setCatFilter] = useState("ALL")

  const categories = ["ALL", ...new Set(gear.map((g) => g.category_Name))]

  const filtered = gear
    .filter((g) => catFilter === "ALL" || g.category_Name === catFilter)
    .filter(
      (g) =>
        g.name.toLowerCase().includes(search.toLowerCase()) ||
        g.brand.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search gear..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={catFilter} onValueChange={setCatFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c === "ALL" ? "All Categories" : c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <Table className="min-w-[600px]">
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Gear</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Price/Day</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                      <Package className="size-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.brand}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{item.category_Name}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{item.provider_email}</TableCell>
                <TableCell className="font-medium">${item.price}</TableCell>
                <TableCell className="text-muted-foreground">{item.quantity}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/gear/${item.id}`} className="inline-flex items-center gap-1 text-primary hover:underline">
                      <Eye className="size-3.5" />
                      View
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No gear found.
          </div>
        )}
      </div>
    </div>
  )
}
