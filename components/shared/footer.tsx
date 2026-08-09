"use client"

import Link from "next/link"
import { Dumbbell } from "lucide-react"
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6"
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi"

type LinkItem = { label: string; href: string }

const linkColumns: { title: string; links: LinkItem[] }[] = [
  {
    title: "For Customers",
    links: [
      { label: "Browse Gear", href: "/gear" },
      { label: "My Rentals", href: "/dashboard/customer" },
      { label: "Payment History", href: "/dashboard/customer/payments" },
    ],
  },
  {
    title: "For Providers",
    links: [
      { label: "List Your Gear", href: "/register" },
      { label: "Provider Dashboard", href: "/dashboard/provider" },
      { label: "Manage Orders", href: "/dashboard/provider/orders" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Terms & Privacy", href: "/terms" },
    ],
  },
]

const socials = [
  { label: "Facebook", href: "https://facebook.com/gearupbd", Icon: FaFacebookF },
  { label: "Instagram", href: "https://instagram.com/gearupbd", Icon: FaInstagram },
  { label: "X (Twitter)", href: "https://x.com/gearupbd", Icon: FaXTwitter },
  { label: "LinkedIn", href: "https://linkedin.com/company/gearupbd", Icon: FaLinkedinIn },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2.6fr]">
          {/* Brand + contact */}
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
              <Dumbbell className="size-5 text-primary" />
              GearUp<span className="text-primary">.</span>
            </Link>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
              Bangladesh&apos;s first peer-to-peer sports and outdoor gear rental
              marketplace. Rent what you need, earn from what you own — all in one
              trusted platform.
            </p>

            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <FiMapPin className="size-4 shrink-0" />
                House 12, Road 5, Dhanmondi, Dhaka 1205
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="size-4 shrink-0" />
                <a href="mailto:hello@gearup.com.bd" className="hover:text-foreground">
                  hello@gearup.com.bd
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="size-4 shrink-0" />
                <a href="tel:+8801712456789" className="hover:text-foreground">
                  +8801712-456789
                </a>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {linkColumns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="text-sm font-semibold">{col.title}</h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
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
            &copy; {new Date().getFullYear()} GearUp Bangladesh. All rights reserved.
          </p>
          <ul className="flex items-center gap-2">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
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
