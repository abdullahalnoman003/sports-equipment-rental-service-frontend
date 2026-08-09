"use server"

import { getToken } from "@/lib/get-token"
import { api } from "@/service/api"

export async function fetchAllGear() {
  const gear = await api("/api/gear")

  return gear
}

export async function fetchGearById(id: string) {
  const gear = await api(`/api/gear/${id}`)

  return gear
}

export async function fetchAllCategories() {
  const categories = await api("/api/category")

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
