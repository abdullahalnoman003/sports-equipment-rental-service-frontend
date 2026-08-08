"use client"

import { Shield, Clock, CreditCard, Star, Search, Truck } from "lucide-react"

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
      "Rent by the hour, day, week, or month. Select your dates with interactive date pickers — no past dates allowed.",
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
    <section className="relative px-4 py-24" id="features">
      {/* Subtle background accent */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-primary/2 to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Why Choose Us
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Why Rent with{" "}
            <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              GearUp?
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Everything you need for a seamless gear rental experience.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Icon */}
              <div className={`mb-4 flex size-12 items-center justify-center rounded-xl ${feature.color} transition-transform duration-300 group-hover:scale-110`}>
                <feature.icon className="size-6" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-linear-to-r from-primary/0 via-primary to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
