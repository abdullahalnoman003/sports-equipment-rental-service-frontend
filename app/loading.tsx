import { Dumbbell } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      {/* Animated background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 size-64 animate-pulse rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 size-96 animate-pulse rounded-full bg-primary/5 blur-3xl delay-700" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Spinning gear loader */}
        <div className="relative">
          {/* Outer ring */}
          <div className="size-20 rounded-full border-4 border-muted animate-spin">
            <div className="absolute left-0 top-0 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
          </div>

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
              <Dumbbell className="size-5 text-primary" />
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold tracking-wide text-foreground">
              Loading
            </span>
            <span className="flex gap-0.5">
              <span className="size-1 animate-bounce rounded-full bg-primary delay-0" />
              <span className="size-1 animate-bounce rounded-full bg-primary delay-150" />
              <span className="size-1 animate-bounce rounded-full bg-primary delay-300" />
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Preparing your experience...
          </p>
        </div>

        {/* Skeleton preview cards */}
        <div className="mt-4 grid grid-cols-3 gap-3 opacity-30">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 w-28 animate-pulse rounded-xl bg-muted"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
