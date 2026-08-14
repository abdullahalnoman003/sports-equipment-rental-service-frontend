"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { EditGearForm } from "../../../../_components/edit-gear-form"
import { fetchGearById } from "@/app/(publicSection)/_actions/gear"
import { friendlyError } from "@/lib/messages"
import toast from "react-hot-toast"
import type { Gear } from "@/lib/types"

export default function EditGearPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [gear, setGear] = useState<Gear | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGear() {
      try {
        const res = await fetchGearById(id)
        if (res.success) {
          setGear(res.data as Gear)
        } else {
          toast.error(friendlyError(res.message, "Please login to view this gear"))
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
  }, [id, router])

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
            <EditGearForm
              gear={gear}
              onSuccess={() => router.push("/dashboard/provider/gear")}
              onCancel={() => router.push("/dashboard/provider/gear")}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
