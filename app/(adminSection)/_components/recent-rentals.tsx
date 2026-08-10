import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Rental } from "@/lib/types"

const STATUS_COLORS: Record<string, string> = {
  PLACED: "bg-yellow-100 text-yellow-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  PAID: "bg-purple-100 text-purple-700",
  PICKED_UP: "bg-green-100 text-green-700",
  RETURNED: "bg-gray-100 text-gray-600",
  CANCELED: "bg-red-100 text-red-700",
}

interface RecentRentalsProps {
  rentals: Rental[]
  viewAllHref?: string
}

export function RecentRentals({ rentals, viewAllHref = "/dashboard/admin/rentals" }: RecentRentalsProps) {
  return (
    <Card>
      <CardHeader className="border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <CardTitle>Recent Rentals</CardTitle>
          <Link href={viewAllHref} className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {rentals.map((rental) => (
            <div key={rental.id} className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{rental.gear.name}</p>
                <p className="text-xs text-muted-foreground">
                  {rental.user.name} &middot; {new Date(rental.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <Badge className={`${STATUS_COLORS[rental.status]} border-none text-[10px]`}>
                  {rental.status.replace("_", " ")}
                </Badge>
                <p className="text-sm font-semibold">${rental.total_price}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
