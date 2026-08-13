"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Package, ArrowUpRight, CalendarDays, BadgeCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Gear } from "@/lib/types"

export interface GearCardProps {
  gear: Gear
}

export function GearCard({ gear }: GearCardProps) {
  const [imgError, setImgError] = useState(false)
  const hasImage = gear.image && !imgError && (gear.image.startsWith("http://") || gear.image.startsWith("https://"))
  const inStock = gear.quantity > 0

  return (
    <Link
      href={`/gear/${gear.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
    >
      {/* Image area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/50">
        {hasImage ? (
          <Image
            src={gear.image!}
            alt={gear.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2">
            <Package className="size-12 text-muted-foreground/30" />
            <span className="text-xs text-muted-foreground/70">No image available</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Availability badge */}
        <div className="absolute left-3 top-3">
          <Badge
            className={cn(
              "gap-1.5 border-none text-xs shadow-sm backdrop-blur-sm",
              inStock ? "bg-white/90 text-emerald-700" : "bg-white/90 text-red-600"
            )}
          >
            <span className={cn("size-1.5 rounded-full", inStock ? "bg-emerald-500" : "bg-red-500")} />
            {inStock ? `${gear.quantity} available` : "Out of stock"}
          </Badge>
        </div>

        {/* Category badge */}
        <div className="absolute right-3 top-3">
          <Badge className="border-none bg-black/40 text-white shadow-sm backdrop-blur-sm">
            {gear.category_Name}
          </Badge>
        </div>

        {/* Price pill */}
        <div className="absolute bottom-3 left-3 rounded-xl bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur-sm">
          <span className="text-lg font-bold leading-none text-black">৳{gear.price}</span>
          <span className="text-xs font-medium text-muted-black"> /day</span>
        </div>

        {/* Hover arrow */}
        <div className="absolute bottom-3 right-3 flex size-9 translate-y-2 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-4" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="min-w-0">
          <h3 className="truncate font-semibold leading-tight transition-colors group-hover:text-primary">
            {gear.name}
          </h3>
          <p className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
            <BadgeCheck className="size-3.5 shrink-0 text-primary" />
            <span className="truncate">{gear.brand}</span>
          </p>
        </div>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {gear.description}
        </p>

        <div className="mt-3 flex items-center justify-between border-t border-border/70 pt-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5 text-primary" />
            Rent by the day
          </span>
          <span className="font-medium text-primary transition-all group-hover:translate-x-0.5">
            View Details
          </span>
        </div>
      </div>
    </Link>
  )
}
