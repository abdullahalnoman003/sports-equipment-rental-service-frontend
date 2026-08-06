"use client"

import { useState } from "react"
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6"
import {
  FiMapPin,
  FiMail,
  FiPhone,
  FiArrowRight,
} from "react-icons/fi"
import { Button } from "@/components/ui/button"

type LinkItem = { label: string; href: string }

const linkColumns: { title: string; links: LinkItem[] }[] = [
  {
    // User type 1: people renting items
    title: "For Renters",
    links: [
      { label: "Browse Rentals", href: "#browse" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Pricing & Deposits", href: "#pricing" },
      { label: "My Bookings", href: "#bookings" },
      { label: "Damage Protection", href: "#protection" },
    ],
  },
  {
    // User type 2: people listing items to rent out
    title: "For Owners",
    links: [
      { label: "List Your Items", href: "#list" },
      { label: "Owner Dashboard", href: "#owner-dashboard" },
      { label: "Payouts & Fees", href: "#payouts" },
      { label: "Inventory Tools", href: "#inventory" },
      { label: "Owner Guidelines", href: "#guidelines" },
    ],
  },
  {
    // User type 3: staff/admins running the shop
    title: "For Admins",
    links: [
      { label: "Admin Console", href: "#admin" },
      { label: "User Management", href: "#users" },
      { label: "Reports & Analytics", href: "#reports" },
      { label: "Disputes & Claims", href: "#disputes" },
      { label: "Platform Settings", href: "#settings" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Contact", href: "#contact" },
      { label: "Careers", href: "#careers" },
      { label: "Help Center", href: "#help" },
      { label: "Terms & Privacy", href: "#legal" },
    ],
  },
]

const socials = [
  { label: "Facebook", href: "#facebook", Icon: FaFacebookF },
  { label: "Instagram", href: "#instagram", Icon: FaInstagram },
  { label: "X (Twitter)", href: "#x", Icon: FaXTwitter },
  { label: "LinkedIn", href: "#linkedin", Icon: FaLinkedinIn },
  { label: "YouTube", href: "#youtube", Icon: FaYoutube },
]

export function Footer() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Demo only — wire this up to your backend later.
    setEmail("")
  }

  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2.6fr]">
          {/* Brand + newsletter */}
          <div className="max-w-sm">
            <a href="#" className="text-xl font-semibold tracking-tight">
              RentEase
            </a>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
              Your neighborhood rental marketplace — rent what you need, earn
              from what you own, all in one trusted platform.
            </p>

            <form onSubmit={handleSubscribe} className="mt-6">
              <label
                htmlFor="footer-newsletter"
                className="text-sm font-medium"
              >
                Stay in the loop
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="footer-newsletter"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                <Button type="submit" aria-label="Subscribe" className="shrink-0">
                  <FiArrowRight className="size-4" />
                </Button>
              </div>
            </form>

            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <FiMapPin className="size-4 shrink-0" />
                123 Market Street, Springfield
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="size-4 shrink-0" />
                <a href="mailto:hello@rentease.com" className="hover:text-foreground">
                  hello@rentease.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="size-4 shrink-0" />
                <a href="tel:+15551234567" className="hover:text-foreground">
                  +1 (555) 123-4567
                </a>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {linkColumns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="text-sm font-semibold">{col.title}</h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col-reverse items-center gap-4 border-t border-border pt-6 sm:flex-row sm:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} RentEase. All rights reserved.
          </p>
          <ul className="flex items-center gap-2">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
