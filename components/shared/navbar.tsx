"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"
import { LayoutDashboard, LogOut, User, Shield, Store, Sun, Moon, Monitor, Menu, X, ChevronRight } from "lucide-react"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/shared/logo"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/shared/theme-provider"
import { logout } from "@/service/logout"
import { cn } from "@/lib/utils"
import type { ApiResponse, UserProfile } from "@/lib/types"

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Browse Gear", href: "/gear" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

const ROLE_DASHBOARD: Record<string, { label: string; href: string; icon: typeof LayoutDashboard }> = {
  CUSTOMER: { label: "My Rentals", href: "/dashboard/customer", icon: LayoutDashboard },
  PROVIDER: { label: "Provider Dashboard", href: "/dashboard/provider", icon: Store },
  ADMIN: { label: "Admin Dashboard", href: "/dashboard/admin", icon: Shield },
}

const THEME_OPTIONS = [
  { value: "light" as const, label: "Light", icon: Sun },
  { value: "dark" as const, label: "Dark", icon: Moon },
  { value: "system" as const, label: "System", icon: Monitor },
]

export function Navbar({ user }: { user: ApiResponse<UserProfile> | null }) {
  const router = useRouter()
  const pathname = usePathname()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isLoggedIn = user?.success ?? false
  const profile = user?.data
  const dashboard = profile ? ROLE_DASHBOARD[profile.role] : null

  const initials = profile?.name
    ? profile.name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()
    : "?"

  const handleLogout = async () => {
    await logout()
    toast.success("Logged out successfully!")
    router.push("/login")
    setMobileOpen(false)
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const navLinkClass = (href: string) =>
    cn(
      "rounded-full px-4 py-2 text-sm font-medium transition-all",
      isActive(href)
        ? "bg-primary/10 text-primary shadow-sm"
        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
    )

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/75 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
          aria-label="GearUp home"
        >
          <span className="transition-transform duration-300 group-hover:rotate-12">
            <Logo showText={false} className="size-9" />
          </span>
          <span className="text-lg font-bold tracking-tight text-foreground">
            GearUp<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={navLinkClass(link.href)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop auth area */}
        <div className="hidden items-center gap-2 lg:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-9 rounded-full"
                aria-label="Change theme"
              >
                {resolvedTheme === "dark" ? (
                  <Moon className="size-4" />
                ) : (
                  <Sun className="size-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8}>
              {THEME_OPTIONS.map((opt) => (
                <DropdownMenuItem
                  key={opt.value}
                  onClick={() => setTheme(opt.value)}
                  className={theme === opt.value ? "bg-accent" : ""}
                >
                  <opt.icon className="size-4" />
                  {opt.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {isLoggedIn && profile ? (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger
                className="rounded-full outline-none ring-offset-background transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Open profile menu"
              >
                <Avatar className="size-9 border-2 border-primary/20 transition-transform hover:scale-105">
                  <AvatarImage src={profile.profile?.profile_picture || ""} alt={profile.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8} className="w-60 rounded-2xl">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold">{profile.name}</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      {profile.email}
                    </span>
                    <span className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      <span className="size-1.5 rounded-full bg-primary" />
                      {profile.role}
                    </span>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                {dashboard && (
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href={dashboard.href}>
                      <dashboard.icon className="size-4" />
                      {dashboard.label}
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/profile">
                    <User className="size-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild className="rounded-full">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild className="rounded-full shadow-sm shadow-primary/20 hover:shadow-md hover:shadow-primary/30">
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="size-10 rounded-full lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl transition-all duration-300 lg:hidden",
          mobileOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0 border-t-0"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    isActive(link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {link.label}
                  <ChevronRight className="size-4 opacity-50" />
                </Link>
              </li>
            ))}
            {isLoggedIn && dashboard && (
              <li>
                <Link
                  href={dashboard.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  {dashboard.label}
                  <ChevronRight className="size-4 opacity-50" />
                </Link>
              </li>
            )}
          </ul>

          <div className="mt-4 border-t border-border pt-4">
            {isLoggedIn && profile ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-2">
                  <Avatar className="size-10 border border-border">
                    <AvatarImage src={profile.profile?.profile_picture || ""} alt={profile.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{profile.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{profile.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" asChild className="rounded-full">
                    <Link href="/profile" onClick={() => setMobileOpen(false)}>
                      <User className="size-4" />
                      Profile
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    className="rounded-full"
                    onClick={handleLogout}
                  >
                    <LogOut className="size-4" />
                    Log out
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" asChild className="flex-1 rounded-full">
                  <Link href="/login" onClick={() => setMobileOpen(false)}>Sign in</Link>
                </Button>
                <Button asChild className="flex-1 rounded-full">
                  <Link href="/register" onClick={() => setMobileOpen(false)}>Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
