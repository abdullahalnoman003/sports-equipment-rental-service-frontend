"use client"

import { useState } from "react"
import { Package } from "lucide-react"
import type { Gear } from "@/lib/types"

interface GearDetailClientProps {
  gear: Gear
}

export function GearDetailClient({ gear }: GearDetailClientProps) {
  const [imgError, setImgError] = useState(false)
  const hasImage = gear.image && !imgError

  return (
    <div className="mb-6 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted/50">
      {hasImage ? (
        <img
          src={gear.image!}
          alt={gear.name}
          className="size-full object-cover"
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
