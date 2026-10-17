import { Hero } from "@/components/home/hero"
import { StatsStrip } from "@/components/home/stats"
import { TrustStrip } from "@/components/home/trust-strip"
import { Features } from "@/components/home/features"
import { Services } from "@/components/home/services"
import { FeaturedGear } from "@/components/home/featured-gear"
import { HowItWorks } from "@/components/home/how-it-works"
import { TrendingGear } from "@/components/home/trending-gear"
import { RecommendedGear } from "@/components/ai/recommended-gear"
import { ProviderSpotlight } from "@/components/home/provider-spotlight"
import { BlogHighlights } from "@/components/home/blog-highlights"
import { Newsletter } from "@/components/home/newsletter"
import { Faq } from "@/components/home/faq"
import { Cta } from "@/components/home/cta"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata(
  "Rent Sports & Outdoor Gear in Bangladesh",
  "Rent sports and outdoor equipment by the day across Bangladesh. From bicycles and camping tents to cricket bats. Book securely with GearUp and pay with Stripe.",
  "/"
)

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <TrustStrip />
      <Features />
      <Services />
      <FeaturedGear />
      <HowItWorks />
      <TrendingGear />
      {/* Section 9: personalised recommendations, ranked from real rental history. */}
      <RecommendedGear />
      <ProviderSpotlight />
      <BlogHighlights />
      <Newsletter />
      <Faq />
      <Cta />
    </>
  )
}