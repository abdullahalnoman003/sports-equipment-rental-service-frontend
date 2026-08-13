import { Mail, Phone, MapPin, Clock } from "lucide-react"
import type { Metadata } from "next"
import { DashboardLayout } from "@/components/shared/dashboard-layout"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Have a question or need help with GearUp? Contact our support team.",
}

const contactInfo = [
  { icon: Mail, label: "Email Us", value: "hello@gearup.com.bd", color: "text-blue-600 bg-blue-100 dark:bg-blue-950 dark:text-blue-400" },
  { icon: Phone, label: "Call Us", value: "+880 1700-000000", color: "text-green-600 bg-green-100 dark:bg-green-950 dark:text-green-400" },
  { icon: MapPin, label: "Visit Us", value: "House 12, Road 5, Dhanmondi, Dhaka 1205", color: "text-purple-600 bg-purple-100 dark:bg-purple-950 dark:text-purple-400" },
  { icon: Clock, label: "Support Hours", value: "Sat - Thu, 9:00 AM - 8:00 PM (BST)", color: "text-orange-600 bg-orange-100 dark:bg-orange-950 dark:text-orange-400" },
]

const faqs = [
  { q: "How do I list my gear on GearUp?", a: "Register as a Provider, go to your dashboard, and click 'Add Gear'. Fill in the details and your listing goes live immediately." },
  { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, bKash, Nagad, and bank transfers via Stripe integration." },
  { q: "What if the gear I rented is damaged?", a: "Every rental includes damage protection. File a claim from your dashboard and our team reviews within 48 hours." },
  { q: "Can I cancel a rental?", a: "Yes. Free cancellation is available before the rental start date. Once picked up, contact the provider directly." },
]

export default function DashboardContactPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contact Us</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Have a question or need help? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((c) => (
            <div key={c.label} className="rounded-xl border border-border bg-card p-5 text-center">
              <div className={`mx-auto mb-3 flex size-10 items-center justify-center rounded-lg ${c.color}`}>
                <c.icon className="size-5" />
              </div>
              <p className="text-sm font-semibold">{c.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{c.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Send us a message</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Email us directly at{" "}
              <a href="mailto:hello@gearup.com.bd" className="text-primary hover:underline">
                hello@gearup.com.bd
              </a>
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
            <div className="mt-4 space-y-3">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <p className="text-sm font-medium">{faq.q}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
