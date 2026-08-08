import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Users, Package } from "lucide-react"

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-linear-to-br from-background via-background to-primary/5 px-4 py-20 text-center">
      {/* Animated background orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 size-125 rounded-full bg-primary/5 blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -left-32 size-100 rounded-full bg-primary/5 blur-3xl animate-pulse delay-1000" />
        <div className="absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/3 blur-3xl animate-pulse delay-500" />
      </div>

      {/* Grid pattern overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-linear(to_right,oklch(var(--border)/0.3)_1px,transparent_1px),linear-linear(to_bottom,oklch(var(--border)/0.3)_1px,transparent_1px)] bg-size-[4rem_4rem] [mask-image:radial-linear(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 mx-auto max-w-4xl space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-sm backdrop-blur-sm">
          <span className="flex size-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-muted-foreground">Trusted by 10,000+ users across Bangladesh</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
          Rent the Gear You Need,{" "}
          <span className="bg-linear-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            When You Need It
          </span>
        </h1>

        {/* Subheading */}
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
          From camping tents to cycling gear browse thousands of items from
          trusted local providers. Rent by the day, week, or month.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" asChild className="group gap-2 px-8 text-base shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30">
            <Link href="/gear">
              Browse Gear
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="gap-2 px-8 text-base backdrop-blur-sm">
            <Link href="/register">Become a Provider</Link>
          </Button>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-8 sm:gap-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex -space-x-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="font-medium">4.9/5</span>
            <span>rating</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="size-4" />
            <span className="font-medium">10,000+</span>
            <span>active users</span>
          </div>
          <div className="h-4 w-px bg-border hidden sm:block" />
          <div className="items-center gap-2 text-sm text-muted-foreground hidden sm:flex">
            <Package className="size-4" />
            <span className="font-medium">2,500+</span>
            <span>gear listed</span>
          </div>
        </div>
      </div>
    </section>
  )
}
