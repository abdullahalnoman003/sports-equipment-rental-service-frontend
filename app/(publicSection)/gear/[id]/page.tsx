import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Home,
  ChevronRight,
  CheckCircle2,
  Package,
  ShieldCheck,
  BadgeCheck,
  Store,
  MapPin,
  Info,
  CalendarDays,
  ClipboardCheck,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { fetchGearById } from "../../_actions/gear"
import { GearDetailClient } from "../../_components/gear/gear-detail-client"
import { RentForm } from "../../_components/gear/rent-form"
import type { Gear } from "@/lib/types"

export const revalidate = 60

export default async function GearDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const res = await fetchGearById(id, { next: { revalidate: 60 } })

  if (!res.success || !res.data) {
    notFound()
  }

  const gear = res.data as Gear
  const inStock = gear.quantity > 0

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground"
      >
        <Link
          href="/"
          className="inline-flex shrink-0 items-center gap-1 transition-colors hover:text-foreground"
        >
          <Home className="size-3.5" />
          <span className="hidden sm:inline">Home</span>
        </Link>
        <ChevronRight className="size-4 shrink-0" />
        <Link
          href="/gear"
          className="shrink-0 transition-colors hover:text-foreground"
        >
          Browse Gear
        </Link>
        <ChevronRight className="size-4 shrink-0" />
        <span className="truncate font-medium text-foreground">{gear.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <GearDetailClient gear={gear} />
        </div>

        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              {gear.category_Name}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                inStock ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
              }`}
            >
              {inStock ? <CheckCircle2 className="size-3.5" /> : <Package className="size-3.5" />}
              {inStock ? `${gear.quantity} available` : "Out of stock"}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{gear.name}</h1>
          <p className="mt-1.5 text-muted-foreground">
            by <span className="font-medium text-foreground">{gear.brand}</span>
          </p>

          <div className="mt-6 flex items-end gap-2">
            <span className="text-4xl font-bold text-primary">৳{gear.price}</span>
            <span className="pb-1 text-sm text-muted-foreground">/ day</span>
          </div>

          <p className="mt-5 leading-relaxed text-muted-foreground line-clamp-3">{gear.description}</p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-border bg-card p-3 text-center">
              <Package className="mx-auto size-4 text-primary" />
              <p className="mt-2 truncate text-sm font-semibold">{gear.quantity}</p>
              <p className="text-xs text-muted-foreground">In stock</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-3 text-center">
              <BadgeCheck className="mx-auto size-4 text-primary" />
              <p className="mt-2 truncate text-sm font-semibold">{gear.category_Name}</p>
              <p className="text-xs text-muted-foreground">Category</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-3 text-center">
              <ShieldCheck className="mx-auto size-4 text-primary" />
              <p className="mt-2 text-sm font-semibold">Stripe</p>
              <p className="text-xs text-muted-foreground">Secure payment</p>
            </div>
          </div>

          <div className="mt-8">
            <RentForm gear={gear} />
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <Info className="size-5 text-primary" />
            About this gear
          </h2>
          <p className="mt-4 whitespace-pre-line leading-relaxed text-muted-foreground">
            {gear.description}
          </p>

          <div className="mt-8 border-t border-border pt-6">
            <h3 className="text-sm font-semibold">Rental rules</h3>
            <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                Gear quantity is limited — book early to lock in your dates.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                Payment is collected securely via Stripe after the provider confirms your order.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                You&apos;ll receive pickup instructions once your rental is confirmed.
              </li>
            </ul>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <Store className="size-4 text-primary" />
              Provider
            </h3>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-bold text-primary">
                {gear.provider_email.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{gear.provider_email}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="size-3" />
                  Local provider
                </p>
              </div>
            </div>
            <Button asChild variant="outline" size="sm" className="mt-5 w-full">
              <Link href={`/gear?category=${encodeURIComponent(gear.category_Name)}`}>
                See more in this category
              </Link>
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold">How booking works</h3>
            <ol className="mt-5 space-y-5">
              {[
                { icon: CalendarDays, title: "Pick your dates", desc: "Choose start & end dates and book the gear." },
                { icon: ClipboardCheck, title: "Provider confirms", desc: "You'll get notified once your order is approved." },
                { icon: CreditCard, title: "Pay & pick up", desc: "Pay securely via Stripe and collect your gear." },
              ].map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5">
                      <step.icon className="size-4 text-primary" />
                    </div>
                    {i < 2 && <div className="mt-2 w-px flex-1 bg-border" />}
                  </div>
                  <div className="pb-1">
                    <p className="text-sm font-semibold">{step.title}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </div>
  )
}
