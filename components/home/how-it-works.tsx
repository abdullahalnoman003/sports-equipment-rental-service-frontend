import { Search, CalendarCheck, CreditCard, ThumbsUp } from "lucide-react"
import Link from "next/link"
import { SectionHeading } from "@/components/shared/page-hero"
import { Button } from "@/components/ui/button"

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Find Your Gear",
    description: "Search thousands of items by category, brand, or price to find exactly what fits your adventure.",
  },
  {
    icon: CalendarCheck,
    step: "02",
    title: "Pick Your Dates",
    description: "Choose a start and end date. The total price updates instantly based on the daily rate.",
  },
  {
    icon: CreditCard,
    step: "03",
    title: "Book & Pay Safely",
    description: "Confirm your booking and pay securely via Stripe once the provider approves.",
  },
  {
    icon: ThumbsUp,
    step: "04",
    title: "Rent & Review",
    description: "Pick up, enjoy, and return the gear. Then rate your experience to help the community.",
  },
]

export function HowItWorks() {
  return (
    <section className="relative px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="How It Works"
          title={
            <>
              Renting Gear Is{" "}
              <span className="text-gradient-brand">This Easy</span>
            </>
          }
          description="Four simple steps between you and your next adventure."
        />

        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-0 right-0 top-12 hidden border-t border-dashed border-border lg:block" />
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative flex flex-col items-center rounded-3xl border border-border bg-card p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 animate-fade-up"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <div className="relative mb-5">
                <span className="absolute inset-0 -z-10 rounded-2xl bg-primary/10 blur-md" />
                <span className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
                  <s.icon className="size-6" />
                </span>
                <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full border border-border bg-card text-[10px] font-bold text-primary">
                  {s.step}
                </span>
              </div>
              <h3 className="font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" asChild className="gap-2 rounded-full px-8 shadow-lg shadow-primary/20">
            <Link href="/gear">Start Exploring Gear</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
