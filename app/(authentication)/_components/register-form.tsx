"use client"

import { useActionState, useEffect, useState, useRef } from "react"
import { Eye, EyeOff, User, Store, Check, Mail, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerAction } from "../_actions/auth"
import toast from "react-hot-toast"
import { cn } from "@/lib/utils"
import type { Role } from "@/lib/types"

const roles = [
  { value: "CUSTOMER" as Role, label: "Customer", icon: User, description: "Rent sports and outdoor gear" },
  { value: "PROVIDER" as Role, label: "Provider", icon: Store, description: "List your gear and earn money" },
]

type RegisterFormState = {
  success: boolean
  statusCode: number
  message: string
  errors?: { name?: string; email?: string; password?: string; role?: string }
}

export function RegisterForm() {
  const initialState: RegisterFormState = { success: false, statusCode: 0, message: "" }
  const [state, formAction, pending] = useActionState(registerAction, initialState)
  const [selectedRole, setSelectedRole] = useState<Role>("CUSTOMER")
  const [clientErrors, setClientErrors] = useState<{ name?: string; email?: string; password?: string; role?: string }>({})
  const toastShown = useRef(false)

  useEffect(() => {
    if (!state || state.statusCode === 0) return
    if (state.success) {
      if (!toastShown.current) {
        toast.success("Account created! Please sign in.")
        toastShown.current = true
      }
    } else if (!toastShown.current) {
      if (!state.errors) {
        toast.error(state.message || "Registration failed")
        toastShown.current = true
      }
    }
  }, [state])

  const validate = (formData: FormData) => {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const role = formData.get("role") as string

    const errors: { name?: string; email?: string; password?: string; role?: string } = {}
    if (!name.trim()) errors.name = "Name is required"
    if (!email.trim()) errors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email"
    if (!password) errors.password = "Password is required"
    else if (password.length < 8) errors.password = "Password must be at least 8 characters"
    if (!role) errors.role = "Please select a role"

    setClientErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget)
    toastShown.current = false
    if (!validate(formData)) {
      e.preventDefault()
    }
  }

  const getFieldError = (field: string) => {
    return clientErrors[field as keyof typeof clientErrors] || state.errors?.[field as keyof typeof state.errors]
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label className="text-sm font-medium">I want to join as</Label>
        <div className="grid grid-cols-2 gap-3">
          {roles.map((r) => {
            const selected = selectedRole === r.value
            return (
              <button
                key={r.value}
                type="button"
                onClick={() => setSelectedRole(r.value)}
                className={cn(
                  "relative flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-center transition-all",
                  selected
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                    : "border-border hover:border-primary/30 hover:bg-accent"
                )}
                aria-pressed={selected}
              >
                {selected && (
                  <span className="absolute right-2.5 top-2.5 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-3" />
                  </span>
                )}
                <span
                  className={cn(
                    "flex size-11 items-center justify-center rounded-xl transition-colors",
                    selected ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                  )}
                >
                  <r.icon className="size-5" />
                </span>
                <span className="text-sm font-semibold">{r.label}</span>
                <span className="text-xs text-muted-foreground">{r.description}</span>
              </button>
            )
          })}
        </div>
        {getFieldError("role") && (
          <p className="text-xs text-destructive">{getFieldError("role")}</p>
        )}
      </div>

      <form action={formAction} onSubmit={handleSubmit} className="space-y-5">
        <input type="hidden" name="role" value={selectedRole} />

        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Full name
          </Label>
          <div className="relative">
            <UserRound className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              className={cn("h-11 rounded-2xl pl-10", getFieldError("name") && "border-destructive")}
            />
          </div>
          {getFieldError("name") && (
            <p className="text-xs text-destructive">{getFieldError("name")}</p>
          )}
        </div>

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
              className={cn("h-11 rounded-2xl pl-10", getFieldError("email") && "border-destructive")}
            />
          </div>
          {getFieldError("email") && (
            <p className="text-xs text-destructive">{getFieldError("email")}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <PasswordInput fieldError={getFieldError("password")} />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full rounded-2xl shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
          disabled={pending}
        >
          {pending ? (
            <span className="inline-flex items-center gap-2">
              Creating account
              <span className="flex gap-1">
                <span className="size-1 animate-bounce rounded-full bg-primary-foreground [animation-delay:-0.2s]" />
                <span className="size-1 animate-bounce rounded-full bg-primary-foreground [animation-delay:-0.1s]" />
                <span className="size-1 animate-bounce rounded-full bg-primary-foreground" />
              </span>
            </span>
          ) : (
            "Create account"
          )}
        </Button>
      </form>
    </div>
  )
}

function PasswordInput({ fieldError }: { fieldError?: string }) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <div className="relative">
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Min. 8 characters"
          autoComplete="new-password"
          className={cn("h-11 rounded-2xl pl-4 pr-11", fieldError && "border-destructive")}
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
