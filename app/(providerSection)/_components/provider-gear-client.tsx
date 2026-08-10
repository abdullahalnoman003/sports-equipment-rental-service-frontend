"use client"

import { useRouter } from "next/navigation"
import { GearTable } from "./gear-table"
import { removeGearById } from "../_actions/gear"
import toast from "react-hot-toast"
import type { Gear } from "@/lib/types"

interface ProviderGearClientProps {
  gear: Gear[]
}

export function ProviderGearClient({ gear }: ProviderGearClientProps) {
  const router = useRouter()

  const handleEdit = (id: string) => {
    router.push(`/dashboard/provider/gear/${id}`)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gear?")) return
    const res = await removeGearById(id)
    if (res.success) {
      toast.success("Gear deleted!")
      router.refresh()
    } else {
      toast.error(res.message || "Failed to delete gear")
    }
  }

  return <GearTable gear={gear} onEdit={handleEdit} onDelete={handleDelete} />
}
