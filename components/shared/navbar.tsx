"use client"

import { useRef, useState } from "react"
import { LayoutDashboard, LogOut, User } from "lucide-react"

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

// Demo navigation links — replace hrefs/labels with your real routes later.
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
]

// Demo user — wire this up to your real auth/session later.
const DEMO_USER = {
  name: "Jane Doe",
  email: "jane@example.com",
  avatar: "",
}

export function Navbar() {
  // Demo auth state. Swap this for your real session check later.
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  // Controls the hover-triggered profile menu.
  const [menuOpen, setMenuOpen] = useState(false)
  // Small delay so moving the cursor across the gap to the menu doesn't close it.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setMenuOpen(true)
  }

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setMenuOpen(false), 120)
  }

  const initials = DEMO_USER.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Left: text logo */}
        <a
          href="#home"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          Acme<span className="text-primary">.</span>
        </a>

        {/* Middle: nav links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right: conditional auth area */}
        <div className="flex items-center gap-2">
          {/* Demo toggle so you can preview both states. Remove later. */}
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground"
            onClick={() => setIsLoggedIn((prev) => !prev)}
          >
            {isLoggedIn ? "Demo: log out" : "Demo: log in"}
          </Button>

          {isLoggedIn ? (
            <DropdownMenu
              open={menuOpen}
              onOpenChange={setMenuOpen}
              modal={false}
            >
              <div onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
                <DropdownMenuTrigger
                  className="rounded-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-label="Open profile menu"
                >
                  <Avatar className="size-9 border border-border">
                    <AvatarImage
                      src={DEMO_USER.avatar || "/placeholder.svg"}
                      alt={DEMO_USER.name}
                    />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  sideOffset={4}
                  className="w-56"
                  onMouseEnter={openMenu}
                  onMouseLeave={scheduleClose}
                  onCloseAutoFocus={(e) => e.preventDefault()}
                >
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium">
                        {DEMO_USER.name}
                      </span>
                      <span className="text-xs font-normal text-muted-foreground">
                        {DEMO_USER.email}
                      </span>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <a href="#dashboard">
                      <LayoutDashboard className="size-4" />
                      Dashboard
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <a href="#profile">
                      <User className="size-4" />
                      Profile
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    className="cursor-pointer"
                    onClick={() => setIsLoggedIn(false)}
                  >
                    <LogOut className="size-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </div>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <a href="#signin">Sign in</a>
              </Button>
              <Button asChild>
                <a href="#signup">Sign up</a>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
