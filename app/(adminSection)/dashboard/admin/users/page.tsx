"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { UsersTable } from "../../../_components/users-table"
import { fetchAllUsers, setUserStatus } from "../../../_actions/users"
import toast from "react-hot-toast"
import type { User } from "@/lib/types"

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetchAllUsers()
        if (res.success) {
          setUsers(res.data as User[])
        } else {
          setError(res.message || "Failed to fetch users")
          toast.error(res.message || "Failed to fetch users")
        }
      } catch {
        setError("Failed to fetch users")
        toast.error("Failed to fetch users")
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handleToggleStatus = async (userId: string, newStatus: string) => {
    const res = await setUserStatus(userId, newStatus)
    if (res.success) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, status: newStatus as User["status"] } : u))
      )
      toast.success("User status updated!")
    } else {
      toast.error(res.message || "Failed to update user")
    }
  }

  return (
    <DashboardLayout role="ADMIN">
      {loading ? (
        <div className="space-y-6">
          <div className="h-8 w-44 animate-pulse rounded bg-muted" />
          <div className="h-10 w-64 animate-pulse rounded-md bg-muted" />
          <div className="h-96 animate-pulse rounded-xl border border-border bg-card" />
          <div className="flex items-center justify-between">
            <div className="h-4 w-32 animate-pulse rounded bg-muted" />
            <div className="h-8 w-40 animate-pulse rounded bg-muted" />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              View and manage all registered users
            </p>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <UsersTable users={users} onToggleStatus={handleToggleStatus} />
        </div>
      )}
    </DashboardLayout>
  )
}
