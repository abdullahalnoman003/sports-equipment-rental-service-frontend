import { fetchAllGear, fetchAllCategories } from "../_actions/gear"
import { GearClient } from "../_components/gear/gear-client"
import type { Gear, Category } from "@/lib/types"

export const revalidate = 60

export default async function GearPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const [gearRes, catRes] = await Promise.all([
    fetchAllGear({ next: { revalidate: 60 } }),
    fetchAllCategories({ next: { revalidate: 60 } }),
  ])

  const gear = gearRes.success ? (gearRes.data as Gear[]) : []
  const categories = catRes.success ? (catRes.data as Category[]).map((c) => c.name) : []

  const initialCategory = category && categories.includes(category) ? category : undefined

  return <GearClient gear={gear} categories={categories} initialCategory={initialCategory} />
}
