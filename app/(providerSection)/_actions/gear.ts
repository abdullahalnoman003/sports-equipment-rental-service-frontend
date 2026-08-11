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

const gearSchema = z.object({
  name: z.string().min(1, "Gear name is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("Invalid image URL").optional().or(z.literal("")),
  price: z.number().positive("Price must be greater than 0"),
  quantity: z.number().int("Quantity must be a whole number").positive("Quantity must be greater than 0"),
  brand: z.string().min(1, "Brand is required"),
  category_name: z.string().min(1, "Category is required"),
})

export async function addNewGear(data: {
  name: string
  description: string
  image: string
  price: number
  quantity: number
  brand: string
  category_name: string
}) {
  const validation = gearSchema.safeParse(data)
  if (!validation.success) {
    const firstError = validation.error.issues[0]
    return { success: false, statusCode: 400, message: firstError.message, data: null as unknown as never }
  }

  const token = await getToken()

  const result = await api(
    "/api/provider/gear",
    {
      method: "POST",
      body: JSON.stringify(validation.data),
    },
    token
  )

  return result
}

export async function updateGearById(id: string, data: Record<string, string | number>) {
  const parsed = gearSchema.partial().safeParse(data)
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]
    return { success: false, statusCode: 400, message: firstError.message, data: null as unknown as never }
  }

  const token = await getToken()

  const result = await api(
    `/api/provider/gear/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(parsed.data),
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

export async function fetchProviderGear(options?: FetchOptions) {
  const token = await getToken()

  const gear = await api("/api/provider/gear/getallgear", { next: options?.next }, token)

  return gear
}

export async function fetchProviderOrders(options?: FetchOptions) {
  const token = await getToken()

  const orders = await api("/api/provider/orders/", { next: options?.next }, token)

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
