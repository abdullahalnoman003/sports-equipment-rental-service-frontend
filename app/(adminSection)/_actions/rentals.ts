"use server"

import { getToken } from "@/lib/get-token"
import { api } from "@/service/api"

interface FetchOptions {
  next?: {
    revalidate?: number | false
    tags?: string[]
  }
}

export async function fetchAllRentals(options?: FetchOptions) {
  const token = await getToken()

  const rentals = await api("/api/admin/rentals", { next: options?.next }, token)

  return rentals
}
