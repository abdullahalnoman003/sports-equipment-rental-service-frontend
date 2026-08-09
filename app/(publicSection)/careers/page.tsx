import { Briefcase, MapPin, Clock, ChevronRight } from "lucide-react"
import type { Metadata } from "next"

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
  "Competitive salary in BDT",
  "Flexible hybrid work model",
  "Health insurance coverage",
  "Annual sports & outdoor trips",
  "Learning & development budget",
  "Free GearUp credits monthly",
  "Stock options (early employees)",
  "5-day work week (Sat - Wed)",
]

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="px-4 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">Join Our Team</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Build the Future of <span className="text-primary">Gear Rental</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            We&apos;re on a mission to make sports gear accessible to every Bangladeshi.
            Join us in Dhaka and help build something meaningful.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-muted px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight">Why Work at GearUp?</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b} className="rounded-lg border border-border bg-card px-4 py-3 text-center text-sm font-medium">
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Openings */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-2xl font-bold tracking-tight">Open Positions</h2>
          <p className="mb-8 text-muted-foreground">
            We&apos;re always looking for talented people who share our passion for sports and technology.
          </p>
          <div className="space-y-4">
            {openings.map((job) => (
              <div
                key={job.title}
                className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-primary">{job.title}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="size-3.5" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3.5" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5" />
                        {job.type}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{job.description}</p>
                  </div>
                  <a
                    href="mailto:careers@gearup.com.bd"
                    className="shrink-0 inline-flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
                  >
                    Apply <ChevronRight className="size-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-3xl rounded-2xl bg-muted px-8 py-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Don&apos;t See Your Role?</h2>
          <p className="mt-2 text-muted-foreground">
            Send your CV to{" "}
            <a href="mailto:careers@gearup.com.bd" className="text-primary hover:underline">
              careers@gearup.com.bd
            </a>{" "}
            and we&apos;ll keep you in mind for future openings.
          </p>
        </div>
      </section>
    </>
  )
}
