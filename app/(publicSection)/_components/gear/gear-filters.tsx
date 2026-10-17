"use client"

import { useState } from "react"
import {
  SlidersHorizontal,
  ArrowDownWideNarrow,
  X,
  CircleDollarSign,
  RotateCcw,
  Tag,
  Star,
  PackageCheck,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AiSearchBox } from "@/components/ai/search-box"
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
  sortBy: "name" | "price-low" | "price-high" | "rating"
  onSortChange: (value: "name" | "price-low" | "price-high" | "rating") => void
  categories: string[]
  brands: string[]
  brand: string
  onBrandChange: (value: string) => void
  inStockOnly: boolean
  onInStockChange: (value: boolean) => void
  minRating: number
  onMinRatingChange: (value: number) => void
  /** False when no gear has reviews yet, hiding the rating filter. */
  hasRatings: boolean
  onClearAll: () => void
  resultCount: number
  minPrice?: number
  maxPrice?: number
  onPriceChange: (minPrice?: number, maxPrice?: number) => void
}

const sortOptions = [
  { value: "name", label: "Sort by Name" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Rating: High to Low" },
]

const ALL_BRANDS = "all"

export function GearFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sortBy,
  onSortChange,
  categories,
  brands,
  brand,
  onBrandChange,
  inStockOnly,
  onInStockChange,
  minRating,
  onMinRatingChange,
  hasRatings,
  onClearAll,
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

  const hasAnyFilter =
    hasPriceFilter ||
    search.trim() !== "" ||
    category !== "All" ||
    brand !== ALL_BRANDS ||
    inStockOnly ||
    minRating > 0

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
        <div className="flex-1 sm:max-w-md">
          <AiSearchBox search={search} onSearchChange={onSearchChange} />
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

      {/* Brand, availability and rating */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:gap-6 sm:p-5">
        {/* Brand */}
        <div className="flex flex-1 items-center gap-3">
          <span className="hidden shrink-0 items-center gap-2 text-sm font-medium text-muted-foreground sm:inline-flex">
            <Tag className="size-4 text-primary" />
            Brand
          </span>
          <Select value={brand} onValueChange={onBrandChange}>
            <SelectTrigger
              className="h-11 w-full rounded-xl sm:max-w-[13rem]"
              aria-label="Filter by brand"
            >
              <SelectValue placeholder="All brands" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_BRANDS}>All brands</SelectItem>
              {brands.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* In stock */}
        <label className="flex cursor-pointer items-center gap-2.5">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockChange(e.target.checked)}
            className="size-4 rounded border-border accent-primary"
          />
          <span className="inline-flex items-center gap-1.5 text-sm font-medium">
            <PackageCheck className="size-4 text-primary" />
            In stock only
          </span>
        </label>

        {/* Rating */}
        {hasRatings && (
          <div className="flex items-center gap-2">
            <span className="hidden shrink-0 items-center gap-2 text-sm font-medium text-muted-foreground sm:inline-flex">
              <Star className="size-4 fill-gold text-gold" />
              Rating
            </span>
            <div className="flex items-center gap-1.5">
              {[4, 3].map((stars) => {
                const active = minRating === stars
                return (
                  <button
                    key={stars}
                    type="button"
                    onClick={() => onMinRatingChange(active ? 0 : stars)}
                    aria-pressed={active}
                    className={`inline-flex h-9 items-center gap-1 rounded-full border px-3 text-xs font-semibold transition-all ${
                      active
                        ? "border-transparent bg-gold/20 text-gold-deep shadow-sm"
                        : "border-border text-muted-foreground hover:border-gold-deep/40 hover:text-foreground"
                    }`}
                  >
                    <Star className="size-3 fill-gold text-gold" />
                    {stars}+
                  </button>
                )
              })}
            </div>
          </div>
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

      {hasAnyFilter && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Active
          </span>

          {search && (
            <FilterChip label={`Search: ${search}`} onClear={() => onSearchChange("")} />
          )}
          {category !== "All" && (
            <FilterChip label={category} onClear={() => onCategoryChange("All")} />
          )}
          {brand !== ALL_BRANDS && (
            <FilterChip label={brand} onClear={() => onBrandChange(ALL_BRANDS)} />
          )}
          {hasPriceFilter && (
            <FilterChip
              label={`৳${minPrice ?? 0} to ${maxPrice ? `৳${maxPrice}` : "any"}`}
              onClear={() => {
                setMinInput("")
                setMaxInput("")
                onPriceChange(undefined, undefined)
              }}
            />
          )}
          {inStockOnly && (
            <FilterChip label="In stock" onClear={() => onInStockChange(false)} />
          )}
          {minRating > 0 && (
            <FilterChip label={`${minRating}+ stars`} onClear={() => onMinRatingChange(0)} />
          )}

          <button
            type="button"
            onClick={onClearAll}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/10"
          >
            <RotateCcw className="size-3" />
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}

function FilterChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
      <span className="max-w-[10rem] truncate">{label}</span>
      <button
        type="button"
        onClick={onClear}
        aria-label={`Remove ${label} filter`}
        className="rounded-full p-0.5 transition-colors hover:bg-primary/20"
      >
        <X className="size-3" />
      </button>
    </span>
  )
}
