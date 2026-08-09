"use client"

import { useState } from "react"
import { ChevronDown, type LucideIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

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
        <Input
          type="text"
          placeholder="Search for answers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-12 rounded-xl pl-10"
        />
      </div>

      <section className="px-4 pb-20">
        <div className="mx-auto max-w-3xl space-y-8">
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground">
              No results found. Try a different search term.
            </p>
          )}
          {filtered.map((cat) => (
            <div key={cat.title}>
              <div className="mb-4 flex items-center gap-2">
                <cat.icon className="size-5 text-primary" />
                <h2 className="text-xl font-bold tracking-tight">{cat.title}</h2>
              </div>
              <div className="space-y-2">
                {cat.articles.map((article, i) => {
                  const key = `${cat.title}-${i}`
                  const isOpen = openIndex === key
                  return (
                    <div key={key} className="rounded-xl border border-border bg-card">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : key)}
                        className="flex w-full items-center justify-between p-4 text-left text-sm font-medium"
                      >
                        {article.q}
                        <ChevronDown
                          className={`size-4 shrink-0 text-muted-foreground transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                          {article.a}
                        </div>
                      )}
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
