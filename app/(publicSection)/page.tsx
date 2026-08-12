import { Hero } from "@/components/home/hero"
import { StatsStrip } from "@/components/home/stats"
import { Features } from "@/components/home/features"
import { HowItWorks } from "@/components/home/how-it-works"
import { Services } from "@/components/home/services"
import { Testimonials } from "@/components/home/testimonials"
import { Faq } from "@/components/home/faq"
import { Cta } from "@/components/home/cta"

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <Features />
      <HowItWorks />
      <Services />
      <Testimonials />
      <Faq />
      <Cta />
    </>
  )
}
