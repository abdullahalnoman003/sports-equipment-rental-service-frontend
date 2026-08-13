import type { Metadata } from "next"
import { DashboardLayout } from "@/components/shared/dashboard-layout"

export const metadata: Metadata = {
  title: "Terms & Privacy Policy",
  description: "GearUp terms of service and privacy policy.",
}

const sections = [
  { title: "1. Acceptance of Terms", content: "By accessing GearUp, you agree to these Terms of Service. These apply to all users: customers, providers, and visitors." },
  { title: "2. Definitions", content: "Customer: rents gear. Provider: lists gear. Gear: equipment listed for rent. Rental: a booking transaction." },
  { title: "3. User Accounts", content: "Must be 18+ to create an account. One person may not maintain more than one account." },
  { title: "4. Rentals & Payments", content: "Payments processed through Stripe. Customers charged after Provider confirms. Cancellations before start date receive full refund." },
  { title: "5. Damage & Liability", content: "Providers list gear in good condition. Customers return gear in same condition. Damage protection included in every rental." },
  { title: "6. Prohibited Conduct", content: "No counterfeit, stolen, or illegal items. No fraud or harassment. Violations may result in account suspension." },
  { title: "7. Privacy Policy", content: "We collect name, email, phone, address to provide services. Payment info handled by Stripe, never stored on our servers." },
  { title: "8. Dispute Resolution", content: "Disputes reported through the Platform. Governed by laws of Bangladesh. Resolved in courts of Dhaka." },
  { title: "9. Changes to Terms", content: "GearUp reserves the right to modify terms. Changes posted on this page with updated date." },
  { title: "10. Contact", content: "Questions? Email legal@gearup.com.bd or write to: GearUp Bangladesh, House 12, Road 5, Dhanmondi, Dhaka 1205." },
]

export default function DashboardTermsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Terms & Privacy Policy</h1>
          <p className="mt-1 text-sm text-muted-foreground">Last updated: July 2026</p>
        </div>

        <div className="space-y-4">
          {sections.map((s) => (
            <div key={s.title} className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-semibold">{s.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
