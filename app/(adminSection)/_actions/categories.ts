"use server"

import { z } from "zod"
import { getToken } from "@/lib/get-token"
import { api } from "@/service/api"

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional().or(z.literal("")),
  image: z.string().url("Invalid image URL").optional().or(z.literal("")),
})

export async function fetchAllCategories() {
  const categories = await api("/api/category")
  return categories
}

export async function createCategory(data: {
  name: string
  description: string
  image: string
}) {
  const validation = categorySchema.safeParse(data)
  if (!validation.success) {
    const firstError = validation.error.issues[0]
    return { success: false, statusCode: 400, message: firstError.message, data: null as unknown as never }
  }

  const token = await getToken()

  const result = await api(
    "/api/category/create-category",
    {
      method: "POST",
      body: JSON.stringify(validation.data),
    },
    token
  )

  return result
}

export async function updateCategory(
  id: string,
  data: { name: string; description: string; image: string }
) {
  const validation = categorySchema.safeParse(data)
  if (!validation.success) {
    const firstError = validation.error.issues[0]
    return { success: false, statusCode: 400, message: firstError.message, data: null as unknown as never }
  }

  const token = await getToken()

  const result = await api(
    `/api/category/update-category/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(validation.data),
    },
    token
  )

  return result
}

export async function deleteCategory(id: string) {
  const token = await getToken()

  const result = await api(
    `/api/category/delete-category/${id}`,
    { method: "DELETE" },
    token
  )

  return result
}
