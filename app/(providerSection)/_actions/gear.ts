"use server"

import { getToken } from "@/lib/get-token"
import { api } from "@/service/api"

export async function addNewGear(data: {
  name: string
  description: string
  image: string
  price: number
  quantity: number
  brand: string
  category_name: string
}) {
  const token = await getToken()

  const result = await api(
    "/api/provider/gear",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    token
  )

  return result
}

export async function updateGearById(id: string, data: Record<string, string | number>) {
  const token = await getToken()

  const result = await api(
    `/api/provider/gear/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    token
  )

  return result
}

export async function removeGearById(id: string) {
  const token = await getToken()

  const result = await api(
    `/api/provider/gear/${id}`,
    { method: "DELETE" },
    token
  )

  return result
}

export async function fetchProviderGear() {
  const token = await getToken()

  const gear = await api("/api/provider/gear/getallgear", undefined, token)

  return gear
}

export async function fetchProviderOrders() {
  const token = await getToken()

  const orders = await api("/api/provider/orders/", undefined, token)

  return orders
}

export async function updateOrderStatus(id: string, status: string) {
  const token = await getToken()

  const result = await api(
    `/api/provider/orders/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify({ status }),
    },
    token
  )

  return result
}
