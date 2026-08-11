"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Package, ChevronLeft, ChevronRight } from "lucide-react"
import { GearFilters } from "./gear-filters"
import { GearCard } from "./gear-card"
import { Button } from "@/components/ui/button"
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
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Browse Gear</h1>
        <p className="mt-1 text-muted-foreground">
          Find sports and outdoor equipment from trusted local providers
        </p>
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
    </div>
  )
}
