"use client"

import { useState } from "react"
import { ChevronDown, Search, SearchX, type LucideIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface HelpArticle {
  q: string
  a: string
}

interface HelpCategory {
  icon: LucideIcon
  title: string
  articles: HelpArticle[]
}

export interface HelpAccordionProps {
  categories: HelpCategory[]
}

export function HelpAccordion({ categories }: HelpAccordionProps) {
  const [search, setSearch] = useState("")
  const [openIndex, setOpenIndex] = useState<string | null>(null)

  const filtered = categories
    .map((cat) => ({
      ...cat,
      articles: cat.articles.filter(
        (a) =>
          a.q.toLowerCase().includes(search.toLowerCase()) ||
          a.a.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.articles.length > 0)

  return (
    <>
      <div className="relative mx-auto mt-8 max-w-md">
        <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for answers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-12 rounded-2xl border-border bg-card pl-11 shadow-sm"
          aria-label="Search help articles"
        />
      </div>

      <section className="px-4 pb-20">
        <div className="mx-auto max-w-3xl space-y-10">
          {filtered.length === 0 && (
            <div className="flex flex-col items-center rounded-3xl border border-dashed border-border py-16 text-center">
              <span className="flex size-16 items-center justify-center rounded-2xl bg-primary/10">
                <SearchX className="size-8 text-primary" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">No answers found</h3>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Try a different search term, or reach out to our support team for help.
              </p>
            </div>
          )}

          {filtered.map((cat) => (
            <div key={cat.title}>
              <div className="mb-4 flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/10">
                  <cat.icon className="size-5 text-primary" />
                </span>
                <div>
                  <h2 className="text-lg font-bold tracking-tight">{cat.title}</h2>
                  <p className="text-xs text-muted-foreground">
                    {cat.articles.length} article{cat.articles.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <div className="space-y-2.5">
                {cat.articles.map((article, i) => {
                  const key = `${cat.title}-${i}`
                  const isOpen = openIndex === key
                  return (
                    <div
                      key={key}
                      className={cn(
                        "overflow-hidden rounded-2xl border bg-card transition-all duration-300",
                        isOpen
                          ? "border-primary/40 shadow-lg shadow-primary/10"
                          : "border-border hover:border-primary/25 hover:shadow-md"
                      )}
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : key)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-semibold"
                      >
                        {article.q}
                        <span
                          className={cn(
                            "flex size-7 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                            isOpen
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          <ChevronDown
                            className={cn(
                              "size-4 transition-transform duration-300",
                              isOpen && "rotate-180"
                            )}
                          />
                        </span>
                      </button>
                      <div
                        className={cn(
                          "grid transition-all duration-300",
                          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        )}
                      >
                        <div className="overflow-hidden">
                          <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                            {article.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
