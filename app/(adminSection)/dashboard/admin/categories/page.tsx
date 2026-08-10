"use client"

import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { CategoriesTable } from "../../../_components/categories-table"

export default function AdminCategoriesPage() {
  return (
    <DashboardLayout role="ADMIN">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Category Management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create, edit, and delete gear categories
          </p>
        </div>
        <CategoriesTable />
      </div>
    </DashboardLayout>
  )
}
