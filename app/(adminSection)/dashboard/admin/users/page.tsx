import type { Metadata } from "next"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { fetchAllUsers } from "../../../_actions/users"
import { AdminUsersClient } from "../../../_components/admin-users-client"
import type { User } from "@/lib/types"

export const revalidate = 60

export const metadata: Metadata = {
  title: "User Management",
  description: "View, search, and manage all registered users on GearUp.",
}

export default async function AdminUsersPage() {
  const res = await fetchAllUsers({ next: { revalidate: 60 } })
  const users = res.success ? (res.data as User[]) : []

  return (
    <DashboardLayout role="ADMIN">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View and manage all registered users
          </p>
        </div>
        <AdminUsersClient users={users} />
      </div>
    </DashboardLayout>
  )
}
