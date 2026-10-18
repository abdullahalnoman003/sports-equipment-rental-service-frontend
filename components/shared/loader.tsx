import { LogoMark } from "@/components/shared/logo"

/**
 * Calm, minimal loading state.
 *
 * Deliberately restrained: a soft breathing mark above a single indeterminate
 * progress track. No spinning rings, no bouncing dots and no filler copy, all
 * of which read as broken or distracting at the speed a route actually loads.
 */
export function BrandLoader({
  label = "GearUp",
  hint,
}: {
  label?: string
  hint?: string
}) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative flex items-center justify-center">
        <span className="pointer-events-none absolute size-20 rounded-full bg-primary/10 blur-2xl animate-pulse-soft" />
        <LogoMark className="relative size-12 animate-fade-in" />
      </div>

      <div className="flex w-40 flex-col items-center gap-3">
        {label ? (
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            {label}
          </span>
        ) : null}

        <div
          className="h-1 w-full overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-label="Loading"
          aria-busy="true"
        >
          <div className="h-full w-1/3 rounded-full bg-primary animate-progress" />
        </div>

        {hint ? (
          <span className="text-xs text-muted-foreground/80">{hint}</span>
        ) : null}
      </div>
    </div>
  )
}

export function PageSkeleton({
  rows = 3,
  cols = 3,
}: {
  rows?: number
  cols?: number
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-10 flex flex-col items-center gap-3 text-center">
        <div className="h-3 w-28 animate-pulse rounded-full bg-muted" />
        <div className="h-8 w-64 animate-pulse rounded-xl bg-muted sm:h-10 sm:w-80" />
        <div className="h-4 w-72 max-w-full animate-pulse rounded-full bg-muted" />
      </div>
      <div className={`grid gap-5 sm:grid-cols-2 ${cols > 2 ? "lg:grid-cols-3" : ""}`}>
        {Array.from({ length: rows * cols }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="aspect-[4/3] animate-pulse bg-muted" />
            <div className="space-y-2 p-4">
              <div className="h-4 w-3/4 animate-pulse rounded-full bg-muted" />
              <div className="h-3 w-1/2 animate-pulse rounded-full bg-muted" />
              <div className="h-4 w-1/3 animate-pulse rounded-full bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
