"use server"

import { getToken } from "@/lib/get-token"
import { api } from "@/service/api"

interface FetchOptions {
  next?: {
    revalidate?: number | false
    tags?: string[]
  }
}

export async function fetchPaymentHistory(options?: FetchOptions) {
  const token = await getToken()

  const payments = await api("/api/payment", { next: options?.next }, token)

  return payments
}

export async function fetchPaymentById(id: string, options?: FetchOptions) {
  const token = await getToken()

  const payment = await api(`/api/payment/${id}`, { next: options?.next }, token)

  return payment
}
