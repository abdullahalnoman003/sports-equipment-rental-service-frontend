import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

/**
 * Mirrors `GearCard` 1:1 (same aspect ratio, padding and type scale) so the grid
 * does not reflow when real data arrives.
 */
export function GearCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-border bg-card",
        className
      )}
    >
      <Skeleton className="aspect-[4/3] w-full rounded-none" />

      <div className="flex flex-1 flex-col p-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="mt-2 h-3.5 w-1/2" />
        <Skeleton className="mt-3 h-3.5 w-full" />
        <Skeleton className="mt-1.5 h-3.5 w-4/5" />

        <div className="mt-auto flex items-center justify-between border-t border-border/70 pt-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  )
}

export function GearGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }, (_, i) => (
        <GearCardSkeleton key={i} />
      ))}
    </div>
  )
}