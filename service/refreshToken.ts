"use server"

import { cookies } from "next/headers"

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api"

export const getNewAccessToken = async () => {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get("refreshToken")?.value || null

  if (!refreshToken) {
    return {
      success: false,
      statusCode: 401,
      message: "Refresh token not found!",
      data: null,
    }
  }

  const res = await fetch(`${BASE}/api/auth/refresh-token`, {
    method: "POST",
    headers: {
      Cookie: `refreshToken=${refreshToken}`,
    },
  })

  return res.json()
}

export const isAccessTokenExist = async () => {
  const cookieStore = await cookies()
  let accessToken = cookieStore.get("accessToken")?.value || null

  if (!accessToken) {
    const result = await getNewAccessToken()
    if (result.success) {
      const newAccessToken = result.data.accessToken
      cookieStore.set("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      })
      accessToken = newAccessToken
    }
  }

  return accessToken
}
