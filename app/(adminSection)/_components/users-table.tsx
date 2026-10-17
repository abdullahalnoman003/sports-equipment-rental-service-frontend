"use client"

import { useMemo, useState } from "react"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/shared/status-badge"
import { useSort } from "@/components/shared/use-table-sort"
import { SortableHead } from "@/components/shared/sortable-head"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { User } from "@/lib/types"

const ITEMS_PER_PAGE = 10

interface UsersTableProps {
  users: User[]
  onToggleStatus?: (userId: string, newStatus: string) => void
}

export function UsersTable({ users, onToggleStatus }: UsersTableProps) {
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("ALL")
  const [page, setPage] = useState(1)

  const filtered = users
    .filter((u) => roleFilter === "ALL" || u.role === roleFilter)
    .filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )

  const accessors = useMemo(
    () => ({
      user: (u: User) => u.name ?? "",
      email: (u: User) => u.email ?? "",
      role: (u: User) => u.role ?? "",
      joined: (u: User) => u.createdAt ?? "",
      status: (u: User) => u.status ?? "",
    }),
    []
  )

  const { sorted, sort, toggleSort } = useSort(filtered, accessors)

  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paged = sorted.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE)

  // Sorting resets to the first page so the user never lands on an empty one.
  const sortProps = {
    activeColumn: sort.column,
    direction: sort.direction,
    onToggle: (column: string) => setPage(toggleSort(column)),
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const handleRoleChange = (value: string) => {
    setRoleFilter(value)
    setPage(1)
  }

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={roleFilter} onValueChange={handleRoleChange}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Roles</SelectItem>
            <SelectItem value="CUSTOMER">Customers</SelectItem>
            <SelectItem value="PROVIDER">Providers</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <Table className="min-w-[600px]">
          <TableHeader>
            <TableRow className="bg-muted/50">
              <SortableHead label="User" column="user" {...sortProps} />
              <SortableHead label="Role" column="role" {...sortProps} />
              <SortableHead label="Joined" column="joined" {...sortProps} />
              <SortableHead label="Status" column="status" {...sortProps} />
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={user.role} withDot={false} />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </TableCell>
                <TableCell>
                  <StatusBadge status={user.status} />
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant={user.status === "ACTIVE" ? "destructive" : "default"}
                    onClick={() => onToggleStatus?.(user.id, user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE")}
                  >
                    {user.status === "ACTIVE" ? "Suspend" : "Activate"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {paged.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No users found.
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(safePage - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {Math.min(safePage * ITEMS_PER_PAGE, sorted.length)} of {sorted.length} users
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={safePage === 1}
              onClick={() => setPage(safePage - 1)}
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {safePage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              disabled={safePage === totalPages}
              onClick={() => setPage(safePage + 1)}
              aria-label="Next page"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
