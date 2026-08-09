import type { ApiResponse } from "@/lib/types"

const BASE = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000").replace(/\/+$/, "")

async function api<T>(path: string, options?: RequestInit, token?: string | null): Promise<ApiResponse<T>> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options?.headers as Record<string, string>) ?? {}),
  }
  if (token) headers.Cookie = `accessToken=${token}`

  const res = await fetch(`${BASE}${path}`, { ...options, headers })
  return res.json()
}

export { api }
