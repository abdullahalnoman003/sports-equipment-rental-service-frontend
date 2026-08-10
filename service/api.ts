import type { ApiResponse } from "@/lib/types"

const BASE = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000").replace(/\/+$/, "")

interface ApiFetchOptions extends RequestInit {
  next?: {
    revalidate?: number | false
    tags?: string[]
  }
}

async function api<T>(path: string, options?: ApiFetchOptions, token?: string | null): Promise<ApiResponse<T>> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options?.headers as Record<string, string>) ?? {}),
  }
  if (token) headers.Cookie = `accessToken=${token}`

  const { next, ...fetchOptions } = options || {}

  const res = await fetch(`${BASE}${path}`, {
    ...fetchOptions,
    headers,
    ...(next ? { next } : {}),
  })
  return res.json()
}

export { api }
