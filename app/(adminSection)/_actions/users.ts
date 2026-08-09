"use server"

import { getToken } from "@/lib/get-token"
import { api } from "@/service/api"

export async function fetchAllUsers() {
  const token = await getToken()

  const users = await api("/api/admin/users", undefined, token)

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
