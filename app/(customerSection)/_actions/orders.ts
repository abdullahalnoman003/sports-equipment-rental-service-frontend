"use server"

import { getToken } from "@/lib/get-token"
import { api } from "@/service/api"

interface FetchOptions {
  next?: {
    revalidate?: number | false
    tags?: string[]
  }
}

export async function fetchMyRentals(options?: FetchOptions) {
  const token = await getToken()

  const rentals = await api("/api/rental/get-rentals", { next: options?.next }, token)

  return rentals
}

export async function fetchRentalDetails(id: string, options?: FetchOptions) {
  const token = await getToken()

  const rental = await api(`/api/rental/get-rentals/${id}`, { next: options?.next }, token)

  return rental
}

export async function createPaymentSession(rentalId: string) {
  const token = await getToken()

  const result = await api(
    "/api/payment/create",
    {
      method: "POST",
      body: JSON.stringify({ rentalId }),
    },
    token
  )

  return result
}

export async function submitReview(data: {
  rentalId: string
  rating: number
  comment?: string
}) {
  const token = await getToken()

  const result = await api(
    "/api/review",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    token
  )

  return result
}
