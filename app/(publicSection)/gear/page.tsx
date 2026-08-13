import { fetchAllGear, fetchAllCategories } from "../_actions/gear"
import { GearClient } from "../_components/gear/gear-client"
import { pageMetadata } from "@/lib/seo"
import type { Gear, Category } from "@/lib/types"

export const revalidate = 60

export const metadata = pageMetadata(
  "Browse Gear",
  "Browse sports and outdoor gear for rent across Bangladesh. Filter by category, brand, and price, then book by the day with secure Stripe payment.",
  "/gear"
)

export default async function GearPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; minimumPrice?: string; maximumPrice?: string }>
}) {
  const { category, minimumPrice, maximumPrice } = await searchParams

  const params = new URLSearchParams()
  if (category && category !== "All") params.set("category", category)
  if (minimumPrice) params.set("minimumPrice", minimumPrice)
  if (maximumPrice) params.set("maximumPrice", maximumPrice)
  const query = params.toString()

  const [gearRes, catRes] = await Promise.all([
    fetchAllGear(query, { next: { revalidate: 60 } }),
    fetchAllCategories({ next: { revalidate: 60 } }),
  ])

  const gear = gearRes.success ? (gearRes.data as Gear[]) : []
  const categories = catRes.success ? (catRes.data as Category[]).map((c) => c.name) : []

  const initialCategory = category && categories.includes(category) ? category : undefined
  const initialMinPrice = minimumPrice ? Number(minimumPrice) : undefined
  const initialMaxPrice = maximumPrice ? Number(maximumPrice) : undefined

  return (
    <GearClient
      gear={gear}
      categories={categories}
      initialCategory={initialCategory}
      initialMinPrice={initialMinPrice}
      initialMaxPrice={initialMaxPrice}
    />
  )
}
