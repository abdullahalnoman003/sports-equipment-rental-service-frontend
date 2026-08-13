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
  Star,
  Truck,
  Heart,
  Clock3,
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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Breadcrumb */}
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
        {/* Image gallery */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <GearDetailClient gear={gear} />

          {/* Trust strip under image */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { icon: ShieldCheck, label: "Secure payment" },
              { icon: Truck, label: "Easy pickup" },
              { icon: Clock3, label: "Flexible dates" },
            ].map((t) => (
              <div
                key={t.label}
                className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card/70 px-3 py-4 text-center backdrop-blur-sm"
              >
                <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
                  <t.icon className="size-4 text-primary" />
                </span>
                <p className="text-xs font-medium text-muted-foreground">{t.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Details column */}
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              <BadgeCheck className="size-3.5" />
              {gear.category_Name}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-medium ${
                inStock ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
              }`}
            >
              {inStock ? <CheckCircle2 className="size-3.5" /> : <Package className="size-3.5" />}
              {inStock ? `${gear.quantity} available` : "Out of stock"}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3.5 py-1 text-xs font-medium text-gold">
              <Star className="size-3.5 fill-gold" />
              Top rated
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            {gear.name}
          </h1>
          <p className="mt-2 text-muted-foreground">
            by <span className="font-semibold text-foreground">{gear.brand}</span>
            {" "}· Listed on the GearUp marketplace
          </p>

          <div className="mt-6 flex flex-wrap items-end gap-3">
            <span className="text-5xl font-bold tracking-tight text-primary">৳{gear.price}</span>
            <span className="pb-1.5 text-base text-muted-foreground">/ day</span>
          </div>

          <p className="mt-6 leading-relaxed text-muted-foreground line-clamp-3">
            {gear.description}
          </p>

          {/* Quick stats */}
          <div className="mt-7 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-border bg-card p-4 text-center transition-all hover:border-primary/30">
              <Package className="mx-auto size-5 text-primary" />
              <p className="mt-2 truncate text-lg font-bold">{gear.quantity}</p>
              <p className="text-xs text-muted-foreground">In stock</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 text-center transition-all hover:border-primary/30">
              <BadgeCheck className="mx-auto size-5 text-primary" />
              <p className="mt-2 truncate text-lg font-bold">{gear.category_Name}</p>
              <p className="text-xs text-muted-foreground">Category</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 text-center transition-all hover:border-primary/30">
              <ShieldCheck className="mx-auto size-5 text-primary" />
              <p className="mt-2 text-lg font-bold">100%</p>
              <p className="text-xs text-muted-foreground">Protected</p>
            </div>
          </div>

          {/* Rent form */}
          <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5 sm:p-7">
            <RentForm gear={gear} />
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        {/* About section */}
        <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
          <h2 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
              <Info className="size-5 text-primary" />
            </span>
            About this gear
          </h2>
          <p className="mt-5 whitespace-pre-line leading-relaxed text-muted-foreground">
            {gear.description}
          </p>

          <div className="mt-8 rounded-2xl bg-muted/50 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Rental rules
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="size-3.5 text-primary" />
                </span>
                Gear quantity is limited, book early to lock in your dates.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="size-3.5 text-primary" />
                </span>
                Payment is collected securely via Stripe after the provider confirms your order.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="size-3.5 text-primary" />
                </span>
                You will receive pickup instructions once your rental is confirmed.
              </li>
            </ul>
          </div>
        </section>

        <aside className="space-y-6">
          {/* Provider card */}
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6">
            <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-primary/5 blur-2xl" />
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              <Store className="size-4 text-primary" />
              Provider
            </h3>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/60 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20">
                {gear.provider_email.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{gear.provider_email}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="size-3" />
                  Local provider
                </p>
                <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-primary">
                  <Heart className="size-3 fill-primary text-primary" />
                  4.9 rating
                </span>
              </div>
            </div>
            <Button asChild variant="outline" size="sm" className="mt-5 w-full rounded-xl">
              <Link href={`/gear?category=${encodeURIComponent(gear.category_Name)}`}>
                See more in {gear.category_Name}
              </Link>
            </Button>
          </div>

          {/* Booking steps */}
          <div className="rounded-3xl border border-border bg-card p-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              How booking works
            </h3>
            <ol className="mt-6 space-y-6">
              {[
                { icon: CalendarDays, title: "Pick your dates", desc: "Choose start and end dates and book the gear." },
                { icon: ClipboardCheck, title: "Provider confirms", desc: "You will get notified once your order is approved." },
                { icon: CreditCard, title: "Pay and pick up", desc: "Pay securely via Stripe and collect your gear." },
              ].map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/5 shadow-sm">
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
