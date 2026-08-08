import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"

export function Cta() {
  return (
    <section className="relative overflow-hidden px-4 py-24" id="cta">
      <div className="relative mx-auto max-w-5xl">
        {/* Background card with gradient */}
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary via-primary/90 to-primary/70 px-8 py-16 text-center text-primary-foreground sm:px-16 sm:py-20">
          {/* Decorative elements */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-20 size-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
          </div>

          {/* Grid pattern overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[3rem_3rem] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

          <div className="relative z-10">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm backdrop-blur-sm">
              <Zap className="size-4" />
              <span>Start renting in minutes</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to Rent Some Gear?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-primary-foreground/80 text-lg">
              Join GearUp today. Browse hundreds of sports and outdoor items from
              local providers, or list your own gear and start earning.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                variant="secondary"
                asChild
                className="group gap-2 px-8 text-base shadow-lg transition-all hover:shadow-xl"
              >
                <a href="/register">
                  Create Free Account
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/5 text-white hover:bg-white/10 gap-2 px-8 text-base backdrop-blur-sm"
                asChild
              >
                <Link href="/gear">Explore Gear</Link>
              </Button>
            </div>

            {/* Trust note */}
            <p className="mt-8 text-sm text-primary-foreground/60">
              No credit card required &middot; Free to browse &middot; Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
