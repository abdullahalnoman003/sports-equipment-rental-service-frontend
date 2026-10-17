import { ShieldCheck, CreditCard, BadgeCheck, Headset } from "lucide-react"
import { Section } from "@/components/shared/section"
import { brandTint } from "@/lib/brand"

const guarantees = [
  {
    icon: ShieldCheck,
    title: "Protected Payments",
    description:
      "Stripe secures every transaction so neither side ever hands over cash in person.",
  },
  {
    icon: BadgeCheck,
    title: "Two-Way Ratings",
    description:
      "Renters and providers both rate each other after a rental completes. Nothing is anonymous.",
  },
  {
    icon: CreditCard,
    title: "Deposits Held Safely",
    description:
      "Security deposits are held against the item and released once the gear comes home intact.",
  },
  {
    icon: Headset,
    title: "Damage Resolution",
    description:
      "Damage claims are reviewed against handover evidence, with a decision inside 48 hours.",
  },
]

export function TrustStrip() {
  return (
    <Section tone="muted" space="tight">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {guarantees.map((item, i) => (
          <div
            key={item.title}
            className="flex flex-col items-center gap-2 px-4 text-center animate-fade-up"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <span
              className={`flex size-11 items-center justify-center rounded-2xl transition-transform duration-300 hover:scale-110 ${brandTint(i)}`}
            >
              <item.icon className="size-5" />
            </span>
            <h3 className="text-sm font-bold">{item.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}