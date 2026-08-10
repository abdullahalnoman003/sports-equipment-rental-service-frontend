"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { AddGearForm } from "../../../../_components/add-gear-form"

export default function AddGearPage() {
  const router = useRouter()

  return (
    <DashboardLayout role="PROVIDER">
      <div className="space-y-6">
        <Link href="/dashboard/provider" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </Link>

        <div className="mx-auto max-w-2xl">
          <h1 className="text-2xl font-bold tracking-tight">Add New Gear</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            List a new item in your inventory for customers to rent
          </p>
          <div className="mt-8">
            <AddGearForm onSuccess={() => router.push("/dashboard/provider/gear")} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
