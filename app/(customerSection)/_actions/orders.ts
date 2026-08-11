"use server"

import { z } from "zod"
import { getToken } from "@/lib/get-token"
import { api } from "@/service/api"

interface FetchOptions {
  next?: {
    revalidate?: number | false
    tags?: string[]
  }
}

const reviewSchema = z.object({
  rentalId: z.string().min(1, "Rental ID is required"),
  rating: z.number().int().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
  comment: z.string().optional().or(z.literal("")),
})

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
  const validation = reviewSchema.safeParse(data)
  if (!validation.success) {
    const firstError = validation.error.issues[0]
    return { success: false, statusCode: 400, message: firstError.message, data: null as unknown as never }
  }

  const token = await getToken()

  const result = await api(
    "/api/review",
    {
      method: "POST",
      body: JSON.stringify(validation.data),
    },
    token
  )

  return result
}
