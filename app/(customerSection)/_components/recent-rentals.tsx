import Link from "next/link"
import { Package } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { RentalStatus } from "@/lib/types"

const STATUS_BADGE_VARIANT: Record<RentalStatus, "default" | "secondary" | "destructive" | "outline"> = {
  PLACED: "outline",
  CONFIRMED: "secondary",
  PAID: "default",
  PICKED_UP: "default",
  RETURNED: "secondary",
  CANCELED: "destructive",
}

const STATUS_COLORS: Record<string, string> = {
  PLACED: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  PAID: "bg-purple-100 text-purple-700",
  PICKED_UP: "bg-green-100 text-green-700",
  RETURNED: "bg-gray-100 text-gray-600",
  CANCELED: "bg-red-100 text-red-700",
}

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
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Recent Rentals</CardTitle>
        <Link
          href="/dashboard/customer/orders"
          className="text-sm text-primary hover:underline"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {rentals.map((rental) => (
            <div
              key={rental.id}
              className="flex items-center justify-between gap-3 px-4 py-4 sm:px-6"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Package className="size-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{rental.gear}</p>
                  <p className="text-xs text-muted-foreground">
                    {rental.dates}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Badge
                  variant={STATUS_BADGE_VARIANT[rental.status]}
                  className={`${STATUS_COLORS[rental.status]} hidden sm:inline-flex`}
                >
                  {rental.status.replace("_", " ")}
                </Badge>
                <span className="text-sm font-semibold">${rental.total}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
