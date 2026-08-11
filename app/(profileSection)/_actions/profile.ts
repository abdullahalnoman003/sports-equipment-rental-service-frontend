"use server"

import { z } from "zod"
import { getToken } from "@/lib/get-token"
import { api } from "@/service/api"

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  profile_picture: z.string().url("Invalid image URL").optional().or(z.literal("")),
  phone_number: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
})

export async function updateUserProfile(data: {
  name: string
  profile_picture: string
  phone_number: string
  address: string
}) {
  const validation = profileSchema.safeParse(data)
  if (!validation.success) {
    const firstError = validation.error.issues[0]
    return { success: false, statusCode: 400, message: firstError.message, data: null as unknown as never }
  }

  const token = await getToken()

  const result = await api(
    "/api/profile/update-profile",
    {
      method: "PUT",
      body: JSON.stringify(validation.data),
    },
    token
  )

  return result
}
