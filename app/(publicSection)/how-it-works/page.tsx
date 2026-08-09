import Link from "next/link"
import { Search, UserCheck, CreditCard, Package, Star, ArrowRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How It Works | GearUp Bangladesh",
  description: "Learn how GearUp works — rent sports gear or list your own in three simple steps.",
}

const renterSteps = [
  {
    step: 1,
    icon: Search,
    title: "Browse & Find Gear",
    description: "Search thousands of sports and outdoor items by category, brand, price, or location. Use filters to narrow down exactly what you need.",
  },
  {
    step: 2,
    icon: UserCheck,
    title: "Select Dates & Book",
    description: "Pick your rental start and end dates using the interactive date picker. Review the total cost and click 'Rent Now' to confirm.",
  },
  {
    step: 3,
    icon: CreditCard,
    title: "Pay & Pick Up",
    description: "After the provider confirms, pay securely via Stripe, bKash, or Nagad. Pick up the gear from the provider or arrange delivery.",
  },
  {
    step: 4,
    icon: Star,
    title: "Use, Return & Review",
    description: "Enjoy your rented gear! When done, return it to the provider. Leave a rating and review to help the community.",
  },
]

const providerSteps = [
  {
    step: 1,
    icon: Package,
    title: "List Your Gear",
    description: "Register as a Provider and add your gear to the marketplace. Set your price per day, quantity, and category.",
  },
  {
    step: 2,
    icon: UserCheck,
    title: "Receive Orders",
    description: "Customers browse and request your gear. You get notified of new rental requests in your Provider Dashboard.",
  },
  {
    step: 3,
    icon: CreditCard,
    title: "Confirm & Hand Over",
    description: "Review the request, click 'Confirm', and arrange pickup or delivery. Payment is processed automatically after confirmation.",
  },
]

const rentalStatuses = [
  { status: "PLACED", color: "bg-yellow-100 text-yellow-700", description: "Customer has requested the rental. Provider needs to confirm." },
  { status: "CONFIRMED", color: "bg-blue-100 text-blue-700", description: "Provider accepted. Customer can now proceed to payment." },
  { status: "PAID", color: "bg-purple-100 text-purple-700", description: "Payment completed. Awaiting gear pickup." },
  { status: "PICKED_UP", color: "bg-green-100 text-green-700", description: "Customer has the gear. Rental period is active." },
  { status: "RETURNED", color: "bg-gray-100 text-gray-600", description: "Gear returned. Customer can leave a review." },
  { status: "CANCELED", color: "bg-red-100 text-red-700", description: "Rental was cancelled by either party." },
]

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="px-4 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">How It Works</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Renting Made <span className="text-primary">Simple</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Whether you want to rent gear or list your own, GearUp makes it easy.
            Here&apos;s how the platform works.
          </p>
        </div>
      </section>

      {/* Renter Journey */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-2xl font-bold tracking-tight">
            For Customers: Rent Gear in 4 Steps
          </h2>
          <div className="space-y-6">
            {renterSteps.map((s) => (
              <div key={s.step} className="flex gap-5 rounded-xl border border-border bg-card p-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="size-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Step {s.step}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Provider Journey */}
      <section className="bg-muted px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-2xl font-bold tracking-tight">
            For Providers: Earn in 3 Steps
          </h2>
          <div className="space-y-6">
            {providerSteps.map((s) => (
              <div key={s.step} className="flex gap-5 rounded-xl border border-border bg-card p-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="size-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Step {s.step}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rental Statuses */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-3 text-center text-2xl font-bold tracking-tight">
            Understanding Rental Status
          </h2>
          <p className="mb-8 text-center text-muted-foreground">
            Every rental goes through these stages. Track them in your dashboard.
          </p>
          <div className="space-y-3">
            {rentalStatuses.map((s, i) => (
              <div key={s.status} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${s.color}`}>
                  {s.status}
                </span>
                {i < rentalStatuses.length - 1 && (
                  <ArrowRight className="hidden size-4 shrink-0 text-muted-foreground sm:block" />
                )}
                <p className="text-sm text-muted-foreground">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-3xl rounded-2xl bg-primary px-8 py-12 text-center text-primary-foreground">
          <h2 className="text-2xl font-bold tracking-tight">Ready to Get Started?</h2>
          <p className="mt-2 text-primary-foreground/80">
            Join thousands of Bangladeshis already using GearUp.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href="/register" className="inline-flex h-10 items-center rounded-md bg-secondary px-6 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/90">
              Sign Up Free
            </Link>
            <Link href="/gear" className="inline-flex h-10 items-center rounded-md border border-primary-foreground/30 px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10">
              Browse Gear
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
