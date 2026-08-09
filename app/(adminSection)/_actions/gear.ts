"use server"

import { getToken } from "@/lib/get-token"
import { api } from "@/service/api"

export async function fetchAllGear() {
  const token = await getToken()

  const gear = await api("/api/admin/gear", undefined, token)

  return gear
}
