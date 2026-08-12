import { Star, Quote, BadgeCheck } from "lucide-react"
import { SectionHeading } from "@/components/shared/page-hero"

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

const avatarColors = [
  "bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-300",
  "bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-300",
  "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-300",
  "bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-300",
]

export function Testimonials() {
  return (
    <section className="relative bg-muted/40 px-4 py-20 sm:py-24" id="testimonials">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              Loved by{" "}
              <span className="text-gradient-brand">Renters & Providers</span>
            </>
          }
          description="See what our community has to say about renting and earning with GearUp."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 animate-fade-up"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <Quote className="absolute -right-2 -top-2 size-20 text-primary/5 transition-transform duration-500 group-hover:scale-110" />

              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="size-4 fill-gold text-gold" />
                  ))}
                </div>
                <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  <BadgeCheck className="size-3" />
                  Verified
                </span>
              </div>

              <blockquote className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <span className={`flex size-11 items-center justify-center rounded-full text-sm font-bold ${avatarColors[i % avatarColors.length]}`}>
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.role} &middot; {t.location}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
