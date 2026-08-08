"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Dumbbell, LayoutDashboard, LogOut, User, Shield, Store, Sun, Moon, Monitor } from "lucide-react"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
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
import type { ApiResponse, UserProfile } from "@/lib/types"

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Browse Gear", href: "/gear" },
  { label: "Categories", href: "/gear#categories" },
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
  const { theme, setTheme, resolvedTheme } = useTheme()

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
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground transition-opacity hover:opacity-80">
          <Dumbbell className="size-5 text-primary" />
          GearUp<span className="text-primary">.</span>
        </Link>

        {/* Nav links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth area */}
        <div className="flex items-center gap-1.5">
          {/* Theme changer */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-9" aria-label="Change theme">
                {resolvedTheme === "dark" ? (
                  <Moon className="size-4" />
                ) : (
                  <Sun className="size-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={4}>
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
                className="rounded-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Open profile menu"
              >
                <Avatar className="size-9 border border-border">
                  <AvatarImage src={profile.profile?.profile_picture || ""} alt={profile.name} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={4} className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">{profile.name}</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      {profile.email}
                    </span>
                    <span className="mt-1 inline-flex w-fit items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
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
              <Button variant="ghost" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
