import { cn } from "@/lib/utils"

type Tone = "plain" | "muted" | "card"
type Space = "tight" | "normal" | "roomy"

/**
 * Shared vertical rhythm for every landing-page section.
 *
 * Before this existed each section hard-coded its own `py-20 sm:py-24`, so two
 * adjacent sections stacked ~192px of dead whitespace. Padding now lives in one
 * place and tones strictly alternate, so bands flow into each other instead of
 * floating apart.
 */

const TONES: Record<Tone, string> = {
  plain: "bg-background",
  muted: "bg-muted/40",
  card: "bg-card",
}

const SPACES: Record<Space, string> = {
  tight: "py-8 sm:py-10",
  normal: "py-12 sm:py-14 lg:py-16",
  roomy: "py-14 sm:py-16 lg:py-20",
}

interface SectionProps {
  id?: string
  tone?: Tone
  space?: Space
  className?: string
  innerClassName?: string
  children: React.ReactNode
}

export function Section({
  id,
  tone = "plain",
  space = "normal",
  className,
  innerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative px-4 sm:px-6 lg:px-8", TONES[tone], SPACES[space], className)}
    >
      <div className={cn("relative mx-auto max-w-7xl", innerClassName)}>{children}</div>
    </section>
  )
}