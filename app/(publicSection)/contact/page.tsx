"use client"

import { Mail, Phone, MapPin, MessageSquare, Clock, Send } from "lucide-react"
import { ContactForm } from "../_components/contact/contact-form"

const contactInfo = [
  { icon: Mail, label: "Email Us", value: "hello@gearup.com.bd", href: "mailto:hello@gearup.com.bd", color: "text-blue-600 bg-blue-100 dark:bg-blue-950 dark:text-blue-400" },
  { icon: Phone, label: "Call Us", value: "+880 1700-000000", href: "tel:+8801700000000", color: "text-green-600 bg-green-100 dark:bg-green-950 dark:text-green-400" },
  { icon: MapPin, label: "Visit Us", value: "House 12, Road 5, Dhanmondi, Dhaka 1205", href: "#", color: "text-purple-600 bg-purple-100 dark:bg-purple-950 dark:text-purple-400" },
  { icon: Clock, label: "Support Hours", value: "Sat - Thu, 9:00 AM - 8:00 PM (BST)", href: "#", color: "text-orange-600 bg-orange-100 dark:bg-orange-950 dark:text-orange-400" },
]

const faqs = [
  {
    q: "How do I list my gear on GearUp?",
    a: "Register as a Provider, go to your dashboard, and click 'Add Gear'. Fill in the details — name, description, price per day, quantity, and category. Your listing goes live immediately.",
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
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24 text-center">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-32 size-125 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 size-100 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-3xl">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Get in Touch
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Contact{" "}
            <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              GearUp
            </span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
            Have a question, suggestion, or need help? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="px-4 pb-16">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="group rounded-2xl border border-border bg-card p-6 text-center transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
            >
              <div className={`mx-auto mb-3 flex size-12 items-center justify-center rounded-xl ${c.color} transition-transform duration-300 group-hover:scale-110`}>
                <c.icon className="size-6" />
              </div>
              <p className="text-sm font-semibold">{c.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{c.value}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Form + FAQs */}
      <section className="px-4 pb-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1fr]">
          {/* Contact form */}
          <div>
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
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
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
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
                <div key={i} className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                  <h3 className="text-sm font-semibold">{faq.q}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>

            {/* Additional help */}
            <div className="mt-8 rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                  <Send className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Still need help?</p>
                  <p className="text-xs text-muted-foreground">
                    Email us directly at{" "}
                    <a href="mailto:hello@gearup.com.bd" className="text-primary hover:underline">
                      hello@gearup.com.bd
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
