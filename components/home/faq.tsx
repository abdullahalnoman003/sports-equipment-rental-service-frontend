"use client"

import { useState } from "react"
import { ChevronDown, MessageCircleQuestion } from "lucide-react"
import { SectionHeading } from "@/components/shared/page-hero"
import { cn } from "@/lib/utils"

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
      "Orders go through these stages: PLACED, CONFIRMED, PAID, PICKED_UP, then RETURNED. You can track the full status in your dashboard with color-coded badges.",
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
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="relative px-4 py-20 sm:py-24" id="faq">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Frequently Asked{" "}
              <span className="text-gradient-brand">Questions</span>
            </>
          }
          description="Got questions? We have got answers."
        />

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={faq.question}
                className={cn(
                  "group overflow-hidden rounded-2xl border bg-card transition-all duration-300 animate-fade-up",
                  isOpen
                    ? "border-primary/40 shadow-lg shadow-primary/5"
                    : "border-border hover:border-primary/25"
                )}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center gap-4 p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors",
                      isOpen
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary"
                    )}
                  >
                    <MessageCircleQuestion className="size-4" />
                  </span>
                  <span className="flex-1 text-sm font-semibold sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-4 shrink-0 text-muted-foreground transition-transform duration-300",
                      isOpen && "rotate-180 text-primary"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 pl-[4.25rem] text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </div>
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
