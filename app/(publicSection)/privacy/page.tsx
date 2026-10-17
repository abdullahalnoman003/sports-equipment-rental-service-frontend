import Link from "next/link"
import { ShieldCheck, Lock, Eye, Database, Trash2 } from "lucide-react"
import type { Metadata } from "next"
import { PageHero } from "@/components/shared/page-hero"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How GearUp collects, uses, stores and protects your personal information, and how to exercise your rights.",
  alternates: { canonical: "/privacy" },
}

const sections = [
  {
    num: "01",
    icon: Database,
    title: "Information We Collect",
    body: (
      <>
        We collect only what the Platform needs to operate. When you create an account we store
        your name, email address and a hashed password. If you sign in with Google we receive your
        name, email address and profile picture from Google, and we do not receive or store your
        Google password. When you rent gear we record the booking, the rental period and the
        amounts paid. When you list gear we store your listing details, daily rate and stock
        levels.
      </>
    ),
  },
  {
    num: "02",
    icon: Lock,
    title: "How We Protect Your Data",
    body: (
      <>
        Passwords are hashed with bcrypt and are never stored in plain text. Session tokens are
        held in HTTP-only cookies, which means scripts running in your browser cannot read them.
        Payments are processed by Stripe, so we never see or store your full card number. Data in
        transit is encrypted with TLS.
      </>
    ),
  },
  {
    num: "03",
    icon: Eye,
    title: "Who Can See What",
    body: (
      <>
        Your email address and display name are visible to the other party in a rental, since
        they need to arrange pickup and return. Your phone number and home address are shared
        with a provider only once you have placed an order with them. We never sell your personal
        information, and we do not share it with advertisers.
      </>
    ),
  },
  {
    num: "04",
    icon: ShieldCheck,
    title: "Reviews and Ratings",
    body: (
      <>
        Once a rental is returned, both parties can leave a rating and a written comment. Reviews
        are public and attached to the gear item, so please keep them about the rental experience
        rather than about an individual. A review cannot be edited by the platform after it is
        submitted.
      </>
    ),
  },
  {
    num: "05",
    icon: Trash2,
    title: "Your Rights",
    body: (
      <>
        You can view and update your profile at any time from the profile page. You can close your
        account by contacting us, at which point we remove your personal data apart from records
        we are legally required to retain, such as completed rental transactions. You can also
        ask us what personal information we hold about you, and request a correction.
      </>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <PageHero
        eyebrow="Privacy"
        title={
          <>
            Your <span className="text-gradient-brand">Privacy Policy</span>
          </>
        }
        description="What we collect, why we collect it, and the control you keep over it."
      />

      <div className="space-y-5">
        {sections.map((section) => (
          <section
            key={section.num}
            className="rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 sm:p-8"
          >
            <div className="flex items-start gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                <section.icon className="size-5 text-primary" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Section {section.num}
                </p>
                <h2 className="mt-1.5 text-xl font-bold tracking-tight">{section.title}</h2>
                <div className="mt-3 leading-relaxed text-muted-foreground">{section.body}</div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-border bg-muted/40 p-6 text-center sm:p-8">
        <h2 className="text-lg font-bold">Questions about your data?</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Write to us at{" "}
          <a
            href="mailto:privacy@gearup.com.bd"
            className="font-medium text-primary hover:underline"
          >
            privacy@gearup.com.bd
          </a>{" "}
          and we will respond.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/terms">Read the Terms</Link>
          </Button>
          <Button asChild className="rounded-full">
            <Link href="/contact">Contact support</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}