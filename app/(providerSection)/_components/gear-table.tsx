"use client"

import { useState } from "react"
import { Package, Search, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export function GearTable({ gear, onEdit, onDelete }: GearTableProps) {
  const [search, setSearch] = useState("")

  const filtered = gear.filter(
    (g) =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.brand.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <>
      <div className="mb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search gear..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <Table className="min-w-[500px]">
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Gear</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price/Day</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((gear) => (
              <TableRow key={gear.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                      <Package className="size-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{gear.name}</p>
                      <p className="text-xs text-muted-foreground">{gear.brand}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{gear.category_Name}</TableCell>
                <TableCell className="font-medium">${gear.price}</TableCell>
                <TableCell className="text-muted-foreground">{gear.quantity}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit?.(gear.id)}>
                        <Pencil className="size-3.5" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => onDelete?.(gear.id)}
                      >
                        <Trash2 className="size-3.5" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No gear matches your search.
          </div>
        )}
      </div>
    </>
  )
}
