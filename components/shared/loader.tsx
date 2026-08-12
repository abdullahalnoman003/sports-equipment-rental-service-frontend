import { LogoMark } from "@/components/shared/logo"

export function BrandLoader({
  label = "GearUp",
  hint = "Preparing your experience...",
}: {
  label?: string
  hint?: string
}) {
  return (
    <div className="relative flex flex-col items-center justify-center gap-5">
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-primary/10 blur-3xl animate-pulse-soft" />
      <div className="relative">
        <span className="absolute -inset-3 -z-10 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow" />
        <div className="animate-float">
          <LogoMark className="size-14 drop-shadow-lg" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-foreground">
            {label}
          </span>
          <span className="flex gap-1">
            <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.2s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.1s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-primary" />
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{hint}</p>
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
