import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, ShieldCheck, Headset } from "lucide-react"

export function Cta() {
  return (
    <section className="relative px-4 py-20 sm:py-24" id="cta">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2.5rem] px-6 py-16 text-center sm:px-16 sm:py-20">
          {/* Background image + overlay */}
          <Image
            src="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1600&q=80"
            alt=""
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-emerald-900/95" />

          {/* Decorative elements */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-20 size-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute inset-0 bg-grid-faint [background-color:transparent] [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:3rem_3rem] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
          </div>

          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm backdrop-blur-sm">
              <Zap className="size-4" />
              <span>Start renting in minutes</span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to Rent Some Gear?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
              Join GearUp today. Browse hundreds of sports and outdoor items from
              local providers, or list your own gear and start earning.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="group gap-2 rounded-full px-8 text-base shadow-lg transition-all hover:shadow-xl"
              >
                <Link href="/register">
                  Create Free Account
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="gap-2 rounded-full border-white/30 bg-white/5 px-8 text-base text-white backdrop-blur-sm hover:bg-white/10"
              >
                <Link href="/gear">Explore Gear</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/70">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="size-4" />
                Secure payments
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Headset className="size-4" />
                24/7 support
              </span>
              <span>No credit card required</span>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
