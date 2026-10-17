import { fetchAllGear, fetchAllCategories } from "../_actions/gear"
import { fetchRatingSummary } from "../_actions/reviews"
import { GearClient } from "../_components/gear/gear-client"
import { pageMetadata } from "@/lib/seo"
import type { Gear, Category } from "@/lib/types"

export const revalidate = 60

export const metadata = pageMetadata(
  "Browse Gear",
  "Browse sports and outdoor gear for rent across Bangladesh. Filter by category, brand, availability, rating and price, then book by the day with secure Stripe payment.",
  "/gear"
)

export default async function GearPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string
    minimumPrice?: string
    maximumPrice?: string
    brand?: string
    inStock?: string
    minRating?: string
  }>
}) {
  const { category, minimumPrice, maximumPrice, brand, inStock, minRating } =
    await searchParams

  // The whole catalog is fetched once and filtered on the client. The dataset is
  // small, and doing it this way keeps availability and rating filters instant and
  // consistent with the ones the API supports.
  const [gearRes, catRes, ratings] = await Promise.all([
    fetchAllGear("", { next: { revalidate: 60 } }),
    fetchAllCategories({ next: { revalidate: 60 } }),
    fetchRatingSummary(),
  ])

  const gear = gearRes.success ? (gearRes.data as Gear[]) : []
  const categories = catRes.success ? (catRes.data as Category[]).map((c) => c.name) : []

  const brands = Array.from(new Set(gear.map((g) => g.brand).filter(Boolean))).sort((a, b) =>
    a.localeCompare(b)
  )

  const initialCategory = category && categories.includes(category) ? category : undefined
  const initialBrand = brand && brands.includes(brand) ? brand : undefined
  const initialMinPrice = minimumPrice ? Number(minimumPrice) : undefined
  const initialMaxPrice = maximumPrice ? Number(maximumPrice) : undefined
  const initialInStock = inStock === "1" ? true : undefined
  const parsedRating = minRating ? Number(minRating) : 0
  const initialMinRating = parsedRating === 4 || parsedRating === 3 ? parsedRating : undefined

  return (
    <GearClient
      gear={gear}
      categories={categories}
      brands={brands}
      ratings={ratings}
      initialCategory={initialCategory}
      initialMinPrice={initialMinPrice}
      initialMaxPrice={initialMaxPrice}
      initialBrand={initialBrand}
      initialInStock={initialInStock}
      initialMinRating={initialMinRating}
    />
  )
}
