import { Skeleton } from "@/components/ui/skeleton"

/**
 * Loading state for the gear detail page.
 *
 * Mirrors `gear/[id]/page.tsx` block for block (breadcrumb, two column hero,
 * trust strip, quick stats, rent form, about + aside, reviews, related) so the
 * layout does not jump when the data arrives. Without this the route fell back
 * to the root `app/loading.tsx`, which renders a full screen branded spinner and
 * reads like a different page entirely.
 */
export default function GearDetailLoading() {
  return (
    <div
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12"
      role="status"
      aria-label="Loading gear details"
    >
      {/* Breadcrumb */}
      <nav aria-hidden="true" className="mb-8 flex items-center gap-1.5">
        <Skeleton className="size-3.5 rounded-sm" />
        <Skeleton className="h-3.5 w-12" />
        <Skeleton className="size-4 rounded-sm" />
        <Skeleton className="h-3.5 w-24" />
        <Skeleton className="size-4 rounded-sm" />
        <Skeleton className="h-3.5 w-36" />
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Left: gallery + trust strip */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Skeleton className="aspect-[16/10] w-full rounded-3xl sm:aspect-[4/3]" />

          <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="aspect-square w-full rounded-xl" />
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card/70 px-3 py-4"
              >
                <Skeleton className="size-9 rounded-xl" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: details + rent form */}
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-6 w-28 rounded-full" />
            <Skeleton className="h-6 w-28 rounded-full" />
          </div>

          <Skeleton className="mt-4 h-10 w-4/5 sm:h-12" />
          <Skeleton className="mt-3 h-4 w-40" />

          <div className="mt-6 flex items-end gap-3">
            <Skeleton className="h-11 w-32" />
            <Skeleton className="h-5 w-12" />
          </div>

          <div className="mt-6 space-y-2">
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-4/5" />
          </div>

          {/* Quick stats */}
          <div className="mt-7 grid grid-cols-3 gap-3">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-4">
                <Skeleton className="mx-auto size-5 rounded-sm" />
                <Skeleton className="mx-auto mt-2 h-5 w-14" />
                <Skeleton className="mx-auto mt-2 h-3 w-16" />
              </div>
            ))}
          </div>

          {/* Rent form card */}
          <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5 sm:p-7">
            <Skeleton className="h-6 w-40" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-11 w-full rounded-xl" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-11 w-full rounded-xl" />
              </div>
            </div>
            <Skeleton className="mt-4 h-3.5 w-full" />
            <Skeleton className="mt-2 h-3.5 w-2/3" />
            <Skeleton className="mt-6 h-12 w-full rounded-xl" />
          </div>
        </div>
      </div>

      {/* About + aside */}
      <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
          <div className="flex items-center gap-2.5">
            <Skeleton className="size-10 rounded-xl" />
            <Skeleton className="h-7 w-44" />
          </div>
          <div className="mt-5 space-y-2.5">
            {Array.from({ length: 7 }, (_, i) => (
              <Skeleton
                key={i}
                className="h-3.5"
                style={{ width: i % 3 === 2 ? "72%" : "100%" }}
              />
            ))}
          </div>
          <Skeleton className="mt-8 h-40 w-full rounded-2xl" />
        </div>

        <div className="space-y-6">
          {/* Provider card */}
          <div className="rounded-3xl border border-border bg-card p-6">
            <Skeleton className="h-3.5 w-24" />
            <div className="mt-5 flex items-center gap-3">
              <Skeleton className="size-14 shrink-0 rounded-2xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="mt-5 h-9 w-full rounded-xl" />
          </div>

          {/* Booking steps */}
          <div className="rounded-3xl border border-border bg-card p-6">
            <Skeleton className="h-3.5 w-32" />
            <div className="mt-6 space-y-5">
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="size-10 shrink-0 rounded-2xl" />
                  <div className="space-y-2 pt-1">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Specs */}
          <div className="overflow-hidden rounded-3xl border border-border bg-card">
            <div className="flex items-center gap-3 border-b border-border px-6 py-4">
              <Skeleton className="size-9 rounded-xl" />
              <Skeleton className="h-3.5 w-28" />
            </div>
            <div className="divide-y divide-border">
              {Array.from({ length: 7 }, (_, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-3.5">
                  <Skeleton className="size-8 shrink-0 rounded-lg" />
                  <Skeleton className="h-3.5 w-24 shrink-0" />
                  <Skeleton className="h-3.5 flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-14">
        <div className="flex items-center gap-2.5">
          <Skeleton className="size-10 rounded-xl" />
          <Skeleton className="h-8 w-56" />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)]">
          <div className="h-fit rounded-3xl border border-border bg-card p-6">
            <Skeleton className="h-12 w-24" />
            <Skeleton className="mt-3 h-5 w-28" />
            <Skeleton className="mt-2 h-3.5 w-36" />
            <div className="mt-6 space-y-2.5">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <Skeleton className="h-3 w-2.5" />
                  <Skeleton className="h-2 flex-1 rounded-full" />
                  <Skeleton className="h-3 w-5" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {Array.from({ length: 2 }, (_, i) => (
              <div key={i} className="rounded-3xl border border-border bg-card p-5">
                <div className="flex items-start gap-3.5">
                  <Skeleton className="size-11 shrink-0 rounded-full" />
                  <div className="flex-1 space-y-2.5">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3.5 w-full" />
                    <Skeleton className="h-3.5 w-4/5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      <div className="mt-14">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <Skeleton className="h-7 w-40 rounded-full" />
            <Skeleton className="h-9 w-72" />
          </div>
          <Skeleton className="h-10 w-36 rounded-full" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
            >
              <Skeleton className="aspect-[4/3] w-full rounded-none" />
              <div className="flex flex-1 flex-col p-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="mt-2 h-3.5 w-1/2" />
                <Skeleton className="mt-3 h-3.5 w-full" />
                <div className="mt-auto flex items-center justify-between border-t border-border/70 pt-3">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}