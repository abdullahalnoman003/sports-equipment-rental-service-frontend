"use server"

import { getToken } from "@/lib/get-token"
import { api } from "@/service/api"

export async function fetchMyRentals() {
  const token = await getToken()

  const rentals = await api("/api/rental/get-rentals", undefined, token)

  return rentals
}

export async function fetchRentalDetails(id: string) {
  const token = await getToken()

  const rental = await api(`/api/rental/get-rentals/${id}`, undefined, token)

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
  comment: string
  rating: number
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
