"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { GearTable } from "./gear-table"
import { removeGearById } from "../_actions/gear"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import toast from "react-hot-toast"
import type { Gear } from "@/lib/types"

interface ProviderGearClientProps {
  gear: Gear[]
}

export function ProviderGearClient({ gear }: ProviderGearClientProps) {
  const router = useRouter()
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  const handleEdit = (id: string) => {
    router.push(`/dashboard/provider/gear/${id}`)
  }

  const handleDelete = async (id: string) => {
    const res = await removeGearById(id)
    if (res.success) {
      toast.success("Gear deleted!")
      router.refresh()
    } else {
      toast.error(res.message || "Failed to delete gear")
    }
  }

  return (
    <>
      <GearTable gear={gear} onEdit={handleEdit} onDelete={(id) => setDeleteTarget(id)} />

      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <Trash2 />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete this gear?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the gear from your inventory. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                if (deleteTarget) handleDelete(deleteTarget)
                setDeleteTarget(null)
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
