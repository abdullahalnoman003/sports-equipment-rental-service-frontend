import type { Metadata } from "next"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { GearTable } from "../../../_components/gear-table"
import { fetchAllGear } from "../../../_actions/gear"
import type { Gear } from "@/lib/types"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "All Gear Listings",
  description: "Browse and moderate all gear listings across the GearUp platform.",
}

export default async function AdminGearPage() {
  const res = await fetchAllGear()
  const gear = res.success ? (res.data as Gear[]) : []

  return (
    <DashboardLayout role="ADMIN">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">All Gear Listings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse all gear across the platform
          </p>
        </div>
        <GearTable gear={gear} />
      </div>
    </DashboardLayout>
  )
}
