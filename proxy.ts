import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PROTECTED_ROUTES = [
  "/dashboard/customer",
  "/dashboard/provider",
  "/dashboard/admin",
  "/profile",
]

const AUTH_ROUTES = ["/login", "/register"]

const PUBLIC_ROUTES = [
  "/",
  "/gear",
  "/about",
  "/contact",
  "/help",
  "/terms",
  "/how-it-works",
  "/careers",
  "/payment/success",
  "/payment/cancel",
]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const accessToken = request.cookies.get("accessToken")?.value

  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )

  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL("/dashboard/customer", request.url))
  }

  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirectTo", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirectTo", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|favicon.ico|_next/image|.*\\.(?:png|jpg|jpeg|svg|gif|webp)$).*)",
  ],
}
