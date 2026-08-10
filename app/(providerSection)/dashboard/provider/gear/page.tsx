"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { GearTable } from "../../../_components/gear-table"
import { fetchProviderGear, removeGearById } from "../../../_actions/gear"
import { getMe } from "@/service/getMe"
import toast from "react-hot-toast"
import type { Gear } from "@/lib/types"

export default function ProviderGearPage() {
  const router = useRouter()
  const [gear, setGear] = useState<Gear[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchGear() {
      try {
        const userRes = await getMe()
        const userEmail = userRes.success ? (userRes.data as { email: string }).email : ""

        const res = await fetchProviderGear()
        if (res.success) {
          const allGear = res.data as Gear[]
          setGear(userEmail ? allGear.filter((g) => g.provider_email === userEmail) : allGear)
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

  const handleEdit = (id: string) => {
    router.push(`/dashboard/provider/gear/${id}`)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gear?")) return
    const res = await removeGearById(id)
    if (res.success) {
      setGear((prev) => prev.filter((g) => g.id !== id))
      toast.success("Gear deleted!")
    } else {
      toast.error(res.message || "Failed to delete gear")
    }
  }

  return (
    <DashboardLayout role="PROVIDER">
      {loading ? (
        <div className="space-y-6">
          <div className="h-8 w-32 animate-pulse rounded bg-muted" />
          <div className="h-96 animate-pulse rounded-xl border border-border bg-card" />
        </div>
      ) : (
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
          {error && <p className="text-sm text-destructive">{error}</p>}
          <GearTable gear={gear} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      )}
    </DashboardLayout>
  )
}
