"use server"

import { getToken } from "@/lib/get-token"
import { api } from "@/service/api"

interface FetchOptions {
  next?: {
    revalidate?: number | false
    tags?: string[]
  }
}

export async function fetchAllUsers(options?: FetchOptions) {
  const token = await getToken()

  const users = await api("/api/admin/users", { next: options?.next }, token)

  return users
}

export async function setUserStatus(id: string, status: string) {
  const token = await getToken()

  const result = await api(
    `/api/admin/users/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify({ status }),
    },
    token
  )

  return result
}
