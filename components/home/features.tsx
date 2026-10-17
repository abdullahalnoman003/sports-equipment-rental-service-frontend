"use client"

import { Shield, Clock, CreditCard, Star, Search, Truck } from "lucide-react"
import { SectionHeading } from "@/components/shared/page-hero"
import { Section } from "@/components/shared/section"
import { brandBorder, brandTint } from "@/lib/brand"

const features = [
  {
    icon: Search,
    title: "Smart Search & Filters",
    description:
      "Find exactly what you need by category, price, brand, or availability. Real-time filtering as you browse.",
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description:
      "All payments are processed through Stripe. Deposits and damage protection keep every rental safe.",
  },
  {
    icon: Clock,
    title: "Flexible Rental Periods",
    description:
      "Rent by the hour, day, week, or month. Select your dates with interactive date pickers, no past dates allowed.",
  },
  {
    icon: CreditCard,
    title: "Easy Online Payments",
    description:
      "Pay securely with credit cards via Stripe Checkout. Track your full payment history in your dashboard.",
  },
  {
    icon: Star,
    title: "Verified Reviews & Ratings",
    description:
      "Read real reviews from customers who have rented the gear. Leave feedback after every rental is returned.",
  },
  {
    icon: Truck,
    title: "Local Provider Network",
    description:
      "Browse gear from trusted providers in your area. Support local businesses while getting the equipment you need.",
  },
]

export function Features() {
  return (
    <Section id="features" tone="plain">
      <SectionHeading
        eyebrow="Why Choose Us"
        title={
          <>
            Everything You Need for a{" "}
            <span className="text-gradient-brand">Seamless Rental</span>
          </>
        }
        description="From secure payments to verified providers, we have built the platform around your peace of mind."
      />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <div
            key={feature.title}
            className={`group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 animate-fade-up ${brandBorder(i)} hover:border-primary/40`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-primary/5 blur-2xl transition-all duration-500 group-hover:bg-primary/10" />

            <div
              className={`mb-5 flex size-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 ${brandTint(i)}`}
            >
              <feature.icon className="size-6" />
            </div>

            <h3 className="text-lg font-bold">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {feature.description}
            </p>

            <div className="absolute bottom-0 left-7 right-7 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary to-gold transition-transform duration-500 group-hover:scale-x-100" />
          </div>
        ))}
      </div>
    </Section>
  )
}
