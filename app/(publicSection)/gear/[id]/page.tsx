/* eslint-disable @next/next/no-img-element */
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Package, MapPin, Loader2 } from "lucide-react"
import { RentForm } from "../../_components/gear/rent-form"
import { fetchGearById } from "../../_actions/gear"
import toast from "react-hot-toast"
import type { Gear } from "@/lib/types"

export default function GearDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [gear, setGear] = useState<Gear | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    async function fetchGear() {
      try {
        const res = await fetchGearById(id)
        if (res.success) setGear(res.data as Gear)
        else {
          setError(res.message || "Gear not found")
          toast.error(res.message || "Gear not found")
        }
      } catch {
        const msg = "Failed to load gear"
        setError(msg)
        toast.error(msg)
      } finally {
        setLoading(false)
      }
    }
    fetchGear()
  }, [id])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Loader2 className="mb-4 size-8 animate-spin text-muted-foreground" />
        <p className="text-muted-foreground">Loading gear details...</p>
      </div>
    )
  }

  if (error || !gear) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <Link href="/gear" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="size-4" />
          Back to Browse
        </Link>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Package className="mb-4 size-12 text-muted-foreground/50" />
          <p className="text-lg font-medium">Gear not found</p>
          <p className="text-sm text-muted-foreground">{error || "The item you are looking for does not exist."}</p>
        </div>
      </div>
    )
  }

  const hasImage = gear.image && !imgError

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/gear" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="size-4" />
        Back to Browse
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div>
          {/* Image */}
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

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {gear.category_Name}
            </span>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${
              gear.quantity > 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}>
              {gear.quantity > 0 ? `${gear.quantity} available` : "Out of stock"}
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight mt-2">{gear.name}</h1>
          <p className="text-lg text-muted-foreground mt-1">{gear.brand}</p>

          <div className="mt-6 space-y-4">
            <h2 className="text-lg font-semibold">Description</h2>
            <p className="text-muted-foreground leading-relaxed">{gear.description}</p>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-card p-4">
            <h3 className="text-sm font-semibold mb-3">Provider</h3>
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {gear.provider_email.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium">{gear.provider_email}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="size-3" />
                  Local provider
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <RentForm gear={gear} />
        </div>
      </div>
    </div>
  )
}
