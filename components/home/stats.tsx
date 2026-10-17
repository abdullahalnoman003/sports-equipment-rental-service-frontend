import { Users, Package, Boxes, BadgeCheck } from "lucide-react"
import { Section } from "@/components/shared/section"
import { fetchPlatformStats } from "@/app/(publicSection)/_actions/stats"

export const revalidate = 300

export async function StatsStrip() {
  const stats = await fetchPlatformStats()

  const items = [
    { value: stats.gearListings, label: "Live Gear Listings", icon: Package },
    { value: stats.providers, label: "Active Providers", icon: Users },
    { value: stats.unitsAvailable, label: "Units Available", icon: Boxes },
    { value: stats.categories, label: "Categories Covered", icon: BadgeCheck },
  ]

  const hasData = items.some((item) => item.value > 0)

  return (
    <Section tone="card" space="tight">
      <div className="grid grid-cols-2 gap-px lg:grid-cols-4">
        {items.map((stat) => (
          <div
            key={stat.label}
            className="group flex flex-col items-center gap-1.5 px-4 py-2 text-center"
          >
            <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
              <stat.icon className="size-5" />
            </span>
            <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {hasData && stat.value > 0 ? stat.value.toLocaleString() : "0"}
            </p>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}