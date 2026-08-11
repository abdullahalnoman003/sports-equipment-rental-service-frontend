import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

type Role = "CUSTOMER" | "PROVIDER" | "ADMIN"

const AUTH_ROUTES = ["/login", "/register"]

const ROLE_ROUTES: { prefix: string; roles: Role[] }[] = [
  { prefix: "/dashboard/admin", roles: ["ADMIN"] },
  { prefix: "/dashboard/provider", roles: ["PROVIDER"] },
  { prefix: "/dashboard/customer", roles: ["CUSTOMER"] },
]

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

function matches(route: string, pathname: string) {
  return pathname === route || pathname.startsWith(`${route}/`)
}

function isProfileRoute(pathname: string) {
  return pathname === "/profile" || pathname.startsWith("/profile/")
}

function getRoleFromToken(token?: string): Role | null {
  if (!token) return null
  try {
    const [, payload] = token.split(".")
    if (!payload) return null
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/")
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4)
    const decoded = JSON.parse(atob(padded)) as { role?: Role }
    return decoded.role ?? null
  } catch {
    return null
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const accessToken = request.cookies.get("accessToken")?.value
  const role = getRoleFromToken(accessToken)
  const isLoggedIn = role !== null

  const homeUrl = new URL("/", request.url)

  const isAuthRoute = AUTH_ROUTES.some((route) => matches(route, pathname))
  const isPublicRoute = PUBLIC_ROUTES.some((route) => matches(route, pathname))

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(homeUrl)
  }

  if (isProfileRoute(pathname)) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("redirectTo", pathname)
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
  }

  for (const route of ROLE_ROUTES) {
    if (matches(route.prefix, pathname)) {
      if (!isLoggedIn) {
        const loginUrl = new URL("/login", request.url)
        loginUrl.searchParams.set("redirectTo", pathname)
        return NextResponse.redirect(loginUrl)
      }
      if (!route.roles.includes(role)) {
        return NextResponse.redirect(homeUrl)
      }
      return NextResponse.next()
    }
  }

  if (!isLoggedIn && !isPublicRoute && !isAuthRoute) {
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
