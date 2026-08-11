"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Package } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Gear } from "@/lib/types"

export interface GearCardProps {
  gear: Gear
}

export function GearCard({ gear }: GearCardProps) {
  const [imgError, setImgError] = useState(false)
  const hasImage = gear.image && !imgError && (gear.image.startsWith("http://") || gear.image.startsWith("https://"))

  return (
    <Link
      href={`/gear/${gear.id}`}
      className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary hover:shadow-md"
    >
      {/* Image area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/50">
        {hasImage ? (
          <Image
            src={gear.image!}
            alt={gear.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <Package className="size-12 text-muted-foreground/30" />
          </div>
        )}
        {/* Availability badge */}
        <div className="absolute right-2 top-2">
          <Badge
            variant="secondary"
            className={`text-xs ${
              gear.quantity > 0
                ? "bg-green-100 text-green-700 border-none"
                : "bg-red-100 text-red-700 border-none"
            }`}
          >
            {gear.quantity > 0 ? `${gear.quantity} available` : "Out of stock"}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold leading-tight group-hover:text-primary truncate">
              {gear.name}
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground truncate">{gear.brand}</p>
          </div>
          <Badge variant="secondary" className="shrink-0">
            {gear.category_Name}
          </Badge>
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {gear.description}
        </p>

        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
             <span className="text-lg font-bold text-primary">
             ৳{gear.price}
            <span className="text-xs font-normal text-muted-foreground">/day</span>
          </span>
          <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            View Details
          </span>
        </div>
      </div>
    </Link>
  )
}
