"use server"

import { getToken } from "@/lib/get-token"
import { api } from "@/service/api"
import type { UserProfile } from "@/lib/types"

export async function getMe() {
  const token = await getToken()

  if (!token) {
    return {
      success: false,
      statusCode: 401,
      message: "User not logged in!",
      data: null as unknown as UserProfile,
    }
  }

  return api<UserProfile>("/api/auth/me", undefined, token)
}
