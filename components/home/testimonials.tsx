import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Customer",
    quote:
      "I needed a mountain bike for a weekend trail ride. Found one nearby on GearUp, booked it in minutes, and saved hundreds compared to buying.",
    rating: 5,
    location: "Dhaka",
  },
  {
    name: "James Rodriguez",
    role: "Provider",
    quote:
      "I list my camping gear on GearUp and it pays for itself every season. The platform is easy to use and the rental flow is smooth.",
    rating: 5,
    location: "Chittagong",
  },
  {
    name: "Emily Chen",
    role: "Customer",
    quote:
      "Rented a full set of tennis gear for my holiday. Everything was exactly as described. The date picker made scheduling effortless.",
    rating: 5,
    location: "Sylhet",
  },
  {
    name: "Marcus Thompson",
    role: "Provider",
    quote:
      "As a fitness equipment owner, GearUp helps me earn from gear that would otherwise sit idle. Order management is straightforward.",
    rating: 5,
    location: "Rajshahi",
  },
]

export function Testimonials() {
  return (
    <section className="relative px-4 py-24" id="testimonials">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-primary/2 to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Loved by{" "}
            <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Renters & Providers
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            See what our community has to say about GearUp.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Quote icon */}
              <Quote className="mb-4 size-8 text-primary/20" />

              {/* Quote text */}
              <p className="text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Rating */}
              <div className="mt-4 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="size-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Author */}
              <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary transition-transform duration-300 group-hover:scale-110">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.role} &middot; {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
