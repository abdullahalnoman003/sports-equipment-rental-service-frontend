import Link from "next/link"
import { LifeBuoy } from "lucide-react"
import type { Metadata } from "next"
import { HelpContent } from "../_components/help/help-content"
import { PageHero } from "@/components/shared/page-hero"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Help Center",
  description:
    "Find answers about renting gear, payments, safety, and accounts on GearUp. Browse our knowledge base or contact support.",
  alternates: { canonical: "/help" },
}

export default function HelpPage() {
  return (
    <>
      <PageHero
        eyebrow="Help Center"
        title={
          <>
            How Can We <span className="text-gradient-brand">Help</span>?
          </>
        }
        description="Search our knowledge base or browse by topic. If you cannot find an answer, our support team is always here for you."
      />
      <HelpContent />

      <section className="px-4 pb-24">
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-card to-gold/10 p-10 text-center sm:p-12">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-12 -top-12 size-44 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-12 -left-12 size-44 rounded-full bg-gold/10 blur-3xl" />
          </div>
          <div className="relative">
            <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/15">
              <LifeBuoy className="size-7 text-primary" />
            </span>
            <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
              Still Need Help?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Contact our friendly support team and we will get back to you within 24 hours.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-xl shadow-lg shadow-primary/20">
                <Link href="mailto:support@gearup.com.bd">Email Support</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl">
                <Link href="tel:+8801700000000">Call Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
