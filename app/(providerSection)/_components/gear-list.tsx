import { Package } from "lucide-react"
import Link from "next/link"
import type { Gear } from "@/lib/types"

interface GearListProps {
  gear: Gear[]
}

export function GearList({ gear }: GearListProps) {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <h2 className="text-lg font-semibold">My Gear</h2>
        <Link href="/dashboard/provider/gear" className="text-sm text-primary hover:underline">
          Manage all
        </Link>
      </div>
      <div className="divide-y divide-border">
        {gear.map((item) => (
          <div key={item.id} className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                <Package className="size-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.brand} &middot; {item.category_Name}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">${item.price}/day</p>
              <p className="text-xs text-muted-foreground">{item.quantity} units</p>
            </div>
          </div>
        ))}
        {gear.length === 0 && (
          <div className="px-6 py-8 text-center text-sm text-muted-foreground">
            No gear listed yet.
          </div>
        )}
      </div>
    </div>
  )
}
