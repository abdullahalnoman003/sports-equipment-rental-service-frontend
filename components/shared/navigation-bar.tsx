"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

/**
 * Site-wide navigation progress bar.
 *
 * Mounted once in the root layout, so it follows the user across every route,
 * including the dashboards and the auth pages.
 *
 * Why a document-level listener rather than `useLinkStatus`: that hook has to be
 * called from inside a `<Link>`, so it would need wrapping at every call site and
 * would still miss every `router.push`. Listening for internal anchor clicks
 * covers `<Link>`, and the `pathname` watch covers the completion of navigations
 * started any other way, including browser back and forward.
 *
 * The bar creeps toward 90% rather than racing to 100%, because a bar that
 * reaches the end while the server is still working is a lie. It only completes
 * once the route has actually changed.
 */

/** Where the bar creeps to while a navigation is still in flight. */
const PENDING_TARGET = 90
/** How long to wait before assuming a navigation will never resolve. */
const SAFETY_MS = 8000

export function NavigationBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  const targetRef = useRef(0)
  const frameRef = useRef<number | null>(null)
  const safetyRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const finishRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastUrlRef = useRef<string | null>(null)

  const clearTimers = useCallback(() => {
    if (safetyRef.current) clearTimeout(safetyRef.current)
    if (finishRef.current) clearTimeout(finishRef.current)
    safetyRef.current = null
    finishRef.current = null
  }, [])

  const finish = useCallback(() => {
    clearTimers()

    targetRef.current = 100
    setProgress(100)

    // Hold at 100% briefly so the eye registers completion, then fade out.
    finishRef.current = setTimeout(() => {
      setVisible(false)
      setProgress(0)
      targetRef.current = 0
    }, 220)
  }, [clearTimers])

  const start = useCallback(() => {
    if (finishRef.current) {
      clearTimeout(finishRef.current)
      finishRef.current = null
    }

    setVisible(true)
    // Jump a little on the first frame so the bar registers as moving even if the
    // route is cached and resolves in under 16ms.
    setProgress((prev) => (prev === 0 ? 10 : Math.max(prev, 10)))
    targetRef.current = PENDING_TARGET

    // Guarantees the bar always clears, even if a navigation silently fails.
    if (!safetyRef.current) {
      safetyRef.current = setTimeout(() => finish(), SAFETY_MS)
    }
  }, [finish])

  // Creep toward the target. Only runs while the bar is on screen, so there is no
  // idle animation loop burning frames.
  useEffect(() => {
    if (!visible) return

    let frame = requestAnimationFrame(function step() {
      setProgress((prev) => {
        const target = targetRef.current
        if (prev >= target) return prev
        // Decelerating approach, so the bar feels like it is loading rather than
        // animating on a fixed duration.
        const next = prev + Math.max((target - prev) * 0.12, 1.5)
        return Math.min(target, next)
      })
      frame = requestAnimationFrame(step)
    })

    frameRef.current = frame
    return () => cancelAnimationFrame(frame)
  }, [visible])

  // Finish when the URL actually changes. Skipped on first render so a hard page
  // load does not flash a bar that has nothing to load.
  useEffect(() => {
    const url = `${pathname ?? ""}${searchParams?.toString() ? `?${searchParams}` : ""}`

    if (lastUrlRef.current === null) {
      lastUrlRef.current = url
      return
    }
    if (lastUrlRef.current === url) return

    lastUrlRef.current = url
    if (visible) finish()
  }, [pathname, searchParams, visible, finish])

  // Catch internal anchor clicks, which is where every client navigation begins.
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented) return
      if (event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = (event.target as HTMLElement | null)?.closest?.("a")
      if (!(anchor instanceof HTMLAnchorElement)) return

      // Open in a new tab is not a navigation this bar should describe.
      if (anchor.target === "_blank") return
      // Escape hatch for filter chips and similar in-page controls.
      if (anchor.dataset.noProgress !== undefined) return

      const href = anchor.getAttribute("href")
      if (!href) return
      // External, protocol relative, in-page anchor, or a mail or tel link.
      if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(href)) return

      // Skip only when the link resolves to exactly where we already are. A bare
      // pathname check would also skip same-page query navigations, which are real
      // navigations, and would miss a hash jump, which is not.
      let target: URL
      try {
        target = new URL(anchor.href, window.location.href)
      } catch {
        return
      }
      const here = window.location
      if (
        target.pathname === here.pathname &&
        target.search === here.search &&
        target.hash === here.hash
      ) {
        return
      }

      start()
    }

    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [start])

  // Back and forward buttons.
  useEffect(() => {
    function onPopState() {
      start()
    }
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [start])

  useEffect(() => clearTimers, [clearTimers])

  if (!visible) return null

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-0.5"
      role="progressbar"
      aria-label="Loading page"
      aria-busy="true"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          "h-full rounded-r-full bg-primary transition-[width,opacity] duration-200 ease-out",
          progress >= 100 ? "opacity-0" : "opacity-100"
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}