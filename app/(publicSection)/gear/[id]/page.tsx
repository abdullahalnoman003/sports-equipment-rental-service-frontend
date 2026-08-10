import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, MapPin } from "lucide-react"
import { fetchGearById } from "../../_actions/gear"
import { GearDetailClient } from "../../_components/gear/gear-detail-client"
import type { Gear } from "@/lib/types"

export const revalidate = 60

export default async function GearDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const res = await fetchGearById(id, { next: { revalidate: 60 } })

  if (!res.success || !res.data) {
    notFound()
  }

  const gear = res.data as Gear

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/gear" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="size-4" />
        Back to Browse
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div>
          <GearDetailClient gear={gear} />

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
          <RentFormWrapper gear={gear} />
        </div>
      </div>
    </div>
  )
}

async function RentFormWrapper({ gear }: { gear: Gear }) {
  const { RentForm } = await import("../../_components/gear/rent-form")
  return <RentForm gear={gear} />
}
