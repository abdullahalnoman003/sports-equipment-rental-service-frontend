import Link from "next/link"
import Image from "next/image"
import { Flame, ArrowRight, TrendingUp } from "lucide-react"
import { SectionHeading } from "@/components/shared/page-hero"
import { Section } from "@/components/shared/section"
import { Badge } from "@/components/ui/badge"
import { fetchTrendingGear } from "@/app/(publicSection)/_actions/stats"
import { brandText } from "@/lib/brand"
import { colsClass, fillGrid } from "@/lib/grid"
import type { Gear } from "@/lib/types"

export const revalidate = 300

export async function TrendingGear() {
  const { items: gear, cols } = fillGrid(await fetchTrendingGear(4), 4)

  if (gear.length === 0) return null

  return (
    <Section id="trending" tone="plain">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 size-96 rounded-full bg-gold/10 blur-3xl" />
      </div>

      <SectionHeading
          eyebrow="Trending Now"
          title={
            <>
              What everyone is{" "}
              <span className="text-gradient-brand">booking this week</span>
            </>
          }
          description="Ranked automatically from listing activity, availability and price band so you can see what is moving right now."
        />

        <div className={`grid gap-5 ${colsClass(cols)}`}>
          {gear.map((item, i) => (
            <TrendingCard key={item.id} gear={item} rank={i + 1} />
          ))}
        </div>

        <p className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="size-4 text-primary" />
          Rankings refresh automatically as new listings and bookings come in.
          <Link
            href="/gear"
            className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
          >
            Browse everything
            <ArrowRight className="size-3.5" />
          </Link>
        </p>
    </Section>
  )
}

function TrendingCard({ gear, rank }: { gear: Gear; rank: number }) {
  const hasImage = Boolean(gear.image?.startsWith("http"))

  return (
    <Link
      href={`/gear/${gear.id}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 animate-fade-up"
      style={{ animationDelay: `${rank * 80}ms` }}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/50">
        {hasImage ? (
          <Image
            src={gear.image!}
            alt={gear.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
            No image available
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Rank badge */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-sm">
          <Flame className={`size-3.5 ${brandText(rank - 1)}`} />
          <span className="text-xs font-bold text-black">#{rank}</span>
        </div>

        <div className="absolute bottom-3 left-3">
          <Badge className="border-none bg-black/50 text-white shadow-sm backdrop-blur-sm">
            {gear.category_Name}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 font-semibold transition-colors group-hover:text-primary">
          {gear.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{gear.brand}</p>

        <div className="mt-4 flex items-end justify-between border-t border-border/70 pt-4">
          <div>
            <p className="text-xl font-bold leading-none text-primary">৳{gear.price}</p>
            <p className="mt-1 text-xs text-muted-foreground">per day</p>
          </div>
          <span className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-primary">
            View Details
          </span>
        </div>
      </div>
    </Link>
  )
}