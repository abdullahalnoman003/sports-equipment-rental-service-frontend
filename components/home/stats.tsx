import { Users, Package, Trophy, MapPin } from "lucide-react"

const stats = [
  { value: "10,000+", label: "Active Users", icon: Users },
  { value: "2,500+", label: "Gear Listed", icon: Package },
  { value: "15,000+", label: "Rentals Completed", icon: Trophy },
  { value: "64", label: "Districts Covered", icon: MapPin },
]

export function StatsStrip() {
  return (
    <section className="relative border-y border-border bg-card/50">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group flex flex-col items-center gap-2 px-4 py-4 text-center"
          >
            <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
              <stat.icon className="size-5" />
            </span>
            <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {stat.value}
            </p>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
