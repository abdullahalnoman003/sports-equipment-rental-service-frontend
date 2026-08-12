"use client"

import { useEffect } from "react"
import Link from "next/link"
import { RotateCw, Home, LifeBuoy, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/shared/logo"

export function ErrorCard({
  error,
  reset,
  variant = "fatal",
}: {
  error?: Error & { digest?: string }
  reset: () => void
  variant?: "fatal" | "inline"
}) {
  useEffect(() => {
    if (error) console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 top-1/4 size-80 rounded-full bg-destructive/5 blur-3xl animate-pulse-soft" />
        <div className="absolute -right-32 bottom-1/4 size-96 rounded-full bg-primary/5 blur-3xl animate-pulse-soft [animation-delay:1.2s]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <div className="relative mx-auto mb-8 flex size-24 items-center justify-center">
          <span className="absolute inset-0 -m-2 rounded-3xl border border-dashed border-destructive/30 animate-spin-slow" />
          <span className="absolute inset-0 -m-1 rounded-3xl bg-destructive/5" />
          <span className="relative flex size-16 items-center justify-center rounded-2xl bg-destructive/10">
            <Wrench className="size-8 text-destructive" />
          </span>
        </div>

        <span className="inline-flex items-center gap-2 rounded-full border border-destructive/20 bg-destructive/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-destructive">
          <span className="size-1.5 rounded-full bg-destructive animate-pulse" />
          Something went wrong
        </span>

        <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
          We hit a snag while fixing this page
        </h1>
        <p className="mt-4 text-muted-foreground">
          An unexpected error occurred. You can try again, or head back to safety
          while our team looks into it.
        </p>

        {error?.digest && (
          <div className="mt-6 rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3">
            <p className="font-mono text-xs text-muted-foreground">
              Reference: <span className="text-foreground">{error.digest}</span>
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" onClick={reset} className="w-full gap-2 sm:w-auto">
            <RotateCw className="size-4" />
            Try Again
          </Button>
          <Button size="lg" variant="outline" asChild className="w-full gap-2 sm:w-auto">
            <Link href="/">
              <Home className="size-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {variant === "fatal" && (
          <p className="mt-10 text-sm text-muted-foreground">
            Need a hand?{" "}
            <Link href="/contact" className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
              <LifeBuoy className="size-3.5" />
              Contact support
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}
