"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  CreditCard,
  User,
  LogOut,
  Store,
  Shield,
  Menu,
  X,
  Info,
  Phone,
  HelpCircle,
  FileText,
  BookOpen,
} from "lucide-react"
import { logout } from "@/service/logout"
import toast from "react-hot-toast"

interface SidebarLink {
  label: string
  href: string
  icon: typeof LayoutDashboard
}

const customerLinks: SidebarLink[] = [
  { label: "Overview", href: "/dashboard/customer", icon: LayoutDashboard },
  { label: "My Rentals", href: "/dashboard/customer/orders", icon: Package },
  { label: "Payments", href: "/dashboard/customer/payments", icon: CreditCard },
  { label: "Profile", href: "/profile", icon: User },
]

const providerLinks: SidebarLink[] = [
  { label: "Overview", href: "/dashboard/provider", icon: LayoutDashboard },
  { label: "My Gear", href: "/dashboard/provider/gear", icon: Package },
  { label: "Orders", href: "/dashboard/provider/orders", icon: CreditCard },
  { label: "Profile", href: "/profile", icon: User },
]

const adminLinks: SidebarLink[] = [
  { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Users", href: "/dashboard/admin/users", icon: User },
  { label: "All Gear", href: "/dashboard/admin/gear", icon: Package },
  { label: "Rentals", href: "/dashboard/admin/rentals", icon: CreditCard },
  { label: "Categories", href: "/dashboard/admin/categories", icon: LayoutDashboard },
]

const staticLinks: SidebarLink[] = [
  { label: "About", href: "/dashboard/about", icon: Info },
  { label: "Contact", href: "/dashboard/contact", icon: Phone },
  { label: "How It Works", href: "/dashboard/how-it-works", icon: BookOpen },
  { label: "Help Center", href: "/dashboard/help", icon: HelpCircle },
  { label: "Terms", href: "/dashboard/terms", icon: FileText },
]

const roleIcons = { CUSTOMER: Package, PROVIDER: Store, ADMIN: Shield }
const roleLabels = { CUSTOMER: "Customer", PROVIDER: "Provider", ADMIN: "Admin" }

export function DashboardLayout({
  role = "CUSTOMER",
  children,
}: {
  role?: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const links = role === "ADMIN" ? adminLinks : role === "PROVIDER" ? providerLinks : customerLinks
  const RoleIcon = roleIcons[role as keyof typeof roleIcons] ?? Package
  const roleLabel = roleLabels[role as keyof typeof roleLabels] ?? role

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  const handleLogout = async () => {
    setMobileOpen(false)
    await logout()
    toast.success("Logged out successfully!")
    router.push("/login")
  }

  const closeMobile = () => setMobileOpen(false)

  const navContent = (
    <>
      <div className="flex items-center gap-2 border-b border-border px-4 py-4">
        <RoleIcon className="size-5 text-primary" />
        <span className="text-sm font-semibold">{roleLabel} Dashboard</span>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <div className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Menu
        </div>
        <div className="space-y-0.5">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <link.icon className="size-4 shrink-0" />
                {link.label}
              </Link>
            )
          })}
        </div>

        <div className="my-3 h-px bg-border" />

        <div className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Explore
        </div>
        <div className="space-y-0.5">
          {staticLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <link.icon className="size-4 shrink-0" />
                {link.label}
              </Link>
            )
          })}
        </div>
      </nav>

      <div className="border-t border-border p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="size-4 shrink-0" />
          Log out
        </button>
      </div>
    </>
  )

  return (
    <div className="flex h-full overflow-hidden bg-background">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={closeMobile}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border bg-card transition-transform duration-200 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <div className="flex items-center gap-2">
            <RoleIcon className="size-5 text-primary" />
            <span className="text-sm font-semibold">{roleLabel} Dashboard</span>
          </div>
          <button
            onClick={closeMobile}
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>
        {navContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card lg:flex">
        {navContent}
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile top bar */}
        <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-3 lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex size-9 items-center justify-center rounded-lg border border-border hover:bg-accent"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
          <div className="flex items-center gap-2">
            <RoleIcon className="size-4 text-primary" />
            <span className="text-sm font-semibold">{roleLabel}</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
