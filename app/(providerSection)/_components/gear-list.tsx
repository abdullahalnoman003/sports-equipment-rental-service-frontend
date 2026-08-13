import { Package, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import type { Gear } from "@/lib/types"

interface GearListProps {
  gear: Gear[]
}

export function GearList({ gear }: GearListProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card transition-colors hover:border-primary/25">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
            <Package className="size-4 text-primary" />
          </span>
          <h2 className="text-lg font-bold tracking-tight">My Gear</h2>
        </div>
        <Link
          href="/dashboard/provider/gear"
          className="group inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          Manage all
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
      <div className="divide-y divide-border/70">
        {gear.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-muted">
              <Package className="size-5 text-muted-foreground/60" />
            </span>
            <p className="mt-3 text-sm text-muted-foreground">No gear listed yet.</p>
            <Link href="/dashboard/provider/gear/new" className="mt-2 inline-block text-sm font-medium text-primary hover:underline">
              Add your first item
            </Link>
          </div>
        ) : (
          gear.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-3 px-6 py-3.5 transition-colors hover:bg-muted/30">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Package className="size-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{item.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {item.brand} &middot; {item.category_Name}
                  </p>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-bold">৳{item.price}<span className="text-xs font-normal text-muted-foreground">/day</span></p>
                <p className="text-xs text-muted-foreground">{item.quantity} units</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
