import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck, Star, Users, Package, Sparkles, PlayCircle } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 size-125 rounded-full bg-primary/10 blur-3xl animate-pulse-soft" />
        <div className="absolute -bottom-40 -left-40 size-100 rounded-full bg-primary/5 blur-3xl animate-pulse-soft [animation-delay:1.5s]" />
        <div className="absolute inset-0 bg-grid-faint [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,#000_60%,transparent_100%)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28 lg:pt-20">
        {/* Left content */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-sm backdrop-blur-sm animate-fade-up">
            <span className="flex size-2 rounded-full bg-primary animate-pulse" />
            <span className="text-muted-foreground">
              Trusted by <span className="font-semibold text-foreground">10,000+</span> users across Bangladesh
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-6xl animate-fade-up [animation-delay:100ms]">
            Rent the Gear You Need,{" "}
            <span className="text-gradient-brand">When You Need It</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground animate-fade-up [animation-delay:200ms]">
            From camping tents to cycling gear, browse thousands of items from
            trusted local providers. Rent by the day, week, or month, and get
            back to doing what you love.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row animate-fade-up [animation-delay:300ms]">
            <Button size="lg" asChild className="group gap-2 px-8 text-base shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30">
              <Link href="/gear">
                Browse Gear
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="gap-2 px-8 text-base backdrop-blur-sm">
              <Link href="/register">
                <Sparkles className="size-4 text-primary" />
                Become a Provider
              </Link>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 animate-fade-up [animation-delay:400ms]">
            <div className="flex items-center gap-2.5">
              <div className="flex -space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="size-4 fill-gold text-gold" />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">4.9/5</span> rating
              </div>
            </div>
            <div className="hidden h-5 w-px bg-border sm:block" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                <Users className="size-4 text-primary" />
              </span>
              <span><span className="font-bold text-foreground">10,000+</span> active users</span>
            </div>
            <div className="hidden h-5 w-px bg-border sm:block" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                <Package className="size-4 text-primary" />
              </span>
              <span><span className="font-bold text-foreground">2,500+</span> gear listed</span>
            </div>
          </div>
        </div>

        {/* Right visual */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] sm:aspect-[5/5]">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-primary/15 via-transparent to-gold/10 blur-2xl" />

            {/* Main image */}
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-border shadow-2xl shadow-primary/10">
              <Image
                src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80"
                alt="Mountain biker riding through a forest trail with rented gear"
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Floating card: rating */}
            <div className="absolute -left-4 top-8 flex items-center gap-3 rounded-2xl border border-border bg-card/95 p-3 shadow-xl backdrop-blur-sm animate-float sm:-left-8">
              <span className="flex size-10 items-center justify-center rounded-xl bg-gold/15">
                <Star className="size-5 fill-gold text-gold" />
              </span>
              <div>
                <p className="text-sm font-bold leading-none">4.9 / 5</p>
                <p className="mt-0.5 text-xs text-muted-foreground">12k+ reviews</p>
              </div>
            </div>

            {/* Floating card: secure */}
            <div className="absolute -right-3 bottom-24 flex items-center gap-3 rounded-2xl border border-border bg-card/95 p-3 shadow-xl backdrop-blur-sm animate-float [animation-delay:1.2s] sm:-right-6">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/15">
                <ShieldCheck className="size-5 text-primary" />
              </span>
              <div>
                <p className="text-sm font-bold leading-none">Secure</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Stripe protected</p>
              </div>
            </div>

            {/* Bottom pill */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-card/90 px-5 py-2.5 shadow-lg backdrop-blur-sm">
              <PlayCircle className="size-4 text-primary" />
              <span className="text-xs font-medium sm:text-sm">Available in all 64 districts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
