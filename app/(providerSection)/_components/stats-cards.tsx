import type { LucideIcon } from "lucide-react"

interface StatItem {
  label: string
  value: string
  icon: LucideIcon
  color: string
}

interface StatsCardsProps {
  stats: StatItem[]
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <div className={`flex size-10 items-center justify-center rounded-lg ${stat.color}`}>
              <stat.icon className="size-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
