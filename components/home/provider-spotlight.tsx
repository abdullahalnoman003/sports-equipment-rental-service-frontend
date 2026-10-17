import Link from "next/link"
import { Package, Boxes, Store, ArrowRight, BadgeCheck } from "lucide-react"
import { SectionHeading } from "@/components/shared/page-hero"
import { Section } from "@/components/shared/section"
import { Button } from "@/components/ui/button"
import { fetchProviderSpotlight } from "@/app/(publicSection)/_actions/stats"
import { brandTint } from "@/lib/brand"
import { colsClass, fillGrid } from "@/lib/grid"

export const revalidate = 300

export async function ProviderSpotlight() {
  const providers = await fetchProviderSpotlight(4)

  // Only 2 providers exist in the catalog today — shrink the grid so the row
  // is still completely filled instead of leaving empty cells.
  const { items: visible, cols } = fillGrid(providers, 4)

  if (visible.length === 0) return null

  return (
    <Section id="providers" tone="muted">
      <SectionHeading
          eyebrow="Provider Spotlight"
          title={
            <>
              The owners behind{" "}
              <span className="text-gradient-brand">the gear</span>
            </>
          }
          description="Real providers from live listings on GearUp, ranked by how much equipment they have available for rent."
        />

        <div className={`grid gap-5 ${colsClass(cols)}`}>
          {visible.map((provider, i) => (
            <article
              key={provider.id}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`flex size-14 shrink-0 items-center justify-center rounded-2xl text-xl font-bold uppercase transition-transform duration-300 group-hover:scale-105 ${brandTint(i)}`}
                >
                  {provider.name.charAt(0)}
                </span>
                <div className="min-w-0">
                  <h3 className="truncate font-bold capitalize">{provider.name}</h3>
                  <p className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-primary">
                    <BadgeCheck className="size-3" />
                    Verified provider
                  </p>
                </div>
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-muted/50 p-3 text-center">
                  <Package className="mx-auto size-4 text-primary" />
                  <dd className="mt-1.5 text-lg font-bold leading-none">{provider.gearCount}</dd>
                  <dt className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                    Listings
                  </dt>
                </div>
                <div className="rounded-2xl bg-muted/50 p-3 text-center">
                  <Boxes className="mx-auto size-4 text-primary" />
                  <dd className="mt-1.5 text-lg font-bold leading-none">{provider.units}</dd>
                  <dt className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                    In stock
                  </dt>
                </div>
              </dl>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {provider.categories.slice(0, 3).map((category) => (
                  <li
                    key={category}
                    className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary"
                  >
                    {category}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
                <p className="text-sm text-muted-foreground">
                  {provider.fromPrice !== null ? (
                    <>
                      from{" "}
                      <span className="font-bold text-foreground">
                        ৳{provider.fromPrice.toLocaleString()}
                      </span>
                      /day
                    </>
                  ) : (
                    "Price on request"
                  )}
                </p>
                <Link
                  href="/gear"
                  aria-label={`Browse gear from ${provider.name}`}
                  className="flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button asChild size="lg" variant="outline" className="group gap-2 rounded-full px-8">
            <Link href="/register">
              <Store className="size-4" />
              List your gear too
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
    </Section>
  )
}