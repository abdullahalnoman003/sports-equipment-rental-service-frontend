import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { GearCard } from "./gear-card"
import { Section } from "@/components/shared/section"
import { Button } from "@/components/ui/button"
import { colsClass, fillGrid } from "@/lib/grid"
import type { Gear } from "@/lib/types"

interface RelatedGearProps {
  items: Gear[]
  categoryName: string
}

/** Similar gear, ranked by category then brand. Renders nothing when empty. */
export function RelatedGear({ items, categoryName }: RelatedGearProps) {
  // Trim so the final row is always full.
  const { items: gear, cols } = fillGrid(items, 4)

  if (gear.length === 0) return null

  return (
    <Section id="related" tone="plain">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
              <Sparkles className="size-3.5" />
              You may also like
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              More gear in{" "}
              <span className="text-gradient-brand">{categoryName}</span>
            </h2>
          </div>

          <Button asChild variant="outline" className="group w-fit gap-2 rounded-full">
            <Link href={`/gear?category=${encodeURIComponent(categoryName)}`}>
              Browse all
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className={`grid gap-5 ${colsClass(cols)}`}>
          {gear.map((item) => (
            <GearCard key={item.id} gear={item} />
          ))}
        </div>
      </div>
    </Section>
  )
}