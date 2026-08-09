import { Target, Users, Shield, Heart, ArrowRight, Globe, Award, Leaf } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us | GearUp Bangladesh",
  description: "Learn about GearUp — Bangladesh's first peer-to-peer sports and outdoor gear rental marketplace.",
}

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To make sports and outdoor gear accessible to every Bangladeshi — regardless of budget — by building a trusted peer-to-peer rental community.",
    color: "text-blue-600 bg-blue-100 dark:bg-blue-950 dark:text-blue-400",
  },
  {
    icon: Users,
    title: "Community First",
    description: "GearUp is built on trust. Every provider is verified, every transaction is protected, and every review is real. We grow when our community grows.",
    color: "text-green-600 bg-green-100 dark:bg-green-950 dark:text-green-400",
  },
  {
    icon: Shield,
    title: "Safety & Trust",
    description: "With secure Stripe payments, refundable deposits, and damage protection on every rental, we ensure peace of mind for both renters and providers.",
    color: "text-purple-600 bg-purple-100 dark:bg-purple-950 dark:text-purple-400",
  },
  {
    icon: Heart,
    title: "Passion for Sports",
    description: "Born from a love of sports and the outdoors, GearUp helps people in Dhaka, Chittagong, Sylhet, and beyond access the gear they need to stay active.",
    color: "text-orange-600 bg-orange-100 dark:bg-orange-950 dark:text-orange-400",
  },
]

const stats = [
  { value: "10,000+", label: "Active Users", icon: Users },
  { value: "2,500+", label: "Gear Listed", icon: Globe },
  { value: "15,000+", label: "Rentals Completed", icon: Award },
  { value: "64", label: "Districts Covered", icon: Leaf },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24 text-center">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-32 size-[500px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 size-[400px] rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-3xl">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            About GearUp
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Making Sports Gear{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Accessible to All
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            GearUp is Bangladesh&apos;s first peer-to-peer sports and outdoor equipment
            rental platform. We connect people who have gear with people who need it —
            making fitness, adventure, and sports affordable for everyone.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="relative bg-muted/50 px-4 py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <div className="relative mx-auto grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="group rounded-2xl border border-border bg-card p-6 text-center transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
              <stat.icon className="mx-auto mb-3 size-6 text-primary transition-transform duration-300 group-hover:scale-110" />
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-3xl">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Our Story
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            How It All Started
          </h2>
          <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-lg">
              GearUp was founded in 2026 in Dhaka with a simple observation: thousands of
              sports equipment items sit idle in homes across Bangladesh while others
              can&apos;t afford to buy them.
            </p>
            <p>
              A cricket bat used once a month, a camping tent stored in a garage, a bicycle
              ridden only on weekends — all waiting to be used. We built GearUp to bridge
              this gap.
            </p>
            <p>
              Our platform lets anyone list their sports and outdoor gear for rent, and
              anyone can browse and book items at affordable daily rates. From cycling in
              the Ramna Park trails to camping in the hills of Rangamati, GearUp powers
              adventures across Bangladesh.
            </p>
            <p>
              Today, GearUp serves users in Dhaka, Chittagong, Sylhet, Rajshahi, Khulna,
              and across all 64 districts. Whether you&apos;re a student who needs a football
              for a campus tournament, a family planning a Cox&apos;s Bazar camping trip, or
              a fitness enthusiast trying out new equipment — GearUp has you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative bg-muted/50 px-4 py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              Our Values
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              What We{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Stand For
              </span>
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <div className={`mb-4 flex size-12 items-center justify-center rounded-xl ${v.color} transition-transform duration-300 group-hover:scale-110`}>
                  <v.icon className="size-6" />
                </div>
                <h3 className="text-xl font-semibold">{v.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / CTA */}
      <section className="relative px-4 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Join Us
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Built by Sports Enthusiasts
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The GearUp team is a group of developers, athletes, and outdoor lovers based
            in Dhaka. We believe technology can make sports more inclusive and we&apos;re
            building the platform to prove it.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/careers"
              className="group inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-8 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
            >
              Join Our Team
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-border px-8 text-sm font-medium transition-all hover:bg-accent"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
