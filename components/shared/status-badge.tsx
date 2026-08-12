import { cn } from "@/lib/utils"

export const STATUS_STYLES: Record<string, string> = {
  PLACED: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  CONFIRMED: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
  PAID: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  PICKED_UP: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  RETURNED: "bg-slate-200 text-slate-700 dark:bg-slate-500/20 dark:text-slate-300",
  CANCELED: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300",
  PENDING: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  SUCCESS: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  FAILED: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300",
  REFUNDED: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  ACTIVE: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  INACTIVE: "bg-slate-200 text-slate-700 dark:bg-slate-500/20 dark:text-slate-300",
  SUSPENDED: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300",
  CUSTOMER: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
  PROVIDER: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  ADMIN: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
}

export const STATUS_DOTS: Record<string, string> = {
  PLACED: "bg-amber-500",
  CONFIRMED: "bg-blue-500",
  PAID: "bg-violet-500",
  PICKED_UP: "bg-emerald-500",
  RETURNED: "bg-slate-500",
  CANCELED: "bg-red-500",
  PENDING: "bg-amber-500",
  SUCCESS: "bg-emerald-500",
  FAILED: "bg-red-500",
  REFUNDED: "bg-sky-500",
  ACTIVE: "bg-emerald-500",
  INACTIVE: "bg-slate-500",
  SUSPENDED: "bg-red-500",
}

export function StatusBadge({
  status,
  className,
  withDot = true,
}: {
  status: string
  className?: string
  withDot?: boolean
}) {
  const dot = STATUS_DOTS[status] ?? "bg-muted-foreground"
  const style = STATUS_STYLES[status] ?? "bg-muted text-muted-foreground"

  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        style,
        className
      )}
    >
      {withDot && <span className={cn("size-1.5 rounded-full", dot)} />}
      {status.replace("_", " ")}
    </span>
  )
}
