"use client"

import { useState } from "react"
import { Package, CreditCard, Shield, UserCircle, Wrench, ChevronDown } from "lucide-react"
import { DashboardLayout } from "@/components/shared/dashboard-layout"

const categories = [
  {
    icon: Package, title: "Renting Gear",
    articles: [
      { q: "How do I browse and rent gear?", a: "Go to Browse Gear, use filters, select dates, and click 'Rent Now'." },
      { q: "Can I rent gear for multiple days?", a: "Yes! Select start and end dates. Total price is calculated automatically." },
      { q: "How do I return rented gear?", a: "Contact the provider to arrange return. Once marked 'Returned', you can leave a review." },
    ],
  },
  {
    icon: CreditCard, title: "Payments & Billing",
    articles: [
      { q: "What payment methods are accepted?", a: "Visa, Mastercard, bKash, Nagad, and bank transfers via Stripe." },
      { q: "When am I charged?", a: "After the provider confirms your rental. You'll see 'CONFIRMED' before payment." },
      { q: "How do I get a refund?", a: "Cancel before rental starts for full refund. After payment, contact support within 24 hours." },
    ],
  },
  {
    icon: Shield, title: "Safety & Protection",
    articles: [
      { q: "What if the gear gets damaged?", a: "File a claim from your dashboard with photos. Reviewed within 48 hours." },
      { q: "Is my payment secure?", a: "Yes. Stripe processes all payments. Card details are never stored on our servers." },
    ],
  },
  {
    icon: UserCircle, title: "Account & Profile",
    articles: [
      { q: "How do I create an account?", a: "Click 'Sign up' and choose Customer or Provider role." },
      { q: "How do I update my profile?", a: "Go to Profile from the dashboard sidebar." },
    ],
  },
  {
    icon: Wrench, title: "For Providers",
    articles: [
      { q: "How do I list gear?", a: "Provider Dashboard > Add Gear. Fill in details and publish." },
      { q: "How do I manage orders?", a: "Provider Dashboard > Orders. Confirm, mark picked up, or return." },
    ],
  },
]

export default function DashboardHelpPage() {
  const [openIdx, setOpenIdx] = useState<string | null>(null)

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Help Center</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse by topic or search for answers.
          </p>
        </div>

        <div className="space-y-6">
          {categories.map((cat) => (
            <div key={cat.title} className="rounded-xl border border-border bg-card">
              <div className="flex items-center gap-3 border-b border-border px-6 py-4">
                <cat.icon className="size-5 text-primary" />
                <h2 className="font-semibold">{cat.title}</h2>
              </div>
              <div className="divide-y divide-border">
                {cat.articles.map((a, i) => {
                  const key = `${cat.title}-${i}`
                  const isOpen = openIdx === key
                  return (
                    <div key={i}>
                      <button
                        onClick={() => setOpenIdx(isOpen ? null : key)}
                        className="flex w-full items-center justify-between px-6 py-3 text-left text-sm hover:bg-muted/50"
                      >
                        <span className="font-medium">{a.q}</span>
                        <ChevronDown className={`size-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-3 text-sm text-muted-foreground">
                          {a.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-muted/50 p-6 text-center">
          <p className="text-sm font-semibold">Still need help?</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Contact{" "}
            <a href="mailto:support@gearup.com.bd" className="text-primary hover:underline">
              support@gearup.com.bd
            </a>{" "}
            or call{" "}
            <a href="tel:+8801700000000" className="text-primary hover:underline">
              +880 1700-000000
            </a>
          </p>
        </div>
      </div>
    </DashboardLayout>
  )
}
