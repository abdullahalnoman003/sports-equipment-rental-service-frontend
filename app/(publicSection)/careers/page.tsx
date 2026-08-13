import Image from "next/image"
import Link from "next/link"
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Gift,
  Coffee,
  HeartPulse,
  Plane,
  GraduationCap,
  Star,
  Sparkles,
  Send,
} from "lucide-react"
import type { Metadata } from "next"
import { PageHero } from "@/components/shared/page-hero"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Careers | GearUp Bangladesh",
  description: "Join the GearUp team and help build Bangladesh's leading gear rental platform.",
}

const openings = [
  {
    title: "Full-Stack Developer (Next.js / Node.js)",
    department: "Engineering",
    location: "Dhanmondi, Dhaka (Hybrid)",
    type: "Full-time",
    description: "Build and maintain the GearUp platform using Next.js, TypeScript, and Node.js. Work on real-time features, payment integrations, and API development.",
  },
  {
    title: "UI/UX Designer",
    department: "Design",
    location: "Dhanmondi, Dhaka (Hybrid)",
    type: "Full-time",
    description: "Design intuitive and beautiful user experiences for web and mobile. Create wireframes, prototypes, and design systems that scale.",
  },
  {
    title: "Marketing & Growth Lead",
    department: "Marketing",
    location: "Dhaka (On-site)",
    type: "Full-time",
    description: "Drive user acquisition and brand awareness across Bangladesh. Manage social media, partnerships, and growth campaigns.",
  },
  {
    title: "Customer Support Specialist",
    department: "Operations",
    location: "Remote (Bangladesh)",
    type: "Part-time",
    description: "Help GearUp users with bookings, payments, and issues. Provide excellent support via chat, email, and phone in Bangla and English.",
  },
]

const benefits = [
  { icon: Star, title: "Competitive salary", desc: "Market-leading pay in BDT with review cycles" },
  { icon: Coffee, title: "Flexible work", desc: "Hybrid model with a 5-day work week" },
  { icon: HeartPulse, title: "Health coverage", desc: "Medical insurance for you and your family" },
  { icon: Plane, title: "Gear trips", desc: "Annual sports and outdoor team retreats" },
  { icon: GraduationCap, title: "Learning budget", desc: "Courses, books, and conference access" },
  { icon: Gift, title: "GearUp credits", desc: "Free monthly credits for the platform" },
]

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers at GearUp"
        title={
          <>
            Build the Future of <span className="text-gradient-brand">Gear Rental</span>
          </>
        }
        description="We are on a mission to make sports gear accessible to every Bangladeshi. Join us in Dhaka and help build something meaningful."
      />

      {/* Culture image */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-border shadow-xl shadow-primary/10">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
              alt="The GearUp team collaborating in a bright office"
              width={1600}
              height={500}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="aspect-[3/1] w-full object-cover max-sm:aspect-[4/3]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5 flex items-center gap-3 sm:bottom-8 sm:left-8">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary shadow-lg">
                <Sparkles className="size-6 text-primary-foreground" />
              </div>
              <div className="text-white">
                <p className="text-lg font-bold sm:text-xl">Work hard. Play harder.</p>
                <p className="text-sm text-white/80">A team that lives the sports spirit</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-primary" />
              Perks
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Why Work at <span className="text-gradient-brand">GearUp</span>?
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="group rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                  <b.icon className="size-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold">{b.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Openings */}
      <section className="relative px-4 pb-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-dots-faint [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_50%,transparent_100%)]" />
        </div>
        <div className="relative mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-primary" />
              Openings
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Open Positions
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              We are always looking for talented people who share our passion for sports and
              technology.
            </p>
          </div>

          <div className="space-y-4">
            {openings.map((job) => (
              <div
                key={job.title}
                className="group rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 sm:p-7"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold transition-colors group-hover:text-primary">
                      {job.title}
                    </h3>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        <Briefcase className="size-3.5" />
                        {job.department}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3.5" />
                        {job.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3.5" />
                        {job.type}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {job.description}
                    </p>
                  </div>
                  <a
                    href="mailto:careers@gearup.com.bd"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Apply
                    <ArrowRight className="size-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-card to-gold/10 p-10 text-center sm:p-14">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-16 -top-16 size-56 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 size-56 rounded-full bg-gold/10 blur-3xl" />
          </div>
          <div className="relative">
            <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/15">
              <Send className="size-7 text-primary" />
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Don&apos;t See Your Role?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Send your CV to{" "}
              <a href="mailto:careers@gearup.com.bd" className="font-medium text-primary hover:underline">
                careers@gearup.com.bd
              </a>{" "}
              and we will keep you in mind for future openings.
            </p>
            <Button asChild size="lg" className="mt-7 rounded-xl shadow-lg shadow-primary/20">
              <Link href="mailto:careers@gearup.com.bd">Send your CV</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
