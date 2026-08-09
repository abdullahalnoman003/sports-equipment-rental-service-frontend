"use server"

import { getToken } from "@/lib/get-token"
import { api } from "@/service/api"

export async function createCategory(data: {
  name: string
  description: string
  image: string
}) {
  const token = await getToken()

  const result = await api(
    "/api/category/create-category",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    token
  )

  return result
}

export async function updateCategory(
  id: string,
  data: { name: string; description: string; image: string }
) {
  const token = await getToken()

  const result = await api(
    `/api/category/update-category/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
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
