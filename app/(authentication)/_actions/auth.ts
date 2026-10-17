"use server"

import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { api } from "@/service/api"
import { z } from "zod"

const DEMO_ROLES = new Set(["CUSTOMER", "PROVIDER", "ADMIN"])

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
})

export const loginAction = async (
  redirectTo: string,
  prevState: { success: boolean; statusCode: number; message: string; errors?: { email?: string; password?: string } } | null,
  formData: FormData
) => {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const validation = loginSchema.safeParse({ email, password })
  if (!validation.success) {
    const errors: { email?: string; password?: string } = {}
    for (const issue of validation.error.issues) {
      const field = issue.path[0] as "email" | "password"
      errors[field] = issue.message
    }
    return {
      success: false,
      statusCode: 400,
      message: "Please fix the errors below",
      errors,
    }
  }

  const result = await api("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })

  if (result.success) {
    await completeLogin(
      result.data as { accessToken: string; refreshToken: string },
      redirectTo
    )
  }

  return { success: result.success, statusCode: result.statusCode, message: result.message }
}

/** Sets the session cookies and routes the user to the right dashboard. */
async function completeLogin(
  tokens: { accessToken: string; refreshToken: string },
  redirectTo: string
) {
  const cookieStore = await cookies()

  cookieStore.set("accessToken", tokens.accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  })
  cookieStore.set("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  })

  const decoded = jwt.decode(tokens.accessToken) as { role?: string } | null

  if (redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")) {
    redirect(redirectTo)
  }

  if (decoded?.role === "ADMIN") redirect("/dashboard/admin")
  else if (decoded?.role === "PROVIDER") redirect("/dashboard/provider")
  else redirect("/dashboard/customer")
}

/**
 * Signs a user in with a Google ID token.
 *
 * The token is verified server side by the backend, so trusting it from the
 * client would be pointless. Accounts are created on first sign-in.
 */
export async function googleLoginAction(credential: string, redirectTo = "") {
  if (!credential) {
    return { success: false, statusCode: 400, message: "Google did not return a credential." }
  }

  const result = await api("/api/auth/google", {
    method: "POST",
    body: JSON.stringify({ idToken: credential }),
  })

  if (result.success && result.data) {
    await completeLogin(
      result.data as { accessToken: string; refreshToken: string },
      redirectTo
    )
  }

  return {
    success: result.success,
    statusCode: result.statusCode,
    message: result.message || "Google sign-in failed",
  }
}

/**
 * One-click demo sign-in.
 *
 * Credentials are resolved on the server from env vars, so nothing sensitive is
 * ever sent to the browser. This deliberately bypasses the login form and hits
 * the API directly, which is far more reliable than driving a controlled form.
 */
export async function demoLoginAction(
  _prev: { success: boolean; message: string },
  formData: FormData
) {
  const role = formData.get("role")
  const redirectTo = formData.get("redirectTo")

  if (typeof role !== "string" || !DEMO_ROLES.has(role)) {
    return { success: false, message: "Unknown demo role." }
  }

  const email = process.env[`NEXT_PUBLIC_DEMO_${role}_EMAIL`]
  const password = process.env[`NEXT_PUBLIC_DEMO_${role}_PASSWORD`]

  if (!email || !password) {
    return {
      success: false,
      message: `Demo ${role.toLowerCase()} account is not configured.`,
    }
  }

  const result = await api("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })

  if (result.success && result.data) {
    await completeLogin(
      result.data as { accessToken: string; refreshToken: string },
      typeof redirectTo === "string" ? redirectTo : ""
    )
  }

  return {
    success: result.success,
    message: result.success ? `Signed in as ${role.toLowerCase()}` : result.message,
  }
}

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["CUSTOMER", "PROVIDER"], { message: "Please select a role" }),
})

export const registerAction = async (
  prevState: { success: boolean; statusCode: number; message: string; errors?: { name?: string; email?: string; password?: string; role?: string } } | null,
  formData: FormData
) => {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const role = formData.get("role") as string

  const validation = registerSchema.safeParse({ name, email, password, role })
  if (!validation.success) {
    const errors: { name?: string; email?: string; password?: string; role?: string } = {}
    for (const issue of validation.error.issues) {
      const field = issue.path[0] as "name" | "email" | "password" | "role"
      errors[field] = issue.message
    }
    return {
      success: false,
      statusCode: 400,
      message: "Please fix the errors below",
      errors,
    }
  }

  const result = await api("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password, role }),
  })

  if (result.success) redirect("/login?registered=1")

  return { success: result.success, statusCode: result.statusCode, message: result.message }
}
