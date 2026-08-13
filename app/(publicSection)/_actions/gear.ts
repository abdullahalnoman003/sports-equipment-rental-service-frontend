"use server"

import { getToken } from "@/lib/get-token"
import { api } from "@/service/api"

interface FetchOptions {
  next?: {
    revalidate?: number | false
    tags?: string[]
  }
}

export async function fetchAllGear(query = "", options?: FetchOptions) {
  const gear = await api(`/api/gear${query ? `?${query}` : ""}`, { next: options?.next })
  return gear
}

export async function fetchGearById(id: string, options?: FetchOptions) {
  const gear = await api(`/api/gear/${id}`, { next: options?.next })
  return gear
}

export async function fetchAllCategories(options?: FetchOptions) {
  const categories = await api("/api/category", { next: options?.next })
  return categories
}

export async function createRental(data: {
  gear_id: string
  start_date: string
  end_date: string
}) {
  const token = await getToken()

  const result = await api(
    "/api/rental/create-rental",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    token
  )

  return result
}
