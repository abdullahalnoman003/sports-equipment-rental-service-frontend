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
    <div className="mb-6 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted/50">
      {hasImage ? (
        <Image
          src={gear.image!}
          alt={gear.name}
          fill
          className="object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="flex size-full items-center justify-center">
          <Package className="size-16 text-muted-foreground/30" />
        </div>
      )}
    </div>
  )
}
