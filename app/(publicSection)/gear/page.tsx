"use client"

import { useEffect, useState } from "react"
import { Package, ChevronLeft, ChevronRight } from "lucide-react"
import { GearFilters } from "../_components/gear/gear-filters"
import { GearCard } from "../_components/gear/gear-card"
import { fetchAllGear, fetchAllCategories } from "../_actions/gear"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import type { Gear, Category } from "@/lib/types"

const ITEMS_PER_PAGE = 9

export default function GearPage() {
  const [gear, setGear] = useState<Gear[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [sortBy, setSortBy] = useState<"name" | "price-low" | "price-high">("name")
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const [gearRes, catRes] = await Promise.all([fetchAllGear(), fetchAllCategories()])
        if (gearRes.success) setGear(gearRes.data as Gear[])
        else {
          setError(gearRes.message || "Failed to load gear")
          toast.error(gearRes.message || "Failed to load gear")
        }
        if (catRes.success) setCategories(["All", ...(catRes.data as Category[]).map((c) => c.name)])
      } catch {
        const msg = "Failed to load gear"
        setError(msg)
        toast.error(msg)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filtered = gear
    .filter((g) => category === "All" || g.category_Name === category)
    .filter((g) => g.name.toLowerCase().includes(search.toLowerCase()) || g.brand.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price
      if (sortBy === "price-high") return b.price - a.price
      return a.name.localeCompare(b.name)
    })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  function handleSearchChange(value: string) {
    setSearch(value)
    setPage(1)
  }

  function handleCategoryChange(value: string) {
    setCategory(value)
    setPage(1)
  }

  function handleSortChange(value: "name" | "price-low" | "price-high") {
    setSortBy(value)
    setPage(1)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Browse Gear</h1>
        <p className="mt-1 text-muted-foreground">
          Find sports and outdoor equipment from trusted local providers
        </p>
      </div>

      {loading ? (
        <>
          {/* Filters skeleton */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="h-10 flex-1 max-w-md animate-pulse rounded-md bg-muted" />
            <div className="h-10 w-[180px] animate-pulse rounded-md bg-muted" />
          </div>
          <div className="mb-6 flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 w-20 animate-pulse rounded-full bg-muted" />
            ))}
          </div>
          <div className="mb-6 h-4 w-24 animate-pulse rounded bg-muted" />
          {/* Grid skeleton */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="aspect-[4/3] w-full animate-pulse bg-muted" />
                <div className="p-4 space-y-3">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Package className="mb-4 size-12 text-muted-foreground/50" />
          <p className="text-lg font-medium">Something went wrong</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      ) : (
        <>
          <GearFilters
            search={search}
            onSearchChange={handleSearchChange}
            category={category}
            onCategoryChange={handleCategoryChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            categories={categories}
            resultCount={filtered.length}
          />

          {paged.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Package className="mb-4 size-12 text-muted-foreground/50" />
              <p className="text-lg font-medium">No gear found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {paged.map((item) => (
                  <GearCard key={item.id} gear={item} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Button
                      key={p}
                      variant={p === page ? "default" : "outline"}
                      size="icon"
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}
