import { Card, CardContent } from "@/components/ui/card"

interface RentalTotals {
  all: number
  active: number
  completed: number
  revenue: number
}

interface RentalsStatsProps {
  totals: RentalTotals
}

export function RentalsStats({ totals }: RentalsStatsProps) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      <Card className="p-3">
        <CardContent className="text-center">
          <p className="text-2xl font-bold">{totals.all}</p>
          <p className="text-xs text-muted-foreground">Total Rentals</p>
        </CardContent>
      </Card>
      <Card className="p-3">
        <CardContent className="text-center">
          <p className="text-2xl font-bold text-blue-600">{totals.active}</p>
          <p className="text-xs text-muted-foreground">Active</p>
        </CardContent>
      </Card>
      <Card className="p-3">
        <CardContent className="text-center">
          <p className="text-2xl font-bold text-green-600">{totals.completed}</p>
          <p className="text-xs text-muted-foreground">Completed</p>
        </CardContent>
      </Card>
      <Card className="p-3">
        <CardContent className="text-center">
          <p className="text-2xl font-bold text-primary">৳{totals.revenue.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Total Revenue</p>
        </CardContent>
      </Card>
    </div>
  )
}
