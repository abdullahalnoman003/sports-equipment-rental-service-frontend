import Link from "next/link"
import { Compass, Home, PackageSearch } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/shared/logo"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-32 top-1/4 size-80 rounded-full bg-primary/5 blur-3xl animate-pulse-soft" />
        <div className="absolute -left-32 bottom-1/4 size-96 rounded-full bg-primary/5 blur-3xl animate-pulse-soft [animation-delay:1s]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-lg text-center">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <div className="relative mx-auto mb-8 flex size-28 items-center justify-center">
          <span className="absolute inset-0 rounded-full border border-dashed border-primary/30 animate-spin-slow" />
          <span className="absolute inset-3 rounded-full bg-primary/10" />
          <span className="relative flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 animate-float">
            <PackageSearch className="size-7" />
          </span>
        </div>

        <p className="text-7xl font-bold tracking-tight text-gradient-brand sm:text-8xl">404</p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          This page went off on an adventure
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          We couldn&apos;t find the page you were looking for. It may have moved, been
          deleted, or never existed. Let&apos;s get you back to the trail.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" asChild className="w-full gap-2 sm:w-auto">
            <Link href="/">
              <Home className="size-4" />
              Back Home
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="w-full gap-2 sm:w-auto">
            <Link href="/gear">
              <Compass className="size-4" />
              Browse Gear
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
