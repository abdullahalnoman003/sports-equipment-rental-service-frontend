"use client"

import { useState, useActionState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginAction } from "../_actions/auth"
import toast from "react-hot-toast"
import { z } from "zod"
import { cn } from "@/lib/utils"

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
})

type LoginFormState = {
  success: boolean
  statusCode: number
  message: string
  errors?: { email?: string; password?: string }
}

export function LoginForm() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") ?? ""
  const initialState: LoginFormState = { success: false, statusCode: 0, message: "" }
  const [state, formAction, pending] = useActionState(loginAction.bind(null, redirectTo), initialState)
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({})

  useEffect(() => {
    if (!state) return
    if (!state.success) {
      if (state.message && !Object.keys(state.errors || {}).length) {
        toast.error(state.message || "Login failed")
      }
    }
  }, [state])

  const validate = (formData: FormData) => {
    const result = loginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    })
    if (!result.success) {
      const errors: { email?: string; password?: string } = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as "email" | "password"
        errors[field] = issue.message
      }
      setFieldErrors(errors)
      return false
    }
    setFieldErrors({})
    return true
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget)
    if (!validate(formData)) {
      e.preventDefault()
    }
  }

  return (
    <form action={formAction} onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email address
        </Label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className={cn("h-11 rounded-2xl pl-10", fieldErrors.email && "border-destructive")}
          />
        </div>
        {fieldErrors.email && (
          <p className="text-xs text-destructive">{fieldErrors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <Link
            href="/help"
            className="text-xs font-medium text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <PasswordInput fieldError={fieldErrors.password} />
      </div>

      <div className="flex items-center gap-2.5">
        <input
          type="checkbox"
          id="remember"
          className="size-4 rounded border-border accent-primary"
        />
        <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
          Keep me signed in on this device
        </Label>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full rounded-2xl shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
        disabled={pending}
      >
        {pending ? (
          <span className="inline-flex items-center gap-2">
            Signing in
            <span className="flex gap-1">
              <span className="size-1 animate-bounce rounded-full bg-primary-foreground [animation-delay:-0.2s]" />
              <span className="size-1 animate-bounce rounded-full bg-primary-foreground [animation-delay:-0.1s]" />
              <span className="size-1 animate-bounce rounded-full bg-primary-foreground" />
            </span>
          </span>
        ) : (
          "Sign in"
        )}
      </Button>

      <div className="flex items-center gap-3 rounded-2xl border border-border bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
        <Sparkles className="size-4 shrink-0 text-primary" />
        Demo account: customer@gearup.com / provider@gearup.com
      </div>
    </form>
  )
}

function PasswordInput({ fieldError }: { fieldError?: string }) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <div className="relative">
        <Lock className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          autoComplete="current-password"
          className={cn("h-11 rounded-2xl pl-10 pr-11", fieldError && "border-destructive")}
        />
        <button
          type="button"
          onClick={() => setShowPassword((p) => !p)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-muted-foreground transition-colors hover:text-foreground"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>
      {fieldError && (
        <p className="mt-1.5 text-xs text-destructive">{fieldError}</p>
      )}
    </div>
  )
}
