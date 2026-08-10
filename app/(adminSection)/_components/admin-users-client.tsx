"use client"

import { useRouter } from "next/navigation"
import { UsersTable } from "./users-table"
import { setUserStatus } from "../_actions/users"
import toast from "react-hot-toast"
import type { User } from "@/lib/types"

interface AdminUsersClientProps {
  users: User[]
}

export function AdminUsersClient({ users }: AdminUsersClientProps) {
  const router = useRouter()

  const handleToggleStatus = async (userId: string, newStatus: string) => {
    const res = await setUserStatus(userId, newStatus)
    if (res.success) {
      toast.success("User status updated!")
      router.refresh()
    } else {
      toast.error(res.message || "Failed to update user")
    }
  }

  return <UsersTable users={users} onToggleStatus={handleToggleStatus} />
}
