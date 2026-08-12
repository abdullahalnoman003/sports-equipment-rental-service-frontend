"use client"

import { ErrorCard } from "@/components/shared/error-card"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <ErrorCard error={error} reset={reset} variant="inline" />
}
