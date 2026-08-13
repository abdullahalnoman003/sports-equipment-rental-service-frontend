"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Package,
  ChevronLeft,
  ChevronRight,
  SearchX,
  ArrowUpRight,
  Compass,
  Timer,
  BadgeCheck,
} from "lucide-react"
import { GearFilters } from "./gear-filters"
import { GearCard } from "./gear-card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Gear } from "@/lib/types"

const ITEMS_PER_PAGE = 9

interface GearClientProps {
  gear: Gear[]
  categories: string[]
  initialCategory?: string
}

export function GearClient({ gear, categories, initialCategory }: GearClientProps) {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState(
    initialCategory && initialCategory !== "All" ? initialCategory : "All"
  )
  const [sortBy, setSortBy] = useState<"name" | "price-low" | "price-high">("name")
  const [page, setPage] = useState(1)

  const allCategories = ["All", ...categories]

  const filtered = gear
    .filter((g) => category === "All" || g.category_Name === category)
    .filter(
      (g) =>
        g.name.toLowerCase().includes(search.toLowerCase()) ||
        g.brand.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price
      if (sortBy === "price-high") return b.price - a.price
      return a.name.localeCompare(b.name)
    })

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paged = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE)

  const inStockCount = filtered.filter((g) => g.quantity > 0).length

  function handleSearchChange(value: string) {
    setSearch(value)
    setPage(1)
  }

  function handleCategoryChange(value: string) {
    setCategory(value)
    setPage(1)

    const params = new URLSearchParams(window.location.search)
    if (value === "All") {
      params.delete("category")
    } else {
      params.set("category", value)
    }
    const qs = params.toString()
    router.replace(qs ? `/gear?${qs}` : "/gear", { scroll: false })
  }

  function handleSortChange(value: "name" | "price-low" | "price-high") {
    setSortBy(value)
    setPage(1)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Page header */}
      <div className="relative mb-10 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card to-muted/30 p-8 sm:p-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 size-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 size-72 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute inset-0 bg-dots-faint [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_50%,transparent_100%)]" />
        </div>

        <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-primary" />
              Explore the collection
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              Browse <span className="text-gradient-brand">Gear</span>
            </h1>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Find sports and outdoor equipment from trusted local providers.
              Filter by category, search by name or brand, and book in minutes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl border border-border bg-card/80 px-5 py-3.5 backdrop-blur-sm">
              <p className="flex items-center gap-2 text-2xl font-bold leading-none">
                <Package className="size-5 text-primary" />
                {filtered.length}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Items listed</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/80 px-5 py-3.5 backdrop-blur-sm">
              <p className="flex items-center gap-2 text-2xl font-bold leading-none">
                <BadgeCheck className="size-5 text-primary" />
                {inStockCount}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">In stock</p>
            </div>
          </div>
        </div>
      </div>

      <GearFilters
        search={search}
        onSearchChange={handleSearchChange}
        category={category}
        onCategoryChange={handleCategoryChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        categories={allCategories}
        resultCount={filtered.length}
      />

      {paged.length === 0 ? (
        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-border py-24 text-center">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
          </div>
          <div className="relative flex size-20 items-center justify-center rounded-3xl bg-primary/10">
            <SearchX className="size-9 text-primary" />
          </div>
          <h2 className="mt-6 text-2xl font-bold tracking-tight">No gear found</h2>
          <p className="mt-2 max-w-sm text-muted-foreground">
            We could not find anything matching your search. Try a different keyword or browse all categories.
          </p>
          <Button
            variant="outline"
            className="mt-6 gap-2"
            onClick={() => {
              handleSearchChange("")
              handleCategoryChange("All")
            }}
          >
            Reset filters
          </Button>
        </div>
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {paged.map((item) => (
              <GearCard key={item.id} gear={item} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex flex-col items-center justify-center gap-4">
              <nav
                aria-label="Pagination"
                className="flex items-center gap-1.5 rounded-2xl border border-border bg-card/60 p-2 backdrop-blur-sm"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={safePage === 1}
                  onClick={() => setPage(safePage - 1)}
                  aria-label="Previous page"
                  className="rounded-xl"
                >
                  <ChevronLeft className="size-4" />
                </Button>

                <div className="hidden items-center gap-1 sm:flex">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Button
                      key={p}
                      variant={p === safePage ? "default" : "ghost"}
                      size="icon"
                      onClick={() => setPage(p)}
                      aria-current={p === safePage ? "page" : undefined}
                      aria-label={`Page ${p}`}
                      className={cn("rounded-xl", p === safePage && "shadow-lg shadow-primary/25")}
                    >
                      {p}
                    </Button>
                  ))}
                </div>

                <span className="px-2 text-sm font-medium text-muted-foreground sm:hidden">
                  Page {safePage} of {totalPages}
                </span>

                <Button
                  variant="ghost"
                  size="icon"
                  disabled={safePage === totalPages}
                  onClick={() => setPage(safePage + 1)}
                  aria-label="Next page"
                  className="rounded-xl"
                >
                  <ChevronRight className="size-4" />
                </Button>
              </nav>
              <p className="text-xs text-muted-foreground">
                Showing {(safePage - 1) * ITEMS_PER_PAGE + 1}-
                {Math.min(safePage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} items
              </p>
            </div>
          )}
        </>
      )}

      {/* Bottom CTA */}
      <div className="mt-14 flex flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-card to-gold/10 p-8 sm:flex-row sm:p-10">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15">
            <Compass className="size-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight">Ready to rent?</h3>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              Pick your dates, book the gear, and get back to doing what you love.
            </p>
          </div>
        </div>
        <Button asChild size="lg" className="gap-2 rounded-xl shadow-lg shadow-primary/20">
          <Link href="/how-it-works">
            <Timer className="size-4" />
            See how it works
            <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
