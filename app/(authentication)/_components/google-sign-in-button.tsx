"use client"

import { useEffect, useId, useRef, useState } from "react"
import { FcGoogle } from "react-icons/fc"

/**
 * Google sign-in button.
 *
 * The Google Identity Services script is loaded on demand rather than through a
 * bundler SDK, so the dependency stays optional. When no client ID is configured
 * the button is not rendered at all, which avoids a dead control.
 */

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
const SRC = "https://accounts.google.com/gsi/client"

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string
            callback: (response: { credential?: string }) => void
          }) => void
          renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void
        }
      }
    }
  }
}

let scriptPromise: Promise<void> | null = null

function loadGoogleIdentity(): Promise<void> {
  if (window.google?.accounts?.id) return Promise.resolve()
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[src="${SRC}"]`)
    if (existing) {
      existing.addEventListener("load", () => resolve())
      existing.addEventListener("error", () => reject(new Error("Google script failed")))
      return
    }

    const script = document.createElement("script")
    script.src = SRC
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Google script failed to load"))
    document.head.appendChild(script)
  })

  return scriptPromise
}

export function GoogleSignInButton({
  onCredential,
  onError,
}: {
  onCredential: (credential: string) => void | Promise<void>
  onError: (message: string) => void
}) {
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  // `useId` is hydration-safe. A Math.random() id rendered different values on
  // the server and the client, which caused a hydration mismatch on this attribute.
  const reactId = useId()
  const buttonId = `gearup-google${reactId.replace(/:/g, "")}`
  const startedRef = useRef(false)

  // Runs in an effect, not during render: Google Identity Services must be
  // initialised exactly once, otherwise StrictMode double-invocation makes it
  // warn and only the last instance is used.
  useEffect(() => {
    if (!CLIENT_ID || startedRef.current) return
    startedRef.current = true
    let cancelled = false

    loadGoogleIdentity()
      .then(() => {
        const google = window.google
        if (!google) throw new Error("Google Identity Services unavailable")

        google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: (response) => {
            if (!response.credential) {
              onError("Google did not return a credential. Please try again.")
              return
            }
            void onCredential(response.credential)
          },
        })

        const host = document.getElementById(buttonId)
        if (!host || cancelled) return

        google.accounts.id.renderButton(host, {
          theme: "outline",
          size: "large",
          width: Math.min(400, Math.max(240, host.offsetWidth || 320)),
          text: "continue_with",
          shape: "rectangular",
        })
        setReady(true)
      })
      .catch(() => {
        if (cancelled) return
        setFailed(true)
        onError("Could not load Google sign-in. Check your connection.")
      })

    return () => {
      cancelled = true
    }
    // Intentionally mount-only: initialising twice would trip Google's guard.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!CLIENT_ID) return null

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          or
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <div
        className="relative flex min-h-11 w-full items-center justify-center overflow-hidden rounded-2xl"
      >
        {!ready && !failed && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl border border-border">
            <FcGoogle className="size-4" />
            <span className="ml-2 text-sm text-muted-foreground">Loading Google sign-in</span>
          </div>
        )}
        <div id={buttonId} className={ready ? "w-full" : "invisible w-full"} />
      </div>

      {failed && (
        <p className="text-center text-xs text-muted-foreground">
          Google sign-in is unavailable right now. Please use email and password.
        </p>
      )}
    </div>
  )
}