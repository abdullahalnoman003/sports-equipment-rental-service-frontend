import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { GearCard } from "@/app/(publicSection)/_components/gear/gear-card"
import { SectionHeading } from "@/components/shared/page-hero"
import { Section } from "@/components/shared/section"
import { Button } from "@/components/ui/button"
import { fetchFeaturedGear } from "@/app/(publicSection)/_actions/stats"
import { colsClass, fillGrid } from "@/lib/grid"

export const revalidate = 300

export async function FeaturedGear() {
  // 12 divides evenly by 2, 3 and 4 -> every row is full at every breakpoint.
  const { items: gear, cols } = fillGrid(await fetchFeaturedGear(12), 4)

  if (gear.length === 0) return null

  return (
    <Section id="featured" tone="plain">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-1/3 size-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <SectionHeading
          eyebrow="Featured Gear"
          title={
            <>
              Premium gear,{" "}
              <span className="text-gradient-brand">ready to book</span>
            </>
          }
          description="The highest-rated in-stock listings from providers near you. Every one is available for day-by-day rental."
        />

        <div className={`grid gap-5 ${colsClass(cols)}`}>
          {gear.map((item) => (
            <GearCard key={item.id} gear={item} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button asChild size="lg" variant="outline" className="group gap-2 rounded-full px-8">
            <Link href="/gear">
              View all gear
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
    </Section>
  )
}