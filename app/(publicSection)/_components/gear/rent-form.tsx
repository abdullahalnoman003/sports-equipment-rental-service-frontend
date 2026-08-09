"use client"

import { useState, useMemo } from "react"
import { Calendar, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createRental } from "../../_actions/gear"
import toast from "react-hot-toast"
import type { Gear } from "@/lib/types"

export interface RentFormProps {
  gear: Gear
}

export function RentForm({ gear }: RentFormProps) {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [renting, setRenting] = useState(false)

  const today = useMemo(() => new Date().toISOString().split("T")[0], [])

  const dateError = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      if (end < start) return "End date cannot be before start date"
      if (start < new Date(today)) return "Start date cannot be in the past"
    }
    return ""
  }, [startDate, endDate, today])

  const days =
    startDate && endDate && !dateError
      ? Math.max(
          1,
          Math.ceil(
            (new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000
          )
        )
      : 0
  const total = days * gear.price

  const handleRent = async () => {
    if (!startDate || !endDate || dateError) return
    setRenting(true)

    try {
      const res = await createRental({
        gear_id: gear.id,
        start_date: startDate,
        end_date: endDate,
      })

      if (res.success) {
        toast.success(`Rental created! ${gear.name} from ${startDate} to ${endDate}`)
        setStartDate("")
        setEndDate("")
      } else {
        toast.error(res.message || "Failed to create rental")
      }
    } catch {
      toast.error("Failed to create rental")
    } finally {
      setRenting(false)
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-4">
        <span className="text-3xl font-bold text-primary">${gear.price}</span>
        <span className="text-muted-foreground"> / day</span>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="start-date">Start Date</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="start-date"
              type="date"
              value={startDate}
              min={today}
              onChange={(e) => setStartDate(e.target.value)}
              className={`pl-9 ${dateError && startDate ? "border-destructive" : ""}`}
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="end-date">End Date</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="end-date"
              type="date"
              value={endDate}
              min={startDate || today}
              onChange={(e) => setEndDate(e.target.value)}
              className={`pl-9 ${dateError && endDate ? "border-destructive" : ""}`}
            />
          </div>
        </div>
      </div>

      {dateError && (
        <p className="mt-2 text-xs text-destructive">{dateError}</p>
      )}

      {days > 0 && !dateError && (
        <div className="mt-4 space-y-2 border-t border-border pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              ${gear.price} x {days} day{days > 1 ? "s" : ""}
            </span>
            <span className="font-medium">${total}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-2 text-sm font-semibold">
            <span>Total</span>
            <span className="text-primary">${total}</span>
          </div>
        </div>
      )}

      <Button
        className="mt-4 w-full"
        size="lg"
        disabled={!startDate || !endDate || !!dateError || renting}
        onClick={handleRent}
      >
        <ShoppingCart className="size-4" />
        {renting ? "Creating rental..." : "Rent Now"}
      </Button>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Payment processed via Stripe after provider confirms
      </p>
    </div>
  )
}
