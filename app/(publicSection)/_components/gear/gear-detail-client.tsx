"use client"

import { useState } from "react"
import Image from "next/image"
import { Package, ZoomIn } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Gear } from "@/lib/types"

interface GearDetailClientProps {
  gear: Gear
}

export function GearDetailClient({ gear }: GearDetailClientProps) {
  const [imgError, setImgError] = useState(false)
  const hasImage = gear.image && !imgError && (gear.image.startsWith("http://") || gear.image.startsWith("https://"))
  const inStock = gear.quantity > 0

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border bg-muted/40 shadow-xl shadow-primary/5">
      <div className="relative aspect-[16/10] w-full sm:aspect-[4/3]">
        {hasImage ? (
          <Image
            src={gear.image!}
            alt={gear.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-3">
            <div className="flex size-20 items-center justify-center rounded-3xl bg-primary/10">
              <Package className="size-10 text-primary/60" />
            </div>
            <span className="text-sm text-muted-foreground">No image available</span>
          </div>
        )}

        {/* Soft gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60" />

        {/* Floating availability badge */}
        <div className="absolute left-4 top-4">
          <Badge
            className={cn(
              "gap-1.5 border-none px-3.5 py-1.5 text-xs shadow-lg backdrop-blur-sm",
              inStock ? "bg-white/95 text-emerald-700" : "bg-white/95 text-red-600"
            )}
          >
            <span className={cn("size-1.5 rounded-full", inStock ? "bg-emerald-500 animate-pulse" : "bg-red-500")} />
            {inStock ? `${gear.quantity} available` : "Out of stock"}
          </Badge>
        </div>

        {/* Hover hint */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/40 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 sm:opacity-0">
          <ZoomIn className="size-3.5" />
          Hover to zoom
        </div>
      </div>
    </div>
  )
}
