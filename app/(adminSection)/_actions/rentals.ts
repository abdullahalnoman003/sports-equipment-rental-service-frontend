"use server"

import { getToken } from "@/lib/get-token"
import { api } from "@/service/api"

export async function fetchAllRentals() {
  const token = await getToken()

  const rentals = await api("/api/admin/rentals", undefined, token)

  return rentals
}
