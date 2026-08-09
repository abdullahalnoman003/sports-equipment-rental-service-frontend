"use server"

import { cookies } from "next/headers"

export async function getToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get("accessToken")?.value || null
}
