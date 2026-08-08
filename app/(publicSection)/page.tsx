import { Hero } from "@/components/home/hero"
import { Features } from "@/components/home/features"
import { Services } from "@/components/home/services"
import { Testimonials } from "@/components/home/testimonials"
import { Faq } from "@/components/home/faq"
import { Cta } from "@/components/home/cta"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Services />
      <Testimonials />
      <Faq />
      <Cta />
    </>
  )
}
