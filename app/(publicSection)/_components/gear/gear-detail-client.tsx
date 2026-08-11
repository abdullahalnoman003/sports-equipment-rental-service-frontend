"use client"

import { useState } from "react"
import Image from "next/image"
import { Package } from "lucide-react"
import type { Gear } from "@/lib/types"

interface GearDetailClientProps {
  gear: Gear
}

export function GearDetailClient({ gear }: GearDetailClientProps) {
  const [imgError, setImgError] = useState(false)
  const hasImage = gear.image && !imgError && (gear.image.startsWith("http://") || gear.image.startsWith("https://"))

  return (
    <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-muted/50 shadow-sm sm:aspect-[4/3]">
      {hasImage ? (
        <Image
          src={gear.image!}
          alt={gear.name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="flex size-full flex-col items-center justify-center gap-2">
          <Package className="size-12 text-muted-foreground/30" />
          <span className="text-sm text-muted-foreground">No image available</span>
        </div>
      )}
    </div>
  )
}
