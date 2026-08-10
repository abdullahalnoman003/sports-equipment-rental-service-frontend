import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { RentalStatus } from "@/lib/types"

const TIMELINE_STEPS: RentalStatus[] = [
  "PLACED",
  "CONFIRMED",
  "PAID",
  "PICKED_UP",
  "RETURNED",
]

const CANCELED_STEP: RentalStatus = "CANCELED"

interface OrderTimelineProps {
  currentStatus: RentalStatus
}

export function OrderTimeline({ currentStatus }: OrderTimelineProps) {
  if (currentStatus === CANCELED_STEP) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Rental Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs font-bold">
              ✕
            </div>
            <span className="text-sm font-medium text-destructive">
              Canceled
            </span>
          </div>
        </CardContent>
      </Card>
    )
  }

  const currentIndex = TIMELINE_STEPS.indexOf(currentStatus)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rental Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {TIMELINE_STEPS.map((step, i) => {
            const done = i <= currentIndex
            const current = i === currentIndex

            return (
              <div key={step}>
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-8 items-center justify-center rounded-full text-xs font-bold ${
                      done
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    } ${current ? "ring-2 ring-primary ring-offset-2" : ""}`}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={`text-sm ${
                      done ? "font-medium" : "text-muted-foreground"
                    }`}
                  >
                    {step.replace("_", " ")}
                  </span>
                </div>
                {i < TIMELINE_STEPS.length - 1 && (
                  <Separator
                    className={`ml-4 my-1 h-6 ${
                      i < currentIndex ? "bg-primary" : ""
                    }`}
                    orientation="vertical"
                  />
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
