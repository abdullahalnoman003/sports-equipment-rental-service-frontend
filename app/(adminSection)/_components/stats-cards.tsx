import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatItem {
  label: string
  value: string
  icon: LucideIcon
  color: string
  change: string
}

interface StatsCardsProps {
  stats: StatItem[]
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
        >
          <div className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/10" />
          <div className="relative flex items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <span
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110",
                  stat.color
                )}
              >
                <stat.icon className="size-6" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-2xl font-bold tracking-tight">{stat.value}</p>
                <p className="truncate text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
            {stat.change && (
              <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                {stat.change}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
