"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Lock, ShieldCheck } from "lucide-react"
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6"
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi"
import { Logo } from "@/components/shared/logo"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type LinkItem = { label: string; href: string }

const linkColumns: { title: string; links: LinkItem[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Browse Gear", href: "/gear" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Help Center", href: "/help" },
      { label: "About Us", href: "/about" },
    ],
  },
  {
    title: "Get Started",
    links: [
      { label: "Sign In", href: "/login" },
      { label: "Create Account", href: "/register" },
      { label: "Become a Provider", href: "/register" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Terms & Privacy", href: "/terms" },
      { label: "Support", href: "mailto:support@gearup.com.bd" },
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
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail("")
    setTimeout(() => setSubscribed(false), 4000)
  }

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1.5fr_1.2fr]">
          {/* Brand + contact */}
          <div className="max-w-sm">
            <Link href="/" aria-label="GearUp home">
              <Logo />
            </Link>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
              Bangladesh&apos;s peer-to-peer sports and outdoor gear rental
              marketplace. Rent what you need, earn from what you own, all in one
              trusted platform.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FiMapPin className="size-4" />
                </span>
                House 12, Road 5, Dhanmondi, Dhaka 1205
              </li>
              <li className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FiMail className="size-4" />
                </span>
                <a href="mailto:hello@gearup.com.bd" className="transition-colors hover:text-foreground">
                  hello@gearup.com.bd
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FiPhone className="size-4" />
                </span>
                <a href="tel:+8801712456789" className="transition-colors hover:text-foreground">
                  +8801712-456789
                </a>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {linkColumns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-3" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Newsletter */}
          <div className="lg:justify-self-end lg:max-w-sm">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Stay in the loop
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Get rental tips, new gear drops, and seasonal offers straight to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="mt-5">
              <div className="flex gap-2">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-10 rounded-full"
                  aria-label="Email address"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="size-10 shrink-0 rounded-full"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight className="size-4" />
                </Button>
              </div>
              {subscribed && (
                <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-primary">
                  <CheckCircle2 className="size-3.5" />
                  Subscribed! Check your inbox soon.
                </p>
              )}
            </form>

            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-border bg-background/50 px-4 py-3">
              <Lock className="size-4 shrink-0 text-primary" />
              <p className="text-xs text-muted-foreground">
                Secure payments powered by Stripe
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col-reverse items-center gap-5 border-t border-border pt-6 sm:flex-row sm:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} GearUp Bangladesh. All rights reserved.
          </p>

          <ul className="flex items-center gap-2.5">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
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
