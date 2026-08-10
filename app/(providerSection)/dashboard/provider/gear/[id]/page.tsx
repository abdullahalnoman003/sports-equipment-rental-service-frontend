"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { EditGearForm } from "../../../../_components/edit-gear-form"
import { fetchProviderGear } from "../../../../_actions/gear"
import toast from "react-hot-toast"
import type { Gear } from "@/lib/types"

export default function EditGearPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [gear, setGear] = useState<Gear | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGear() {
      try {
        const res = await fetchProviderGear()
        if (res.success) {
          const allGear = res.data as Gear[]
          const found = allGear.find((g) => g.id === params.id)
          if (found) {
            setGear(found)
          } else {
            toast.error("Gear not found")
            router.push("/dashboard/provider/gear")
          }
        } else {
          toast.error(res.message || "Failed to fetch gear")
          router.push("/dashboard/provider/gear")
        }
      } catch {
        toast.error("Failed to fetch gear")
        router.push("/dashboard/provider/gear")
      } finally {
        setLoading(false)
      }
    }
    fetchGear()
  }, [params.id, router])

  if (loading) {
    return (
      <DashboardLayout role="PROVIDER">
        <div className="space-y-6">
          <div className="h-8 w-32 animate-pulse rounded bg-muted" />
          <div className="h-96 animate-pulse rounded-xl border border-border bg-card" />
        </div>
      </DashboardLayout>
    )
  }

  if (!gear) {
    return (
      <DashboardLayout role="PROVIDER">
        <div className="space-y-6">
          <Link href="/dashboard/provider/gear" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" />
            Back to My Gear
          </Link>
          <p className="text-sm text-destructive">Gear not found</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout role="PROVIDER">
      <div className="space-y-6">
        <Link href="/dashboard/provider/gear" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" />
          Back to My Gear
        </Link>

        <div className="mx-auto max-w-2xl">
          <h1 className="text-2xl font-bold tracking-tight">Edit Gear</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Update your gear listing details
          </p>
          <div className="mt-8">
            <EditGearForm gear={gear} onSuccess={() => router.push("/dashboard/provider/gear")} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
