import { HeroSlider, type HeroSlide } from "./hero-slider"
import { fetchFeaturedGear, fetchPlatformStats } from "@/app/(publicSection)/_actions/stats"

export const revalidate = 300

export async function Hero() {
  const [stats, featured] = await Promise.all([fetchPlatformStats(), fetchFeaturedGear(4)])

  const spotlight = featured.find((g) => g.image?.startsWith("http")) ?? featured[0]

  const slides: HeroSlide[] = [
    {
      id: "rent",
      eyebrow:
        stats.fromPrice !== null
          ? `Gear from ৳${stats.fromPrice.toLocaleString()} per day`
          : "Sports & outdoor gear rental",
      headline: "Rent the gear you need,",
      highlight: "when you need it",
      description:
        "Bicycles, camping kits, cricket gear and fitness equipment from verified local providers. Pick your dates, pay securely, and get straight to it.",
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=2000&q=80",
      alt: "Mountain biker riding a forest trail",
      primaryCta: { label: "Browse Gear", href: "/gear" },
      secondaryCta: { label: "Become a Provider", href: "/register" },
      badge: stats.gearListings
        ? { value: `${stats.gearListings.toLocaleString()}`, label: "live listings" }
        : undefined,
    },
    {
      id: "provider",
      eyebrow: "For gear owners",
      headline: "List your gear.",
      highlight: "Earn every weekend",
      description:
        "Turn equipment that sits idle into monthly income. You control the price, the availability and the calendar — we handle payments, status tracking and reviews.",
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=80",
      alt: "Camping tent pitched beside a lake at dusk",
      primaryCta: { label: "Start Listing", href: "/register" },
      secondaryCta: { label: "See How It Works", href: "/how-it-works" },
      badge: stats.providers
        ? { value: `${stats.providers}`, label: "active providers" }
        : undefined,
    },
    {
      id: "trust",
      eyebrow: "Protected bookings",
      headline: "Secure payments,",
      highlight: "every single rental",
      description:
        "Stripe handles every transaction, deposits are protected, and both renters and owners rate each other after the gear comes home. No awkward cash handovers.",
      image:
        "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=2000&q=80",
      alt: "Sports equipment arranged on a training ground",
      primaryCta: { label: "How It Works", href: "/how-it-works" },
      secondaryCta: { label: "Read the Terms", href: "/terms" },
      badge: stats.unitsAvailable
        ? { value: `${stats.unitsAvailable.toLocaleString()}`, label: "units available now" }
        : undefined,
    },
  ]

  // Dynamic slide built from the live catalog.
  if (spotlight) {
    slides.push({
      id: `spotlight-${spotlight.id}`,
      eyebrow: "Featured listing",
      headline: spotlight.name,
      highlight: `৳${spotlight.price.toLocaleString()} per day`,
      description: spotlight.description,
      image: spotlight.image!,
      alt: spotlight.name,
      primaryCta: { label: "View Details", href: `/gear/${spotlight.id}` },
      secondaryCta: {
        label: `More in ${spotlight.category_Name}`,
        href: `/gear?category=${encodeURIComponent(spotlight.category_Name)}`,
      },
      badge: spotlight.quantity > 0 ? { value: `${spotlight.quantity}`, label: "units available" } : undefined,
    })
  }

  return (
    <div className="relative">
      <HeroSlider slides={slides} />

      {/* Visual flow into the next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent"
      />
    </div>
  )
}