import { Mail, Phone, MapPin, MessageSquare, Clock, Send, Headset } from "lucide-react"
import type { Metadata } from "next"
import { PageHero } from "@/components/shared/page-hero"
import { ContactForm } from "../_components/contact/contact-form"

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the GearUp team. Questions, suggestions, or support — our team responds within 24 hours.",
  alternates: { canonical: "/contact" },
}

const contactInfo = [
  { icon: Mail, label: "Email Us", value: "hello@gearup.com.bd", href: "mailto:hello@gearup.com.bd" },
  { icon: Phone, label: "Call Us", value: "+880 1700-000000", href: "tel:+8801700000000" },
  { icon: MapPin, label: "Visit Us", value: "House 12, Road 5, Dhanmondi, Dhaka 1205", href: "#" },
  { icon: Clock, label: "Support Hours", value: "Sat - Thu, 9:00 AM - 8:00 PM (BST)", href: "#" },
]

const faqs = [
  {
    q: "How do I list my gear on GearUp?",
    a: "Register as a Provider, go to your dashboard, and click 'Add Gear'. Fill in the details: name, description, price per day, quantity, and category. Your listing goes live immediately.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit/debit cards, bKash, Nagad, and bank transfers via Stripe integration. All transactions are secure and encrypted.",
  },
  {
    q: "What if the gear I rented is damaged?",
    a: "Every rental includes damage protection. If something goes wrong, file a claim from your dashboard. Our team reviews claims within 48 hours and handles fair resolution.",
  },
  {
    q: "Can I cancel a rental?",
    a: "Yes. Free cancellation is available before the rental start date. Once the gear is picked up, contact the provider directly to arrange an early return.",
  },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title={
          <>
            Contact <span className="text-gradient-brand">GearUp</span>
          </>
        }
        description="Have a question, suggestion, or need help? We would love to hear from you. Our team responds within 24 hours."
      />

      {/* Contact cards */}
      <section className="px-4 pb-16">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/10" />
              <span className="relative mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                <c.icon className="size-6" />
              </span>
              <p className="relative text-sm font-semibold">{c.label}</p>
              <p className="relative mt-1 text-xs leading-relaxed text-muted-foreground">
                {c.value}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Form + FAQs */}
      <section className="px-4 pb-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1fr]">
          {/* Contact form */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-primary" />
              Send a Message
            </span>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
              Let&apos;s Talk
            </h2>
            <p className="mt-2 text-muted-foreground">
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          {/* FAQs */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-primary" />
              FAQ
            </span>
            <h2 className="mt-4 flex items-center gap-2 text-2xl font-bold tracking-tight sm:text-3xl">
              <MessageSquare className="size-6 text-primary" />
              Common Questions
            </h2>
            <p className="mt-2 text-muted-foreground">
              Quick answers to questions we hear a lot.
            </p>
            <div className="mt-8 space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                >
                  <h3 className="flex items-start gap-3 text-sm font-semibold">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                      {i + 1}
                    </span>
                    {faq.q}
                  </h3>
                  <p className="mt-2 pl-9 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            {/* Additional help */}
            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-6">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                <Send className="size-6 text-primary" />
              </div>
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold">
                  Still need help?
                  <Headset className="size-4 text-primary" />
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Email us directly at{" "}
                  <a href="mailto:hello@gearup.com.bd" className="text-primary hover:underline">
                    hello@gearup.com.bd
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
