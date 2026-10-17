"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface HeroSlide {
  id: string
  eyebrow: string
  headline: string
  highlight: string
  description: string
  image: string
  alt: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  badge?: { value: string; label: string }
}

const AUTOPLAY_MS = 6000

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const regionRef = useRef<HTMLDivElement>(null)

  const count = slides.length
  const active = slides[index]

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return
      setIndex(((next % count) + count) % count)
      setProgress(0)
    },
    [count]
  )

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  // Autoplay + progress bar
  useEffect(() => {
    if (!playing || count <= 1) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const startedAt = performance.now() - progress * AUTOPLAY_MS

    const tick = () => {
      const elapsed = performance.now() - startedAt
      if (elapsed >= AUTOPLAY_MS) {
        goTo(index + 1)
        return
      }
      setProgress(elapsed / AUTOPLAY_MS)
    }

    const timer = window.setInterval(tick, 60)
    return () => window.clearInterval(timer)
    // `progress` is intentionally read once at schedule time, not tracked.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, index, count, goTo])

  // Keyboard navigation
  useEffect(() => {
    const node = regionRef.current
    if (!node) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault()
        next()
      } else if (event.key === "ArrowLeft") {
        event.preventDefault()
        prev()
      }
    }

    node.addEventListener("keydown", onKeyDown)
    return () => node.removeEventListener("keydown", onKeyDown)
  }, [next, prev])

  if (!active) return null

  return (
    <section
      ref={regionRef}
      aria-roledescription="carousel"
      aria-label="Featured highlights"
      tabIndex={-1}
      className="relative isolate flex h-[60vh] min-h-[440px] max-h-[680px] w-full overflow-hidden sm:h-[64vh] lg:h-[68vh]"
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => setPlaying(true)}
      onFocusCapture={() => setPlaying(false)}
      onBlurCapture={() => setPlaying(true)}
    >
      {/* Slide backgrounds */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${count}: ${slide.headline}`}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1200ms] ease-out motion-reduce:transition-none",
            i === index ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={cn(
              "object-cover transition-transform duration-[8000ms] ease-out motion-reduce:transition-none",
              i === index ? "scale-105" : "scale-100"
            )}
          />
        </div>
      ))}

      {/* Readability scrim */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />

      {/* Content */}
      <div className="relative mx-auto flex w-full max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div key={`copy-${active.id}`} className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-sm backdrop-blur-sm">
              <span className="size-2 animate-pulse rounded-full bg-primary" />
              <span className="text-muted-foreground">{active.eyebrow}</span>
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {active.headline}{" "}
              <span className="text-gradient-brand">{active.highlight}</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {active.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="group gap-2 px-8 text-base shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
              >
                <Link href={active.primaryCta.href} tabIndex={-1}>
                  {active.primaryCta.label}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              {active.secondaryCta && (
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="gap-2 bg-background/60 px-8 text-base backdrop-blur-sm"
                >
                  <Link href={active.secondaryCta.href} tabIndex={-1}>
                    {active.secondaryCta.label}
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {active.badge && (
            <div className="mt-10 inline-flex items-center gap-4 rounded-2xl border border-border bg-card/90 px-5 py-3.5 shadow-lg backdrop-blur-sm animate-fade-up [animation-delay:400ms]">
              <span className="text-2xl font-bold leading-none text-primary">{active.badge.value}</span>
              <span className="text-sm text-muted-foreground">{active.badge.label}</span>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      {count > 1 && (
        <>
          <div className="absolute inset-x-4 bottom-5 mx-auto flex max-w-7xl items-center justify-between gap-4 sm:inset-x-6 lg:inset-x-8">
            <div className="flex items-center gap-2.5">
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}: ${slide.highlight}`}
                  aria-current={i === index}
                  className="group/dot py-2"
                >
                  <span
                    className={cn(
                      "block h-1 rounded-full transition-all duration-300",
                      i === index
                        ? "w-10 bg-primary"
                        : "w-5 bg-muted-foreground/35 group-hover/dot:bg-muted-foreground/70"
                    )}
                  />
                </button>
              ))}

              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                className="ml-1 flex size-7 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                {playing ? <Pause className="size-3" /> : <Play className="size-3" />}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                aria-label="Previous slide"
                className="size-10 rounded-full bg-background/70 backdrop-blur-sm"
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={next}
                aria-label="Next slide"
                className="size-10 rounded-full bg-background/70 backdrop-blur-sm"
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>

          {/* Autoplay progress */}
          {playing && (
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-0.5 bg-border/60"
            >
              <div
                className="h-full bg-gradient-to-r from-primary to-gold motion-reduce:hidden"
                style={{ width: `${Math.min(100, progress * 100)}%` }}
              />
            </div>
          )}
        </>
      )}
    </section>
  )
}