"use server"

import { getToken } from "@/lib/get-token"
import { api } from "@/service/api"

interface FetchOptions {
  next?: {
    revalidate?: number | false
    tags?: string[]
  }
}

export async function fetchAllGear(options?: FetchOptions) {
  const token = await getToken()

  const gear = await api("/api/admin/gear", { next: options?.next }, token)

  return gear
}
