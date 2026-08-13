"use server"

import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { api } from "@/service/api"
import { z } from "zod"

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
    const data = result.data as { accessToken: string; refreshToken: string }
    const cookieStore = await cookies()

    cookieStore.set("accessToken", data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    })
    cookieStore.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    })

    const decoded = jwt.decode(data.accessToken) as { role?: string } | null

    if (redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")) {
      redirect(redirectTo)
    }

    if (decoded?.role === "ADMIN") redirect("/dashboard/admin")
    else if (decoded?.role === "PROVIDER") redirect("/dashboard/provider")
    else redirect("/dashboard/customer")
  }

  return { success: result.success, statusCode: result.statusCode, message: result.message }
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
