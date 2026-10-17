import { BadgeCheck, Boxes, Store, Tag, Coins, CalendarDays, Package } from "lucide-react"
import { brandTint } from "@/lib/brand"
import type { Gear } from "@/lib/types"

interface GearSpecsProps {
  gear: Gear
}

function formatDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return "Not provided"
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

/**
 * Key information / specifications.
 *
 * Every row is derived from real listing data. Nothing is invented, and rows
 * are omitted entirely when the backend has no value for them.
 */
export function GearSpecs({ gear }: GearSpecsProps) {
  const inStock = gear.quantity > 0

  const rows = [
    { icon: Tag, label: "Brand", value: gear.brand },
    { icon: BadgeCheck, label: "Category", value: gear.category_Name },
    { icon: Coins, label: "Daily rate", value: `৳${gear.price.toLocaleString()} / day` },
    {
      icon: Boxes,
      label: "Available units",
      value: inStock ? `${gear.quantity} in stock` : "Out of stock",
    },
    { icon: Store, label: "Provider", value: gear.provider_email },
    { icon: CalendarDays, label: "Listed on", value: formatDate(gear.createdAt) },
    { icon: Package, label: "Billing", value: "Charged per day, minimum 1 day" },
  ].filter((row) => Boolean(row.value))

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card">
      <div className="flex items-center gap-3 border-b border-border px-6 py-4">
        <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
          <BadgeCheck className="size-4 text-primary" />
        </span>
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Key information
        </h3>
      </div>

      <dl className="divide-y divide-border">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className="flex items-center gap-4 px-6 py-3.5 transition-colors hover:bg-muted/40"
          >
            <span
              className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${brandTint(i)}`}
            >
              <row.icon className="size-4" />
            </span>
            <dt className="w-32 shrink-0 text-sm text-muted-foreground">{row.label}</dt>
            <dd className="min-w-0 flex-1 truncate text-sm font-semibold" title={row.value}>
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}