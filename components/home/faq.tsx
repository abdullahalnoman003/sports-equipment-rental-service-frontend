"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "How do I rent gear on GearUp?",
    answer:
      "Browse the gear catalog, select your rental dates using the date picker, and complete checkout. The provider will confirm your booking and arrange pickup or delivery.",
  },
  {
    question: "What happens if the gear gets damaged?",
    answer:
      "Every rental includes damage protection. If something goes wrong, file a claim through your dashboard and our team will review it within 48 hours.",
  },
  {
    question: "How do providers get paid?",
    answer:
      "Payouts are processed after a rental is confirmed and picked up. You can track all your earnings and rental status from your provider dashboard.",
  },
  {
    question: "What are the rental statuses?",
    answer:
      "Orders go through these stages: PLACED → CONFIRMED → PAID → PICKED_UP → RETURNED. You can track the full status in your dashboard with color-coded badges.",
  },
  {
    question: "Can I cancel a rental?",
    answer:
      "Yes. You can cancel a PLACED or CONFIRMED order before payment. Once the gear is picked up, contact the provider directly to arrange an early return.",
  },
  {
    question: "How do I become a provider?",
    answer:
      "Register an account and select the Provider role. You can then list your gear with images, set pricing, and manage incoming rental orders from your dashboard.",
  },
]

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="relative bg-muted/50 px-4 py-24" id="faq">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Frequently Asked{" "}
            <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Got questions? We&apos;ve got answers.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className={`group overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-primary/50 bg-card shadow-lg shadow-primary/5"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center gap-3 p-5 text-left"
                >
                  <HelpCircle className={`size-5 shrink-0 transition-colors ${isOpen ? "text-primary" : "text-muted-foreground"}`} />
                  <span className="flex-1 text-sm font-semibold">{faq.question}</span>
                  <ChevronDown
                    className={`size-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-5 pl-13 text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
