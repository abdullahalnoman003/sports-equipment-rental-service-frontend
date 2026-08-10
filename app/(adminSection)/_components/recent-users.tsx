import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { User } from "@/lib/types"

const ROLE_COLORS: Record<string, string> = {
  CUSTOMER: "bg-blue-100 text-blue-700",
  PROVIDER: "bg-green-100 text-green-700",
  ADMIN: "bg-purple-100 text-purple-700",
}

interface RecentUsersProps {
  users: User[]
  viewAllHref?: string
}

export function RecentUsers({ users, viewAllHref = "/dashboard/admin/users" }: RecentUsersProps) {
  return (
    <Card>
      <CardHeader className="border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <CardTitle>Recent Users</CardTitle>
          <Link href={viewAllHref} className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {user.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <Badge className={`${ROLE_COLORS[user.role]} border-none text-[10px]`}>
                  {user.role}
                </Badge>
                <p className={`text-xs font-medium ${user.status === "ACTIVE" ? "text-green-600" : "text-red-600"}`}>
                  {user.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
