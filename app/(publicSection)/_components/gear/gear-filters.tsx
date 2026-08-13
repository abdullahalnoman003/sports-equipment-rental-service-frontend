"use client"

import { useState } from "react"
import {
  Search,
  SlidersHorizontal,
  ArrowDownWideNarrow,
  X,
  CircleDollarSign,
  RotateCcw,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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
  minPrice?: number
  maxPrice?: number
  onPriceChange: (minPrice?: number, maxPrice?: number) => void
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
  minPrice,
  maxPrice,
  onPriceChange,
}: GearFiltersProps) {
  const [minInput, setMinInput] = useState(minPrice ? String(minPrice) : "")
  const [maxInput, setMaxInput] = useState(maxPrice ? String(maxPrice) : "")
  const [priceError, setPriceError] = useState("")
  const [prevPrice, setPrevPrice] = useState({ min: minPrice, max: maxPrice })

  if (prevPrice.min !== minPrice || prevPrice.max !== maxPrice) {
    setPrevPrice({ min: minPrice, max: maxPrice })
    setMinInput(minPrice ? String(minPrice) : "")
    setMaxInput(maxPrice ? String(maxPrice) : "")
  }

  const hasPriceFilter = (minPrice ?? 0) > 0 || (maxPrice ?? 0) > 0

  function handleApplyPrice() {
    const rawMin = minInput.trim()
    const rawMax = maxInput.trim()
    const min = rawMin === "" ? undefined : Math.max(0, Number(rawMin))
    const max = rawMax === "" ? undefined : Math.max(0, Number(rawMax))

    if (min !== undefined && max !== undefined && min > max) {
      setPriceError("Minimum price cannot be greater than maximum price.")
      return
    }
    if ((min !== undefined && Number.isNaN(min)) || (max !== undefined && Number.isNaN(max))) {
      setPriceError("Please enter a valid price.")
      return
    }
    setPriceError("")
    onPriceChange(min, max)
  }

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

      {/* Price filter */}
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:gap-4 sm:p-5">
        <span className="hidden items-center gap-2 text-sm font-medium text-muted-foreground sm:inline-flex">
          <CircleDollarSign className="size-4 text-primary" />
          Price range
        </span>

        <div className="flex flex-1 items-center gap-2 sm:max-w-md">
          <div className="relative flex-1">
            <Input
              type="number"
              min={0}
              inputMode="numeric"
              placeholder="Min (৳)"
              value={minInput}
              onChange={(e) => {
                setMinInput(e.target.value)
                setPriceError("")
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleApplyPrice()
                }
              }}
              aria-label="Minimum price"
              className="h-11 rounded-xl border-border bg-background pl-4 pr-2"
            />
          </div>
          <span className="text-sm text-muted-foreground">to</span>
          <div className="relative flex-1">
            <Input
              type="number"
              min={0}
              inputMode="numeric"
              placeholder="Max (৳)"
              value={maxInput}
              onChange={(e) => {
                setMaxInput(e.target.value)
                setPriceError("")
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleApplyPrice()
                }
              }}
              aria-label="Maximum price"
              className="h-11 rounded-xl border-border bg-background pl-4 pr-2"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            className="h-11 rounded-xl px-5 shadow-lg shadow-primary/20"
            onClick={handleApplyPrice}
          >
            Apply
          </Button>
          {(hasPriceFilter || minInput !== "" || maxInput !== "") && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-11 gap-1.5 rounded-xl text-muted-foreground hover:text-foreground"
              onClick={() => {
                setMinInput("")
                setMaxInput("")
                setPriceError("")
                onPriceChange(undefined, undefined)
              }}
            >
              <RotateCcw className="size-3.5" />
              Clear
            </Button>
          )}
        </div>

        {priceError && (
          <p className="text-xs text-destructive sm:w-full">{priceError}</p>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>
          <span className="font-semibold text-foreground">{resultCount}</span> item
          {resultCount !== 1 ? "s" : ""} found
        </p>
        <div className="flex items-center gap-4">
          {hasPriceFilter && (
            <span className="inline-flex items-center gap-1 font-medium text-primary">
              <CircleDollarSign className="size-3.5" />
              {minPrice && minPrice > 0 ? `৳${minPrice}` : "৳0"}
              {" - "}
              {maxPrice && maxPrice > 0 ? `৳${maxPrice}` : "৳∞"}
            </span>
          )}
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
    </div>
  )
}
