import Link from "next/link"
import { Users, ArrowUpRight } from "lucide-react"
import { StatusBadge } from "@/components/shared/status-badge"
import type { User } from "@/lib/types"

interface RecentUsersProps {
  users: User[]
  viewAllHref?: string
}

export function RecentUsers({ users, viewAllHref = "/dashboard/admin/users" }: RecentUsersProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card transition-colors hover:border-primary/25">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
            <Users className="size-4 text-primary" />
          </span>
          <h2 className="text-lg font-bold tracking-tight">Recent Users</h2>
        </div>
        <Link
          href={viewAllHref}
          className="group inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          View all
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
      <div className="divide-y divide-border/70">
        {users.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-muted">
              <Users className="size-5 text-muted-foreground/60" />
            </span>
            <p className="mt-3 text-sm text-muted-foreground">No users yet.</p>
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between gap-3 px-6 py-3.5 transition-colors hover:bg-muted/30"
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-sm font-bold text-primary-foreground shadow-sm">
                  {user.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1.5">
                <StatusBadge status={user.role} withDot={false} className="px-2 py-0.5 text-[10px]" />
                <span className={`text-[10px] font-semibold uppercase tracking-wide ${user.status === "ACTIVE" ? "text-emerald-600" : "text-red-600"}`}>
                  {user.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
