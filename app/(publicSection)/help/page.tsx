"use client"

import { Package, CreditCard, ShieldCheck, UserCircle, Wrench, LifeBuoy } from "lucide-react"
import Link from "next/link"
import { HelpAccordion } from "../_components/help/help-accordion"
import { PageHero } from "@/components/shared/page-hero"
import { Button } from "@/components/ui/button"

const categories = [
  {
    icon: Package,
    title: "Renting Gear",
    articles: [
      { q: "How do I browse and rent gear?", a: "Go to the Browse Gear page, use filters to find what you need, select your rental dates, and click 'Rent Now'. You'll be guided through the checkout process." },
      { q: "Can I rent gear for multiple days?", a: "Yes! Select your start and end dates on the gear detail page. The total price is calculated automatically based on the daily rate and number of days." },
      { q: "What if the gear isn't available for my dates?", a: "If a gear item shows zero availability for your selected dates, it means another customer has already booked it. Try different dates or look for similar items." },
      { q: "How do I return rented gear?", a: "Contact the provider to arrange a return. Once the provider marks the order as 'Returned' in the system, the rental is complete. You can then leave a review." },
    ],
  },
  {
    icon: CreditCard,
    title: "Payments & Billing",
    articles: [
      { q: "What payment methods are accepted?", a: "We accept Visa, Mastercard, bKash, Nagad, and bank transfers. All payments are securely processed through Stripe." },
      { q: "When am I charged?", a: "Payment is processed after the provider confirms your rental. You will see a 'CONFIRMED' status before being redirected to payment." },
      { q: "Is there a security deposit?", a: "Some gear items require a refundable security deposit. This is clearly shown before you confirm the booking and is returned after the item is checked back in." },
      { q: "How do I get a refund?", a: "If you cancel before the rental starts, a full refund is issued. For cancellations after payment, contact support within 24 hours." },
    ],
  },
  {
    icon: ShieldCheck,
    title: "Safety & Protection",
    articles: [
      { q: "What if the gear gets damaged?", a: "Every rental includes damage protection. File a claim from your dashboard with photos and a description. Our team reviews claims within 48 hours." },
      { q: "How are providers verified?", a: "All providers must verify their identity and contact information. Reviews from other customers also help build trust in the community." },
      { q: "Is my payment information secure?", a: "Yes. We use Stripe for all payment processing. Your card details are never stored on our servers. All transactions are encrypted end-to-end." },
    ],
  },
  {
    icon: UserCircle,
    title: "Account & Profile",
    articles: [
      { q: "How do I create an account?", a: "Click 'Sign up' and choose whether you want to register as a Customer (to rent) or Provider (to list gear). You will need a valid email address." },
      { q: "How do I update my profile?", a: "Go to your Profile page from the dashboard sidebar. You can update your name, phone number, address, and profile picture." },
      { q: "How do I become a Provider?", a: "Register with the Provider role selected. Once logged in, you can access the Provider Dashboard and start listing your gear immediately." },
      { q: "How do I change my password?", a: "Go to your Profile page and use the update form. For security, you will need to confirm your current password." },
    ],
  },
  {
    icon: Wrench,
    title: "For Providers",
    articles: [
      { q: "How do I list gear for rent?", a: "Go to Provider Dashboard > Add Gear. Fill in the name, description, brand, price per day, quantity, and category. Upload an image if available." },
      { q: "How do I manage incoming orders?", a: "Go to Provider Dashboard > Orders. You will see all rental requests. Click 'Confirm' to accept, then 'Mark Picked Up' when the customer collects the gear." },
      { q: "How do I update order status?", a: "In the Orders table, each order has action buttons based on its current status: Confirm (for PLACED), Mark Picked Up (for PAID), Mark Returned (for PICKED_UP)." },
      { q: "When do I get paid?", a: "Payment is released to you after the customer picks up the gear and the rental period is active. Track all earnings in your Provider Dashboard." },
    ],
  },
]

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
      <HelpAccordion categories={categories} />

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
