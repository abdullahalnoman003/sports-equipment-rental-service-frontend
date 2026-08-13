import { Search, UserCheck, CreditCard, Package, Star } from "lucide-react"
import type { Metadata } from "next"
import { DashboardLayout } from "@/components/shared/dashboard-layout"

export const metadata: Metadata = {
  title: "How It Works",
  description: "Renting and listing gear on GearUp made simple.",
}

const renterSteps = [
  { step: 1, icon: Search, title: "Browse & Find Gear", description: "Search by category, brand, or price. Use filters to find exactly what you need." },
  { step: 2, icon: UserCheck, title: "Select Dates & Book", description: "Pick your rental dates, review the total cost, and click 'Rent Now'." },
  { step: 3, icon: CreditCard, title: "Pay & Pick Up", description: "After provider confirmation, pay via Stripe and pick up the gear." },
  { step: 4, icon: Star, title: "Use, Return & Review", description: "Enjoy your gear, return it, and leave a review for the community." },
]

const providerSteps = [
  { step: 1, icon: Package, title: "List Your Gear", description: "Register as Provider, add gear with price, quantity, and category." },
  { step: 2, icon: UserCheck, title: "Receive Orders", description: "Customers browse and request your gear. Manage from your dashboard." },
  { step: 3, icon: CreditCard, title: "Confirm & Hand Over", description: "Review requests, confirm, and arrange pickup. Payment is automatic." },
]

const statuses = [
  { label: "PLACED", color: "bg-yellow-100 text-yellow-700", desc: "Customer requested rental" },
  { label: "CONFIRMED", color: "bg-blue-100 text-blue-700", desc: "Provider accepted" },
  { label: "PAID", color: "bg-purple-100 text-purple-700", desc: "Payment completed" },
  { label: "PICKED_UP", color: "bg-green-100 text-green-700", desc: "Customer has gear" },
  { label: "RETURNED", color: "bg-gray-100 text-gray-600", desc: "Gear returned" },
  { label: "CANCELED", color: "bg-red-100 text-red-700", desc: "Rental cancelled" },
]

export default function DashboardHowItWorksPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">How It Works</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Renting and listing gear made simple.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">For Customers</h2>
          <div className="space-y-3">
            {renterSteps.map((s) => (
              <div key={s.step} className="flex gap-4 rounded-lg border border-border p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <s.icon className="size-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-primary">Step {s.step}</p>
                  <p className="font-medium">{s.title}</p>
                  <p className="text-sm text-muted-foreground">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">For Providers</h2>
          <div className="space-y-3">
            {providerSteps.map((s) => (
              <div key={s.step} className="flex gap-4 rounded-lg border border-border p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <s.icon className="size-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-primary">Step {s.step}</p>
                  <p className="font-medium">{s.title}</p>
                  <p className="text-sm text-muted-foreground">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">Rental Status Flow</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {statuses.map((s) => (
              <div key={s.label} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${s.color}`}>
                  {s.label}
                </span>
                <span className="text-xs text-muted-foreground">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
