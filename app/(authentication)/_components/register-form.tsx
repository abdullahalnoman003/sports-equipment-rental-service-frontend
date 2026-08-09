"use client"

import { useActionState, useEffect, useState, useRef } from "react"
import { Eye, EyeOff, User, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerAction } from "../_actions/auth"
import toast from "react-hot-toast"
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
    <>
      <div className="grid grid-cols-2 gap-3">
        {roles.map((r) => (
          <button
            key={r.value}
            type="button"
            onClick={() => setSelectedRole(r.value)}
            className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all ${
              selectedRole === r.value
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/30"
            }`}
          >
            <r.icon className={`size-6 ${selectedRole === r.value ? "text-primary" : "text-muted-foreground"}`} />
            <span className="text-sm font-semibold">{r.label}</span>
            <span className="text-xs text-muted-foreground">{r.description}</span>
          </button>
        ))}
      </div>

      <form action={formAction} onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="role" value={selectedRole} />

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            className={getFieldError("name") ? "border-destructive" : ""}
          />
          {getFieldError("name") && (
            <p className="text-xs text-destructive">{getFieldError("name")}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className={getFieldError("email") ? "border-destructive" : ""}
          />
          {getFieldError("email") && (
            <p className="text-xs text-destructive">{getFieldError("email")}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <PasswordInput fieldError={getFieldError("password")} />
        </div>

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </>
  )
}

function PasswordInput({ fieldError }: { fieldError?: string }) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <Input
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="Min. 8 characters"
        className={`pr-10 ${fieldError ? "border-destructive" : ""}`}
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
