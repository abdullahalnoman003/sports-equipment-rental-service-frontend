import { cn } from "@/lib/utils"

interface PageHeroProps {
  eyebrow: string
  title: React.ReactNode
  description?: string
  children?: React.ReactNode
  className?: string
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden px-4 py-16 sm:py-20", className)}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 size-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute inset-0 bg-grid-faint [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)]" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
          <span className="size-1.5 rounded-full bg-primary" />
          {eyebrow}
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow: string
  title: React.ReactNode
  description?: string
  align?: "center" | "left"
  className?: string
}) {
  return (
    <div
      className={cn(
        "mb-12 max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
        <span className="size-1.5 rounded-full bg-primary" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-muted-foreground sm:text-lg">{description}</p>
      )}
    </div>
  )
}
