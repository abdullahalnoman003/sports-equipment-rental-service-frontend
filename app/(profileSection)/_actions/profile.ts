"use server"

import { getToken } from "@/lib/get-token"
import { api } from "@/service/api"

export async function updateUserProfile(data: {
  name: string
  profile_picture: string
  phone_number: string
  address: string
}) {
  const token = await getToken()

  const result = await api(
    "/api/profile/update-profile",
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    token
  )

  return result
}
