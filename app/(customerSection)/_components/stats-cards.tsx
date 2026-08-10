import { Card, CardContent } from "@/components/ui/card"
import { type LucideIcon } from "lucide-react"

interface Stat {
  label: string
  value: string
  icon: LucideIcon
  color: string
}

interface StatsCardsProps {
  stats: Stat[]
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className={`flex size-10 items-center justify-center rounded-lg ${stat.color}`}>
                <stat.icon className="size-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
