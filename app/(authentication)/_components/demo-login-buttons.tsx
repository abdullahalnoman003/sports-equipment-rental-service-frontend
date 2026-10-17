"use client"

import { useActionState, useEffect, useState, useTransition } from "react"
import { LogIn, ShieldCheck, Store, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { demoLoginAction } from "../_actions/auth"
import { DEMO_ACCOUNTS, type DemoAccount } from "@/lib/demo-accounts"
import toast from "react-hot-toast"

const ICONS = {
  CUSTOMER: LogIn,
  PROVIDER: Store,
  ADMIN: ShieldCheck,
} as const

const IDLE = { success: false, message: "" }

/**
 * One-click demo sign-in.
 *
 * Sends only the role to the server; the server resolves the credentials and
 * performs the login. Driving the login form instead proved unreliable.
 */
export function DemoLoginButtons({ redirectTo }: { redirectTo: string }) {
  const [state, formAction, pending] = useActionState(demoLoginAction, IDLE)
  const [activeRole, setActiveRole] = useState<string | null>(null)
  const [, startTransition] = useTransition()

  // Surface failures from the server action. Must be an effect, not render.
  useEffect(() => {
    if (state.message && !state.success) toast.error(state.message)
  }, [state])

  const submit = (role: string) => {
    setActiveRole(role)
    const data = new FormData()
    data.set("role", role)
    if (redirectTo) data.set("redirectTo", redirectTo)
    // `useActionState`'s dispatch must run inside a transition, otherwise React
    // logs "async function with useActionState was called outside of a transition"
    // and `pending` never updates.
    startTransition(() => formAction(data))
  }

  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Demo access
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {DEMO_ACCOUNTS.map((account: DemoAccount) => {
          const Icon = ICONS[account.role]
          // Derived from `pending` so it clears itself when the action settles.
          const busy = pending && activeRole === account.role

          return (
            <Button
              key={account.role}
              type="button"
              variant="outline"
              disabled={pending}
              onClick={() => submit(account.role)}
              aria-label={`Sign in as demo ${account.label}`}
              className={cn(
                "h-10 gap-1.5 rounded-xl px-2 text-sm font-semibold",
                "border-border transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
              )}
            >
              {busy ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Icon className="size-4 shrink-0" />
              )}
              <span className="truncate">{account.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}