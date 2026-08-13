import Link from "next/link"
import Image from "next/image"
import {
  Search,
  UserCheck,
  CreditCard,
  Package,
  Star,
  ArrowRight,
  Rocket,
  Store,
  CheckCircle2,
} from "lucide-react"
import type { Metadata } from "next"
import { PageHero } from "@/components/shared/page-hero"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how GearUp works — rent sports gear in four simple steps or list your own equipment and start earning in three.",
  alternates: { canonical: "/how-it-works" },
}

const renterSteps = [
  {
    step: 1,
    icon: Search,
    title: "Browse & Find Gear",
    description:
      "Search thousands of sports and outdoor items by category, brand, price, or location. Use filters to narrow down exactly what you need.",
  },
  {
    step: 2,
    icon: UserCheck,
    title: "Select Dates & Book",
    description:
      "Pick your rental start and end dates using the interactive date picker. Review the total cost and click 'Rent Now' to confirm.",
  },
  {
    step: 3,
    icon: CreditCard,
    title: "Pay & Pick Up",
    description:
      "After the provider confirms, pay securely via Stripe. Pick up the gear from the provider or arrange delivery.",
  },
  {
    step: 4,
    icon: Star,
    title: "Use, Return & Review",
    description:
      "Enjoy your rented gear! When done, return it to the provider. Leave a rating and review to help the community.",
  },
]

const providerSteps = [
  {
    step: 1,
    icon: Package,
    title: "List Your Gear",
    description:
      "Register as a Provider and add your gear to the marketplace. Set your price per day, quantity, and category.",
  },
  {
    step: 2,
    icon: UserCheck,
    title: "Receive Orders",
    description:
      "Customers browse and request your gear. You get notified of new rental requests in your Provider Dashboard.",
  },
  {
    step: 3,
    icon: CreditCard,
    title: "Confirm & Hand Over",
    description:
      "Review the request, click 'Confirm', and arrange pickup or delivery. Payment is processed automatically after confirmation.",
  },
]

const rentalStatuses = [
  { status: "PLACED", dot: "bg-yellow-500", badge: "bg-yellow-100 text-yellow-700", description: "Customer has requested the rental. Provider needs to confirm." },
  { status: "CONFIRMED", dot: "bg-blue-500", badge: "bg-blue-100 text-blue-700", description: "Provider accepted. Customer can now proceed to payment." },
  { status: "PAID", dot: "bg-purple-500", badge: "bg-purple-100 text-purple-700", description: "Payment completed. Awaiting gear pickup." },
  { status: "PICKED_UP", dot: "bg-green-500", badge: "bg-green-100 text-green-700", description: "Customer has the gear. Rental period is active." },
  { status: "RETURNED", dot: "bg-gray-500", badge: "bg-gray-100 text-gray-600", description: "Gear returned. Customer can leave a review." },
  { status: "CANCELED", dot: "bg-red-500", badge: "bg-red-100 text-red-700", description: "Rental was cancelled by either party." },
]

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How It Works"
        title={
          <>
            Renting Made <span className="text-gradient-brand">Simple</span>
          </>
        }
        description="Whether you want to rent gear or list your own, GearUp makes it easy. Here is how the platform works."
      />

      {/* Renter Journey */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-primary" />
              For Customers
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Rent Gear in <span className="text-gradient-brand">4 Easy Steps</span>
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {renterSteps.map((s) => (
              <div
                key={s.step}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="pointer-events-none absolute -right-6 -top-6 size-20 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/10" />
                <div className="relative flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                    <s.icon className="size-6" />
                  </span>
                  <span className="text-5xl font-bold text-muted/40 transition-colors group-hover:text-primary/20">
                    {s.step}
                  </span>
                </div>
                <h3 className="relative mt-5 text-lg font-bold">{s.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Provider Journey */}
      <section className="relative px-4 py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-dots-faint [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_50%,transparent_100%)]" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-primary" />
              For Providers
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Earn in <span className="text-gradient-brand">3 Simple Steps</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Turn idle gear into income. List your equipment once and start receiving
              rental requests from customers across Bangladesh.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {providerSteps.map((s) => (
              <div
                key={s.step}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="pointer-events-none absolute -right-6 -top-6 size-20 rounded-full bg-gold/10 blur-2xl transition-all group-hover:bg-gold/20" />
                <span className="relative flex size-12 items-center justify-center rounded-2xl bg-gold/15 transition-all duration-300 group-hover:scale-110">
                  <s.icon className="size-6 text-gold" />
                </span>
                <h3 className="relative mt-5 text-lg font-bold">{s.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
                <span className="relative mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                  Step {s.step}
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual split */}
      <section className="px-4 pb-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-gradient-to-br from-gold/10 via-transparent to-primary/10 blur-2xl" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border shadow-2xl shadow-primary/10">
              <Image
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80"
                alt="Two friends playing with dogs in a park"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-white/90 px-5 py-3 shadow-lg backdrop-blur-sm">
                <div>
                  <p className="text-sm font-bold">Ready when you are</p>
                  <p className="text-xs text-muted-foreground">Book today, play tomorrow</p>
                </div>
                <CheckCircle2 className="size-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
              <Rocket className="size-3.5" />
              Get started
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Your next adventure is <span className="text-gradient-brand">one step away</span>
            </h2>
            <ul className="mt-6 space-y-4">
              {[
                "Instant booking with secure Stripe payments",
                "Verified providers across all 64 districts",
                "Damage protection on every single rental",
                "Flexible daily, weekly, and monthly rates",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <CheckCircle2 className="size-4 text-primary" />
                  </span>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="group gap-2 rounded-xl shadow-lg shadow-primary/20">
                <Link href="/register">
                  Sign Up Free
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl">
                <Link href="/gear">
                  <Store className="size-4" />
                  Browse Gear
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Rental Statuses */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-primary" />
              Statuses
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Understanding Rental Status
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Every rental goes through these stages. Track them live from your dashboard.
            </p>
          </div>

          <div className="space-y-3">
            {rentalStatuses.map((s, i) => (
              <div
                key={s.status}
                className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 sm:flex-row sm:items-center sm:gap-5"
              >
                <span className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold ${s.badge}`}>
                  <span className={`size-1.5 rounded-full ${s.dot}`} />
                  {s.status}
                </span>
                {i < rentalStatuses.length - 1 && (
                  <ArrowRight className="hidden size-4 shrink-0 text-muted-foreground/50 sm:block" />
                )}
                <p className="text-sm text-muted-foreground sm:pl-2">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
