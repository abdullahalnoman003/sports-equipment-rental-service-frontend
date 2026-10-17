import { BrandLoader } from "@/components/shared/loader"

/**
 * Root route loading state.
 *
 * Deliberately no progress bar here. `NavigationBar` in the root layout owns the
 * bar for the whole site, and two of them stacked at the top of the viewport
 * looked like a rendering fault.
 *
 * What is left covers the case this fallback exists for: a cold load or refresh,
 * where no client navigation has happened yet and there is nothing to creep
 * towards. The mark sits low in the frame and nothing competes with the content.
 */
export default function Loading() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/[0.05] via-transparent to-transparent" />

      <div className="relative flex flex-1 items-center justify-center px-4 pb-24">
        <BrandLoader />
      </div>
    </div>
  )
}