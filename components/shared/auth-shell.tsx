import Link from "next/link"
import Image from "next/image"
import { Star, ShieldCheck, Headset } from "lucide-react"
import { Logo } from "@/components/shared/logo"

interface AuthShellProps {
  eyebrow: string
  title: string
  subtitle: string
  children: React.ReactNode
  footer: React.ReactNode
}

const bullets = [
  { icon: Star, text: "Thousands of gear items from trusted local providers" },
  { icon: ShieldCheck, text: "Payments secured end to end with Stripe" },
  { icon: Headset, text: "Friendly support available 7 days a week" },
]

export function AuthShell({ eyebrow, title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-background">
      {/* Visual panel */}
      <div className="relative hidden overflow-hidden lg:flex lg:w-[46%] xl:w-1/2">
        <Image
          src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1400&q=80"
          alt="Camping gear laid out on a wooden table in the outdoors"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 46vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/80 to-emerald-950/95" />
        <div className="absolute inset-0 bg-grid-faint [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:3rem_3rem]" />

        <div className="relative z-10 flex h-full flex-col justify-between p-12">
          <Link href="/" aria-label="GearUp home">
            <span className="flex w-fit items-center gap-2.5 text-white">
              <LogoMarkWhite />
              <span className="text-xl font-bold tracking-tight">
                GearUp<span className="text-white/70">.</span>
              </span>
            </span>
          </Link>

          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/90 backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-white animate-pulse" />
              Gear rental, made simple
            </span>
            <h2 className="mt-5 max-w-md text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
              Your next adventure starts here
            </h2>
            <p className="mt-4 max-w-md text-white/80">
              Rent sports and outdoor gear by the day, or list your own equipment
              and start earning.
            </p>

            <ul className="mt-8 space-y-3">
              {bullets.map((b) => (
                <li key={b.text} className="flex items-center gap-3 text-sm text-white/90">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                    <b.icon className="size-4" />
                  </span>
                  {b.text}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
              <div className="flex -space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="size-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-sm text-white/90">
                Rated <span className="font-bold">4.9/5</span> by 12,000+ happy renters
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="relative flex flex-1 items-center justify-center px-4 py-12 sm:px-8">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 -top-32 size-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="relative w-full max-w-md">
          <Link href="/" className="mb-8 flex justify-center lg:hidden" aria-label="GearUp home">
            <Logo />
          </Link>

          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-primary" />
              {eyebrow}
            </span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
            <p className="mt-2 text-muted-foreground">{subtitle}</p>
          </div>

          <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5 sm:p-8">
            {children}
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
        </div>
      </div>
    </div>
  )
}

function LogoMarkWhite() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-9" aria-hidden="true">
      <rect x="1.5" y="1.5" width="45" height="45" rx="14" fill="white" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <rect key={deg} x="22.4" y="7" width="3.2" height="8.5" rx="1.6" fill="var(--primary)" transform={`rotate(${deg} 24 24)`} />
      ))}
      <circle cx="24" cy="24" r="9" fill="var(--primary)" />
      <path d="M24 18.5 29 23.5 24 28.5 22.8 27.3 26.1 24H19v-1h7.1L22.8 19.7 24 18.5Z" fill="white" />
    </svg>
  )
}
