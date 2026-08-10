"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { GearTable } from "../../../_components/gear-table"
import { fetchAllGear } from "../../../_actions/gear"
import toast from "react-hot-toast"
import type { Gear } from "@/lib/types"

export default function AdminGearPage() {
  const [gear, setGear] = useState<Gear[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchGear() {
      try {
        const res = await fetchAllGear()
        if (res.success) {
          setGear(res.data as Gear[])
        } else {
          setError(res.message || "Failed to fetch gear")
          toast.error(res.message || "Failed to fetch gear")
        }
      } catch {
        setError("Failed to fetch gear")
        toast.error("Failed to fetch gear")
      } finally {
        setLoading(false)
      }
    }
    fetchGear()
  }, [])

  return (
    <DashboardLayout role="ADMIN">
      {loading ? (
        <div className="space-y-6">
          <div className="h-8 w-40 animate-pulse rounded bg-muted" />
          <div className="h-10 w-64 animate-pulse rounded-md bg-muted" />
          <div className="h-96 animate-pulse rounded-xl border border-border bg-card" />
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">All Gear Listings</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Browse all gear across the platform
            </p>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <GearTable gear={gear} />
        </div>
      )}
    </DashboardLayout>
  )
}
