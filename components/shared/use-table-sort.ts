"use client"

import { useMemo, useState } from "react"

/**
 * Shared column sorting and text search for dashboard tables.
 *
 * Sort keys are plain strings rather than `keyof T`, because several tables have
 * virtual columns such as "gear" or "total" that do not exist on the row type.
 *
 * Sorting runs after filtering and before pagination.
 */

export type SortDirection = "asc" | "desc"

export type Accessors<T> = Record<string, (row: T) => string | number>

export interface SortState {
  column: string | null
  direction: SortDirection
}

export function useSort<T>(rows: T[], accessors: Accessors<T>) {
  const [sort, setSort] = useState<SortState>({ column: null, direction: "asc" })

  const sorted = useMemo(() => {
    const column = sort.column
    if (!column) return rows
    const accessor = accessors[column]
    if (!accessor) return rows

    const factor = sort.direction === "asc" ? 1 : -1
    return [...rows].sort((a, b) => {
      const av = accessor(a)
      const bv = accessor(b)
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * factor
      return String(av).localeCompare(String(bv)) * factor
    })
  }, [rows, sort, accessors])

  /** Flips direction when the active column is clicked, otherwise starts ascending. */
  const toggleSort = (column: string): number => {
    setSort((prev) =>
      prev.column === column
        ? { column, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { column, direction: "asc" }
    )
    return 1
  }

  return { sorted, sort, toggleSort }
}

export type SearchFields<T> = Array<(row: T) => string>

/** Case-insensitive substring match across the given projections. */
export function useSearch<T>(rows: T[], fields: SearchFields<T>) {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter((row) => fields.some((get) => get(row).toLowerCase().includes(q)))
  }, [rows, query, fields])

  return { filtered, query, setQuery }
}