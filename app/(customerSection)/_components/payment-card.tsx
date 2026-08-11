"use client"

import { useState } from "react"
import { Package, CreditCard, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface PaymentCardProps {
  gearName: string
  gearBrand: string
  startDate: string
  endDate: string
  pricePerDay: number
  total: number
  showPayButton?: boolean
  onPay?: () => void
}

export function PaymentCard({
  gearName,
  gearBrand,
  startDate,
  endDate,
  pricePerDay,
  total,
  showPayButton = false,
  onPay,
}: PaymentCardProps) {
  const [paying, setPaying] = useState(false)

  const days = Math.ceil(
    (new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000
  )

  const handlePay = () => {
    setPaying(true)
    onPay?.()
    setTimeout(() => setPaying(false), 1000)
  }

  return (
    <Card className="shadow-sm">
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
              <Package className="size-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold">{gearName}</p>
              <p className="text-xs text-muted-foreground">{gearBrand}</p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="size-4" />
              {startDate} to {endDate}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CreditCard className="size-4" />
              {days} days x ${pricePerDay}/day
            </div>
          </div>

          <Separator />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-primary">৳{total}</span>
          </div>

          {showPayButton && (
            <Button
              className="w-full"
              size="lg"
              onClick={handlePay}
              disabled={paying}
            >
              <CreditCard className="size-4" />
              {paying ? "Processing..." : "Pay Now"}
            </Button>
          )}

          <p className="text-center text-xs text-muted-foreground">
            Secure payment via Stripe
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
