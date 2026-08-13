import Image from "next/image"
import Link from "next/link"
import {
  Target,
  Users,
  ShieldCheck,
  Heart,
  ArrowRight,
  Globe,
  Award,
  Leaf,
  Sparkles,
  Quote,
} from "lucide-react"
import type { Metadata } from "next"
import { PageHero } from "@/components/shared/page-hero"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About Us | GearUp Bangladesh",
  description: "Learn about GearUp, Bangladesh's first peer-to-peer sports and outdoor gear rental marketplace.",
}

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To make sports and outdoor gear accessible to every Bangladeshi, regardless of budget, by building a trusted peer-to-peer rental community.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "GearUp is built on trust. Every provider is verified, every transaction is protected, and every review is real. We grow when our community grows.",
  },
  {
    icon: ShieldCheck,
    title: "Safety & Trust",
    description:
      "With secure Stripe payments and damage protection on every rental, we ensure peace of mind for both renters and providers.",
  },
  {
    icon: Heart,
    title: "Passion for Sports",
    description:
      "Born from a love of sports and the outdoors, GearUp helps people in Dhaka, Chittagong, Sylhet, and beyond access the gear they need to stay active.",
  },
]

const stats = [
  { value: "10,000+", label: "Active Users", icon: Users },
  { value: "2,500+", label: "Gear Listed", icon: Globe },
  { value: "15,000+", label: "Rentals Completed", icon: Award },
  { value: "64", label: "Districts Covered", icon: Leaf },
]

const milestones = [
  {
    year: "2024",
    title: "The idea is born",
    description: "GearUp is founded in Dhaka with a simple observation: thousands of sports items sit idle while others cannot afford them.",
  },
  {
    year: "2025",
    title: "First rentals",
    description: "Our first 500 users join. Camping tents, bicycles, and cricket bats become the most-loved categories.",
  },
  {
    year: "2026",
    title: "Across Bangladesh",
    description: "GearUp now serves all 64 districts with 2,500+ gear items listed by trusted local providers.",
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About GearUp"
        title={
          <>
            Making Sports Gear{" "}
            <span className="text-gradient-brand">Accessible to All</span>
          </>
        }
        description="GearUp is Bangladesh's first peer-to-peer sports and outdoor equipment rental platform. We connect people who have gear with people who need it, making fitness, adventure, and sports affordable for everyone."
      />

      {/* Stats */}
      <section className="relative px-4 pb-20">
        <div className="relative mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group rounded-3xl border border-border bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 sm:p-8"
            >
              <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                <stat.icon className="size-6 text-primary" />
              </span>
              <p className="text-3xl font-bold tracking-tight text-gradient-brand">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story with image */}
      <section className="px-4 pb-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-gradient-to-br from-primary/15 via-transparent to-gold/10 blur-2xl" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border shadow-2xl shadow-primary/10">
              <Image
                src="https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80"
                alt="Sports equipment like a football, racket and bicycle arranged for rent"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-foreground shadow-lg backdrop-blur-sm">
                <Sparkles className="size-4 text-primary" />
                Founded in Dhaka, 2024
              </div>
            </div>

            <div className="absolute -right-4 -top-6 hidden rounded-2xl border border-border bg-card/95 p-4 shadow-xl backdrop-blur-sm sm:block animate-float">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-gold/15">
                  <Quote className="size-5 fill-gold text-gold" />
                </span>
                <div>
                  <p className="text-sm font-bold leading-none">15,000+</p>
                  <p className="mt-1 text-xs text-muted-foreground">rentals completed</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-primary" />
              Our Story
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              How It All Started
            </h2>
            <div className="mt-6 space-y-5 leading-relaxed text-muted-foreground">
              <p>
                GearUp was founded in Dhaka with a simple observation: thousands of sports
                equipment items sit idle in homes across Bangladesh while others can&apos;t
                afford to buy them.
              </p>
              <p>
                A cricket bat used once a month, a camping tent stored in a garage, a bicycle
                ridden only on weekends, all waiting to be used. We built GearUp to bridge
                this gap.
              </p>
              <p>
                Today, GearUp serves users in Dhaka, Chittagong, Sylhet, Rajshahi, Khulna, and
                across all 64 districts. Whether you&apos;re a student who needs a football for
                a campus tournament, or a family planning a Cox&apos;s Bazar camping trip,
                GearUp has you covered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-primary" />
              The Journey
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Milestones on the way
            </h2>
          </div>

          <div className="relative space-y-8 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-border sm:before:left-1/2">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className={`relative flex flex-col gap-4 pl-12 sm:w-1/2 sm:pl-0 ${
                  i % 2 === 0
                    ? "sm:pr-12 sm:text-right"
                    : "sm:ml-auto sm:pl-12"
                }`}
              >
                <span
                  className={`absolute left-4 top-1 flex size-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-card shadow-md shadow-primary/20 sm:top-2 ${
                    i % 2 === 0 ? "sm:left-full" : "sm:left-0"
                  }`}
                >
                  <span className="size-2.5 rounded-full bg-primary" />
                </span>
                <div className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
                  <span className="text-sm font-bold uppercase tracking-widest text-primary">
                    {m.year}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold">{m.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative px-4 py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-dots-faint [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_50%,transparent_100%)]" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-primary" />
              Our Values
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              What We <span className="text-gradient-brand">Stand For</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Four principles guide every decision we make, from product design to community support.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {values.map((v) => (
              <div
                key={v.title}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/10" />
                <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <v.icon className="size-7" />
                </span>
                <h3 className="mt-5 text-xl font-bold">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-card to-gold/10 p-10 text-center sm:p-14">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-16 -top-16 size-56 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 size-56 rounded-full bg-gold/10 blur-3xl" />
          </div>
          <div className="relative">
            <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/15">
              <Users className="size-7 text-primary" />
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Built by Sports Enthusiasts
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              The GearUp team is a group of developers, athletes, and outdoor lovers based in
              Dhaka. We believe technology can make sports more inclusive, and we are building
              the platform to prove it.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="group gap-2 rounded-xl shadow-lg shadow-primary/20">
                <Link href="/careers">
                  Join Our Team
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
