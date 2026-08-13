import Link from "next/link"
import { ShieldCheck, FileText, ScrollText } from "lucide-react"
import type { Metadata } from "next"
import { PageHero } from "@/components/shared/page-hero"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Terms & Privacy Policy | GearUp Bangladesh",
  description: "GearUp Bangladesh terms of service and privacy policy.",
}

const sections = [
  {
    num: "01",
    title: "Acceptance of Terms",
    body: (
      <>
        By accessing or using GearUp (&quot;the Platform&quot;), operated by GearUp Bangladesh
        (&quot;the Company&quot;), you agree to be bound by these Terms of Service. If you do
        not agree, do not use the Platform. These terms apply to all users: customers,
        providers, and visitors.
      </>
    ),
  },
  {
    num: "02",
    title: "Definitions",
    body: (
      <ul className="list-disc space-y-1.5 pl-5">
        <li><strong>Customer:</strong> A user who rents gear from the Platform.</li>
        <li><strong>Provider:</strong> A user who lists gear for rent on the Platform.</li>
        <li><strong>Gear:</strong> Any sports or outdoor equipment listed for rent.</li>
        <li><strong>Rental:</strong> A transaction where a Customer books Gear from a Provider for a specific period.</li>
      </ul>
    ),
  },
  {
    num: "03",
    title: "User Accounts",
    body: (
      <>
        You must be at least 18 years old to create an account. You are responsible for
        maintaining the confidentiality of your account credentials. You must provide
        accurate and complete information during registration. One person may not maintain
        more than one account.
      </>
    ),
  },
  {
    num: "04",
    title: "Rentals & Payments",
    body: (
      <>
        All payments are processed through Stripe. Customers are charged after a Provider
        confirms the rental. GearUp charges a service fee on each transaction. Providers
        receive payouts after the rental is confirmed and picked up. Cancellations before
        the rental start date receive a full refund. Cancellations after payment may incur
        a fee.
      </>
    ),
  },
  {
    num: "05",
    title: "Damage & Liability",
    body: (
      <>
        Providers are responsible for listing gear in good, working condition. Customers
        are responsible for returning gear in the same condition. Damage protection is
        included in every rental. Claims are reviewed by the GearUp team within 48 hours.
        GearUp is not liable for injuries caused by misuse of rented gear.
      </>
    ),
  },
  {
    num: "06",
    title: "Prohibited Conduct",
    body: (
      <>
        Users may not list counterfeit, stolen, or illegal items. Users may not engage in
        fraud, harassment, or abuse of the Platform. Violations may result in account
        suspension or permanent ban. GearUp reserves the right to remove any listing
        without prior notice.
      </>
    ),
  },
  {
    num: "07",
    title: "Privacy Policy",
    body: (
      <>
        We collect personal information (name, email, phone, address) to provide our
        services. Payment information is handled by Stripe and is never stored on our
        servers. We do not sell or share personal data with third parties except as
        required by law. Usage data (analytics) is collected to improve the Platform.
        You may request deletion of your data by contacting{" "}
        <a href="mailto:privacy@gearup.com.bd" className="font-medium text-primary hover:underline">
          privacy@gearup.com.bd
        </a>.
      </>
    ),
  },
  {
    num: "08",
    title: "Dispute Resolution",
    body: (
      <>
        Disputes between Customers and Providers should first be reported through the
        Platform. GearUp will mediate fairly. These terms are governed by the laws of
        the People&apos;s Republic of Bangladesh. Any legal disputes shall be resolved in
        the courts of Dhaka, Bangladesh.
      </>
    ),
  },
  {
    num: "09",
    title: "Changes to Terms",
    body: (
      <>
        GearUp reserves the right to modify these terms at any time. Changes will be posted
        on this page with an updated date. Continued use of the Platform after changes
        constitutes acceptance of the new terms.
      </>
    ),
  },
  {
    num: "10",
    title: "Contact",
    body: (
      <>
        For questions about these terms, contact us at{" "}
        <a href="mailto:legal@gearup.com.bd" className="font-medium text-primary hover:underline">
          legal@gearup.com.bd
        </a>{" "}
        or write to: GearUp Bangladesh, House 12, Road 5, Dhanmondi, Dhaka 1205.
      </>
    ),
  },
]

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={
          <>
            Terms & <span className="text-gradient-brand">Privacy Policy</span>
          </>
        }
        description="Please read these terms carefully. By using GearUp, you agree to the policies below. Last updated: July 2026."
      >
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" variant="outline" className="gap-2 rounded-xl">
            <Link href="/contact">
              <ShieldCheck className="size-4 text-primary" />
              Contact Legal
            </Link>
          </Button>
        </div>
      </PageHero>

      <div className="px-4 pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          {/* Sticky sidebar */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-3xl border border-border bg-card p-6">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                <ScrollText className="size-4 text-primary" />
                On this page
              </h2>
              <ul className="mt-4 space-y-1">
                {sections.map((s) => (
                  <li key={s.num}>
                    <a
                      href={`#section-${s.num}`}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <span className="text-xs font-bold text-primary">{s.num}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Content */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-muted/40 p-5 text-sm text-muted-foreground">
              <FileText className="size-5 shrink-0 text-primary" />
              This document explains your rights and responsibilities when using GearUp.
              Keep it handy if you have questions about a specific policy.
            </div>

            {sections.map((s) => (
              <section
                key={s.num}
                id={`section-${s.num}`}
                className="scroll-mt-28 rounded-3xl border border-border bg-card p-6 transition-colors hover:border-primary/25 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-sm font-bold text-primary">
                    {s.num}
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-xl font-bold tracking-tight">{s.title}</h2>
                    <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {s.body}
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
