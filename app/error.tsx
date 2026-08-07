"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      {/* Animated background orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 top-1/4 size-72 animate-pulse rounded-full bg-destructive/5 blur-3xl" />
        <div className="absolute -right-32 bottom-1/4 size-96 animate-pulse rounded-full bg-destructive/5 blur-3xl delay-1000" />
        <div className="absolute left-1/2 top-1/3 size-64 animate-pulse rounded-full bg-primary/5 blur-3xl delay-500" />
      </div>

      <div className="relative z-10 mx-auto max-w-lg text-center">
        {/* Animated icon */}
        <div className="mx-auto mb-8 flex size-28 items-center justify-center rounded-full bg-destructive/10 ring-4 ring-destructive/20 ring-offset-8 ring-offset-background">
          <AlertTriangle className="size-14 text-destructive animate-bounce" />
        </div>

        {/* Error code */}
        <div className="mb-4">
          <span className="inline-block rounded-full bg-destructive/10 px-4 py-1.5 text-sm font-bold tracking-widest text-destructive">
            ERROR
          </span>
        </div>

        {/* Message */}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Something went wrong
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Oops! An unexpected error occurred. Don&apos;t worry — our team has been
          notified and we&apos;re looking into it.
        </p>

        {/* Error digest for debugging */}
        {error.digest && (
          <div className="mt-6 rounded-xl border border-destructive/20 bg-destructive/5 p-4">
            <p className="text-xs font-mono text-muted-foreground">
              Error ID: <span className="text-foreground">{error.digest}</span>
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button size="lg" onClick={reset} className="gap-2">
            <RefreshCw className="size-4" />
            Try Again
          </Button>
          <Button size="lg" variant="outline" asChild className="gap-2">
            <Link href="/">
              <Home className="size-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Additional help */}
        <div className="mt-12 rounded-xl border border-border bg-card/50 p-6">
          <h3 className="text-sm font-semibold">Need help?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            If this keeps happening, please{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contact our support team
            </Link>{" "}
            with the error ID above.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              Go Back
            </button>
            <span className="text-border">|</span>
            <Link
              href="/gear"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Browse Gear
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
