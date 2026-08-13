"use client"

import { Search, SlidersHorizontal, ArrowDownWideNarrow, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface GearFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  category: string
  onCategoryChange: (value: string) => void
  sortBy: "name" | "price-low" | "price-high"
  onSortChange: (value: "name" | "price-low" | "price-high") => void
  categories: string[]
  resultCount: number
}

const sortOptions = [
  { value: "name", label: "Sort by Name" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
]

export function GearFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sortBy,
  onSortChange,
  categories,
  resultCount,
}: GearFiltersProps) {
  return (
    <div className="mb-8 space-y-5">
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name or brand..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-11 rounded-xl border-border bg-background pl-11 pr-10"
            aria-label="Search gear"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden size-9 items-center justify-center rounded-xl bg-primary/10 text-primary sm:flex">
            <ArrowDownWideNarrow className="size-4" />
          </span>
          <Select value={sortBy} onValueChange={(v) => onSortChange(v as typeof sortBy)}>
            <SelectTrigger className="h-11 w-full rounded-xl sm:w-48" aria-label="Sort gear">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2" id="categories">
        <span className="mr-1 hidden items-center gap-1.5 text-sm font-medium text-muted-foreground sm:inline-flex">
          <SlidersHorizontal className="size-4" />
          Category
        </span>
        {categories.map((cat) => {
          const active = category === cat
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              aria-pressed={active}
              className={cn(
                "inline-flex h-9 items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-all",
                active
                  ? "border-transparent bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "border-border bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              )}
            >
              {active && <span className="size-1.5 rounded-full bg-current" />}
              {cat}
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>
          <span className="font-semibold text-foreground">{resultCount}</span> item
          {resultCount !== 1 ? "s" : ""} found
        </p>
        {category !== "All" && (
          <button
            type="button"
            onClick={() => onCategoryChange("All")}
            className="inline-flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary/80"
          >
            <X className="size-3.5" />
            Clear category
          </button>
        )}
      </div>
    </div>
  )
}
