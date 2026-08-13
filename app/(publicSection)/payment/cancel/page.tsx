import Link from "next/link"
import { X, RefreshCw, ShoppingBag, ShieldCheck, Headset, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PaymentCancelPage() {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-20">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 size-125 rounded-full bg-red-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 size-125 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute inset-0 bg-dots-faint [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_50%,transparent_100%)]" />
      </div>

      <div className="relative w-full max-w-lg">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-primary/10">
          {/* Top accent */}
          <div className="h-2 bg-gradient-to-r from-red-400 via-amber-400 to-red-400" />

          <div className="p-8 text-center sm:p-12">
            {/* Animated icon */}
            <div className="relative mx-auto flex size-24 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-amber-500/20 animate-pulse-soft" />
              <div className="absolute -inset-3 rounded-full border-2 border-dashed border-amber-500/40 animate-spin-slow" />
              <div className="relative flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-xl shadow-amber-500/30">
                <X className="size-10" strokeWidth={3} />
              </div>
            </div>

            <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-700">
              <span className="size-1.5 rounded-full bg-amber-500" />
              Payment Cancelled
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              No worries, let&apos;s try again
            </h1>
            <p className="mt-3 text-muted-foreground">
              Your payment was not processed and no money was charged. Your rental is still
              waiting, so you can retry whenever you are ready.
            </p>

            {/* Info list */}
            <div className="mt-8 space-y-3 rounded-2xl border border-border bg-muted/40 p-5 text-left">
              <div className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <ShieldCheck className="size-4 text-primary" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Nothing was charged</p>
                  <p className="text-xs text-muted-foreground">Your account is safe and untouched</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <RefreshCw className="size-4 text-primary" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Retry anytime</p>
                  <p className="text-xs text-muted-foreground">The rental is still pending in your dashboard</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Headset className="size-4 text-primary" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Need a hand?</p>
                  <p className="text-xs text-muted-foreground">Our support team is here 7 days a week</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Button asChild size="lg" className="group gap-2 rounded-xl shadow-lg shadow-primary/20">
                <Link href="/dashboard/customer">
                  Try Payment Again
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2 rounded-xl">
                <Link href="/gear">
                  <ShoppingBag className="size-4 text-primary" />
                  Browse More Gear
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          Still having trouble? Contact{" "}
          <Link href="/contact" className="font-medium text-primary hover:underline">
            support
          </Link>
        </div>
      </div>
    </div>
  )
}
