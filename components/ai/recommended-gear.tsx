import Link from "next/link"
import Image from "next/image"
import { Sparkles, ArrowRight, ArrowUpRight } from "lucide-react"
import { SectionHeading } from "@/components/shared/page-hero"
import { Section } from "@/components/shared/section"
import { Badge } from "@/components/ui/badge"
import { recommendGear } from "@/app/(publicSection)/_actions/ai"
import { fetchAllGear } from "@/app/(publicSection)/_actions/gear"
import { colsClass, fillGrid } from "@/lib/grid"
import type { Gear } from "@/lib/types"

/**
 * Personalised gear recommendations.
 *
 * Signed in, the ranking leans on the categories and gear the customer has
 * actually rented. Signed out there is no history to work from, so it falls back
 * to availability weighted ranking and says so plainly rather than pretending to
 * know the visitor.
 *
 * Returns null rather than an empty shell when there is nothing to show.
 */

interface Resolved {
  gear: Gear[]
  cols: number
  reasons: Map<string, string>
  personalised: boolean
}

async function resolveRecommendations(): Promise<Resolved | null> {
  // `powered` and `provider` are still returned by the action but deliberately not
  // surfaced. Which vendor served a ranking is an implementation detail, and
  // naming it made this section read as a demo rather than a GearUp feature.
  const [rec, gearRes] = await Promise.all([
    recommendGear(),
    fetchAllGear("", { next: { revalidate: 300 } }),
  ])
  const { items, personalised } = rec

  if (!gearRes.success || items.length === 0) return null

  const byId = new Map(((gearRes.data as Gear[]) ?? []).map((g) => [g.id, g]))
  const picked = items
    .map((r) => ({ rec: r, gear: byId.get(r.gearId) }))
    .filter((p): p is { rec: (typeof items)[number]; gear: Gear } => Boolean(p.gear))

  if (picked.length === 0) return null

  const { items: gear, cols } = fillGrid(
    picked.map((p) => p.gear),
    4
  )

  return {
    gear,
    cols,
    reasons: new Map(picked.map((p) => [p.gear.id, p.rec.reason])),
    personalised,
  }
}

/**
 * One-line note on how these picks were chosen.
 *
 * Describes the inputs rather than the machinery, and stays true either way: the
 * deterministic fallback also ranks by rental history and stock, so no branch
 * here needs to claim a model was involved.
 */
function RankingNote({ personalised }: { personalised: boolean }) {
  return (
    <p className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
      <Sparkles className="size-4 text-primary" />
      {personalised
        ? "Matched to the categories you have rented, and to what is in stock."
        : "Popular picks from the GearUp catalog right now."}
      <Link
        href="/gear"
        className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
      >
        Browse everything
        <ArrowRight className="size-3.5" />
      </Link>
    </p>
  )
}

/** Landing page variant. */
export async function RecommendedGear() {
  const data = await resolveRecommendations()
  if (!data) return null

  return (
    <Section id="recommended" tone="muted">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 size-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <SectionHeading
        eyebrow={data.personalised ? "Picked For You" : "Suggested Picks"}
        title={
          <>
            {data.personalised ? "Based on what you have" : "Gear worth a look"}{" "}
            <span className="text-gradient-brand">
              {data.personalised ? "rented before" : "right now"}
            </span>
          </>
        }
        description={
          data.personalised
            ? "Ranked from your own rental history, then checked against what is in stock right now."
            : "Sign in and these picks adapt to the categories you have rented before."
        }
      />

      <div className={`grid gap-5 ${colsClass(data.cols)}`}>
        {data.gear.map((item, i) => (
          <RecommendedCard
            key={item.id}
            gear={item}
            reason={data.reasons.get(item.id) ?? "Recommended for you"}
            index={i}
          />
        ))}
      </div>

      <RankingNote personalised={data.personalised} />
    </Section>
  )
}

/** Dashboard variant, sized for a panel rather than a full-bleed section. */
export async function RecommendedGearPanel() {
  const data = await resolveRecommendations()
  if (!data) return null

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card">
      <div className="flex items-center justify-between gap-3 border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
            <Sparkles className="size-4 text-primary" />
          </span>
          <div>
            <h2 className="text-lg font-bold tracking-tight">Recommended For You</h2>
            <p className="text-xs text-muted-foreground">
              {data.personalised
                ? "Based on the categories you have rented"
                : "Popular with GearUp renters"}
            </p>
          </div>
        </div>
        <Link
          href="/gear"
          className="group inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          Browse all
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className={`grid gap-4 p-5 sm:grid-cols-2 ${data.cols > 2 ? "lg:grid-cols-4" : ""}`}>
        {data.gear.slice(0, 4).map((item, i) => (
          <RecommendedCard
            key={item.id}
            gear={item}
            reason={data.reasons.get(item.id) ?? "Recommended for you"}
            index={i}
          />
        ))}
      </div>
    </div>
  )
}

function RecommendedCard({
  gear,
  reason,
  index,
}: {
  gear: Gear
  reason: string
  index: number
}) {
  const hasImage = Boolean(gear.image?.startsWith("http"))

  return (
    <Link
      href={`/gear/${gear.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
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

        <div className="absolute bottom-3 left-3">
          <Badge className="border-none bg-black/50 text-white shadow-sm backdrop-blur-sm">
            {gear.category_Name}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-1 text-sm font-semibold transition-colors group-hover:text-primary">
          {gear.name}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">{gear.brand}</p>

        <p className="mt-2.5 line-clamp-2 flex items-start gap-1.5 text-xs text-muted-foreground">
          <Sparkles className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
          <span>{reason}</span>
        </p>

        <div className="mt-auto flex items-end justify-between border-t border-border/70 pt-3">
          <div>
            <p className="text-lg font-bold leading-none text-primary">৳{gear.price}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">per day</p>
          </div>
          <span className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
            View Details
          </span>
        </div>
      </div>
    </Link>
  )
}