"use client"

import { useState } from "react"
import { UsersTable } from "./users-table"
import { setUserStatus } from "../_actions/users"
import toast from "react-hot-toast"
import type { User } from "@/lib/types"

interface AdminUsersClientProps {
  users: User[]
}

export function AdminUsersClient({ users: initialUsers }: AdminUsersClientProps) {
  const [users, setUsers] = useState<User[]>(initialUsers)

  const handleToggleStatus = async (userId: string, newStatus: string) => {
    const original = users
    const updated = users.map((u) => (u.id === userId ? { ...u, status: newStatus as User["status"] } : u))
    setUsers(updated)

    const res = await setUserStatus(userId, newStatus)
    if (res.success) {
      toast.success("User status updated!")
    } else {
      setUsers(original)
      toast.error(res.message || "Failed to update user")
    }
  }

  return <UsersTable users={users} onToggleStatus={handleToggleStatus} />
}
