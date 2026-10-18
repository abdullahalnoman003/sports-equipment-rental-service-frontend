"use client"

import { ArrowUpDown } from "lucide-react"
import { TableHead } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import type { SortDirection } from "@/components/shared/use-table-sort"

/**
 * Clickable table header that toggles sorting.
 * Declared at module level so React does not remount it on every render.
 */
export function SortableHead({
  label,
  column,
  activeColumn,
  direction,
  onToggle,
  align,
}: {
  label: string
  column: string
  activeColumn: string | null
  direction: SortDirection
  onToggle: (column: string) => void
  align?: "right"
}) {
  const active = activeColumn === column

  return (
    <TableHead
      className={align === "right" ? "text-right" : undefined}
      aria-sort={active ? (direction === "asc" ? "ascending" : "descending") : "none"}
    >
      <button
        type="button"
        onClick={() => onToggle(column)}
        className={cn(
          "inline-flex items-center gap-1.5 transition-colors hover:text-primary",
          active && "text-primary"
        )}
      >
        {label}
        <ArrowUpDown className="size-3" />
      </button>
    </TableHead>
  )
}