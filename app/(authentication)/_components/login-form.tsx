"use client"

import { useState, useActionState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginAction } from "../_actions/auth"
import toast from "react-hot-toast"
import { z } from "zod"

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
    <form action={formAction} onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className={`pl-9 ${fieldErrors.email ? "border-destructive" : ""}`}
          />
        </div>
        {fieldErrors.email && (
          <p className="text-xs text-destructive">{fieldErrors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <PasswordInput fieldError={fieldErrors.password} />
      </div>

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  )
}

function PasswordInput({ fieldError }: { fieldError?: string }) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="Enter your password"
        className={`pl-9 pr-10 ${fieldError ? "border-destructive" : ""}`}
      />
      <button
        type="button"
        onClick={() => setShowPassword((p) => !p)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      >
        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
      {fieldError && (
        <p className="text-xs text-destructive mt-1">{fieldError}</p>
      )}
    </div>
  )
}
