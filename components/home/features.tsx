"use client"

import { Shield, Clock, CreditCard, Star, Search, Truck } from "lucide-react"
import { SectionHeading } from "@/components/shared/page-hero"

const features = [
  {
    icon: Search,
    title: "Smart Search & Filters",
    description:
      "Find exactly what you need by category, price, brand, or availability. Real-time filtering as you browse.",
    color: "text-blue-600 bg-blue-100 dark:bg-blue-950 dark:text-blue-400",
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description:
      "All payments are processed through Stripe. Deposits and damage protection keep every rental safe.",
    color: "text-green-600 bg-green-100 dark:bg-green-950 dark:text-green-400",
  },
  {
    icon: Clock,
    title: "Flexible Rental Periods",
    description:
      "Rent by the hour, day, week, or month. Select your dates with interactive date pickers, no past dates allowed.",
    color: "text-purple-600 bg-purple-100 dark:bg-purple-950 dark:text-purple-400",
  },
  {
    icon: CreditCard,
    title: "Easy Online Payments",
    description:
      "Pay securely with credit cards via Stripe Checkout. Track your full payment history in your dashboard.",
    color: "text-orange-600 bg-orange-100 dark:bg-orange-950 dark:text-orange-400",
  },
  {
    icon: Star,
    title: "Verified Reviews & Ratings",
    description:
      "Read real reviews from customers who have rented the gear. Leave feedback after every rental is returned.",
    color: "text-yellow-600 bg-yellow-100 dark:bg-yellow-950 dark:text-yellow-400",
  },
  {
    icon: Truck,
    title: "Local Provider Network",
    description:
      "Browse gear from trusted providers in your area. Support local businesses while getting the equipment you need.",
    color: "text-primary bg-primary/10",
  },
]

export function Features() {
  return (
    <section className="relative px-4 py-20 sm:py-24" id="features">
      <div className="mx-auto max-w-7xl">
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
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-primary/5 blur-2xl transition-all duration-500 group-hover:bg-primary/10" />

              <div className={`mb-5 flex size-12 items-center justify-center rounded-2xl ${feature.color} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
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
      </div>
    </section>
  )
}
