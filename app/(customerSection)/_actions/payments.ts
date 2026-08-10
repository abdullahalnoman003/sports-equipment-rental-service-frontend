"use server"

import { getToken } from "@/lib/get-token"
import { api } from "@/service/api"

export async function fetchPaymentHistory() {
  const token = await getToken()

  const payments = await api("/api/payment", undefined, token)

  return payments
}

export async function fetchPaymentById(id: string) {
  const token = await getToken()

  const payment = await api(`/api/payment/${id}`, undefined, token)

  return payment
}
