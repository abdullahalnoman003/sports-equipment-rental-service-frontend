import { cn } from "@/lib/utils"
import { brandDotOf, brandTintOf, statusHue } from "@/lib/brand"

/**
 * Status colours are derived from the brand palette (primary / gold / neutral)
 * with a single `destructive` exception for failures, instead of one raw
 * Tailwind colour per state.
 */
export const STATUS_STYLES: Record<string, string> = Object.fromEntries(
  [
    "PLACED", "CONFIRMED", "PAID", "PICKED_UP", "RETURNED", "CANCELED",
    "PENDING", "SUCCESS", "FAILED", "REFUNDED",
    "ACTIVE", "INACTIVE", "SUSPENDED",
    "CUSTOMER", "PROVIDER", "ADMIN",
  ].map((key) => [key, brandTintOf(statusHue(key))])
)

export const STATUS_DOTS: Record<string, string> = Object.fromEntries(
  Object.keys(STATUS_STYLES).map((key) => [key, brandDotOf(statusHue(key))])
)

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
      {status.replace(/_/g, " ")}
    </span>
  )
}