import Link from "next/link"
import { Check, CalendarCheck, Mail, Package, ShieldCheck, ArrowRight, Store } from "lucide-react"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Payment Successful",
  description: "Your rental payment was successful. Track your rental status from your GearUp dashboard.",
  robots: { index: false, follow: false },
}

export default function PaymentSuccessPage() {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-20">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 size-125 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 size-125 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute inset-0 bg-dots-faint [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_50%,transparent_100%)]" />
      </div>

      <div className="relative w-full max-w-lg">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-primary/10">
          {/* Top accent */}
          <div className="h-2 bg-gradient-to-r from-emerald-500 via-primary to-emerald-500" />

          <div className="p-8 text-center sm:p-12">
            {/* Animated checkmark */}
            <div className="relative mx-auto flex size-24 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-pulse-soft" />
              <div className="absolute -inset-3 rounded-full border-2 border-dashed border-emerald-500/40 animate-spin-slow" />
              <div className="relative flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-xl shadow-emerald-500/30">
                <Check className="size-10" strokeWidth={3} />
              </div>
            </div>

            <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Payment Successful
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              You&apos;re all set!
            </h1>
            <p className="mt-3 text-muted-foreground">
              Your rental has been confirmed and the provider has been notified. A confirmation
              email is on its way to your inbox.
            </p>

            {/* Info list */}
            <div className="mt-8 space-y-3 rounded-2xl border border-border bg-muted/40 p-5 text-left">
              <div className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <CalendarCheck className="size-4 text-primary" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Rental confirmed</p>
                  <p className="text-xs text-muted-foreground">Track its status anytime from your dashboard</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Mail className="size-4 text-primary" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Check your email</p>
                  <p className="text-xs text-muted-foreground">We sent you the full rental summary</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <ShieldCheck className="size-4 text-primary" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Fully protected</p>
                  <p className="text-xs text-muted-foreground">Damage protection covers your entire rental</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Button asChild size="lg" className="group gap-2 rounded-xl shadow-lg shadow-primary/20">
                <Link href="/dashboard/customer">
                  View My Rentals
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2 rounded-xl">
                <Link href="/gear">
                  <Store className="size-4 text-primary" />
                  Browse More Gear
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Package className="size-3.5" />
          Need help? Visit the{" "}
          <Link href="/help" className="font-medium text-primary hover:underline">
            Help Center
          </Link>
        </div>
      </div>
    </div>
  )
}
