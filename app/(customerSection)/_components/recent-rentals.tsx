import Link from "next/link"
import { Package, ArrowUpRight } from "lucide-react"
import { StatusBadge } from "@/components/shared/status-badge"
import type { RentalStatus } from "@/lib/types"

interface Rental {
  id: string
  gear: string
  status: RentalStatus
  dates: string
  total: number
}

interface RecentRentalsProps {
  rentals: Rental[]
}

export function RecentRentals({ rentals }: RecentRentalsProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card transition-colors hover:border-primary/25">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
            <Package className="size-4 text-primary" />
          </span>
          <h2 className="text-lg font-bold tracking-tight">Recent Rentals</h2>
        </div>
        <Link
          href="/dashboard/customer/orders"
          className="group inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          View all
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="divide-y divide-border/70">
        {rentals.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-muted">
              <Package className="size-5 text-muted-foreground/60" />
            </span>
            <p className="mt-3 text-sm text-muted-foreground">No rentals yet. Start exploring!</p>
            <Link href="/gear" className="mt-2 inline-block text-sm font-medium text-primary hover:underline">
              Browse gear
            </Link>
          </div>
        ) : (
          rentals.map((rental) => (
            <div
              key={rental.id}
              className="flex items-center justify-between gap-3 px-6 py-4 transition-colors hover:bg-muted/30"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Package className="size-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{rental.gear}</p>
                  <p className="text-xs text-muted-foreground">{rental.dates}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <StatusBadge status={rental.status} />
                <span className="text-sm font-bold">৳{rental.total}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
