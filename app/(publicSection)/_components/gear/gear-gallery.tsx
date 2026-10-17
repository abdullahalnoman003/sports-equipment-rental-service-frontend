"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Package, X, ZoomIn } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { normaliseGearImages } from "@/lib/gear-images"
import type { Gear } from "@/lib/types"

interface GearGalleryProps {
  gear: Pick<Gear, "id" | "name" | "image" | "images" | "quantity">
}

export function GearGallery({ gear }: GearGalleryProps) {
  const images = normaliseGearImages(gear)
  const [index, setIndex] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const inStock = gear.quantity > 0
  const count = images.length

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count]
  )

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false)
      if (e.key === "ArrowRight") go(index + 1)
      if (e.key === "ArrowLeft") go(index - 1)
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [lightbox, index, go])

  if (count === 0) {
    return (
      <div className="group relative overflow-hidden rounded-3xl border border-border bg-muted/40 shadow-xl shadow-primary/5">
        <div className="relative flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 sm:aspect-[4/3]">
          <div className="flex size-20 items-center justify-center rounded-3xl bg-primary/10">
            <Package className="size-10 text-primary/60" />
          </div>
          <span className="text-sm text-muted-foreground">No image available</span>
        </div>
      </div>
    )
  }

  const active = images[index]

  return (
    <div className="space-y-3">
      {/* Main viewer */}
      <div className="group relative overflow-hidden rounded-3xl border border-border bg-muted/40 shadow-xl shadow-primary/5">
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="relative block aspect-[16/10] w-full cursor-zoom-in sm:aspect-[4/3]"
          aria-label={`Open image ${index + 1} of ${count} full screen`}
        >
          <Image
            src={active}
            alt={gear.name}
            fill
            priority={index === 0}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

          <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0 sm:opacity-0">
            <ZoomIn className="size-3.5" />
            Full screen
          </span>
        </button>

        {/* Availability */}
        <div className="absolute left-4 top-4">
          <Badge
            className={cn(
              "gap-1.5 border-none px-3.5 py-1.5 text-xs shadow-lg backdrop-blur-sm",
              inStock ? "bg-white/95 text-primary" : "bg-white/95 text-destructive"
            )}
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                inStock ? "bg-primary animate-pulse" : "bg-destructive"
              )}
            />
            {inStock ? `${gear.quantity} available` : "Out of stock"}
          </Badge>
        </div>

        {/* Arrows */}
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg backdrop-blur-sm transition-all hover:bg-background focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg backdrop-blur-sm transition-all hover:bg-background focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ChevronRight className="size-4" />
            </button>
          </>
        )}

        {/* Counter */}
        {count > 1 && (
          <span className="absolute bottom-4 left-4 rounded-full bg-black/45 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {index + 1} / {count}
          </span>
        )}
      </div>

      {/* Thumbnails */}
      {count > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "relative aspect-square overflow-hidden rounded-xl border-2 transition-all",
                i === index
                  ? "border-primary shadow-md shadow-primary/20"
                  : "border-border opacity-60 hover:opacity-100"
              )}
            >
              <Image src={src} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${gear.name} images`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 animate-fade-in"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            aria-label="Close full screen view"
            className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <X className="size-5" />
          </button>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  go(index - 1)
                }}
                aria-label="Previous image"
                className="absolute left-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  go(index + 1)
                }}
                aria-label="Next image"
                className="absolute right-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}

          <div
            className="relative h-[80vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active}
              alt={gear.name}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {count > 1 && (
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
              {index + 1} / {count}
            </p>
          )}
        </div>
      )}
    </div>
  )
}