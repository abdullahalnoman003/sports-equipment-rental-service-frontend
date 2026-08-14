import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { fetchProviderGear } from "../../../_actions/gear"
import { getMe } from "@/service/getMe"
import { ProviderGearClient } from "../../../_components/provider-gear-client"
import type { Gear } from "@/lib/types"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "My Gear",
  description: "Manage your listed gear inventory on the GearUp provider dashboard.",
}

export default async function ProviderGearPage() {
  const userRes = await getMe()
  const userEmail = userRes.success ? (userRes.data as { email: string }).email : ""

  const res = await fetchProviderGear()
  const allGear = res.success ? (res.data as Gear[]) : []
  const gear = userEmail ? allGear.filter((g) => g.provider_email === userEmail) : allGear

  return (
    <DashboardLayout role="PROVIDER">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Gear</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your listed inventory
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/provider/gear/new">+ Add Gear</Link>
          </Button>
        </div>
        <ProviderGearClient gear={gear} />
      </div>
    </DashboardLayout>
  )
}
