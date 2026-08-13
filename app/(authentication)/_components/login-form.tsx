"use client"

import { useState, useActionState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react"
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
  const registered = searchParams.get("registered")
  const initialState: LoginFormState = { success: false, statusCode: 0, message: "" }
  const [state, formAction, pending] = useActionState(loginAction.bind(null, redirectTo), initialState)
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({})
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (!state) return
    if (!state.success) {
      if (state.message && !Object.keys(state.errors || {}).length) {
        toast.error(state.message || "Login failed")
      }
    }
  }, [state])

  useEffect(() => {
    if (registered) {
      toast.success("Account created! Please sign in.")
      window.history.replaceState(null, "", "/login")
    }
  }, [registered])

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
      {!state.success && state.message && !Object.keys(state.errors || {}).length && (
        <div className="flex items-start gap-2.5 rounded-2xl border border-destructive/25 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          {state.message}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email address
        </Label>
        <div className="group relative">
          <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cn(
              "h-11 rounded-2xl border-border bg-background pl-10 transition-shadow focus-visible:ring-primary/30",
              fieldErrors.email && "border-destructive"
            )}
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
        <PasswordInput fieldError={fieldErrors.password} password={password} onPasswordChange={setPassword} />
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
    </form>
  )
}

function PasswordInput({
  fieldError,
  password,
  onPasswordChange,
}: {
  fieldError?: string
  password: string
  onPasswordChange: (value: string) => void
}) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <div className="group relative">
        <Lock className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          className={cn(
            "h-11 rounded-2xl border-border bg-background pl-10 pr-11 transition-shadow focus-visible:ring-primary/30",
            fieldError && "border-destructive"
          )}
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
