import { GearGridSkeleton } from "../_components/gear/gear-card-skeleton"

/** Shown while the /gear route segment resolves. */
export default function GearLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-10 h-40 rounded-3xl border border-border bg-muted/40" />
      <GearGridSkeleton count={12} />
    </div>
  )
}