import {
  Bike,
  Tent,
  Dumbbell,
  Gamepad2,
  Volleyball,
  Mountain,
  Waves,
  CircleDot,
  MoreHorizontal,
  Plane,
  ArrowRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { fetchAllCategories } from "@/app/(publicSection)/_actions/gear"
import { SectionHeading } from "@/components/shared/page-hero"
import type { Category } from "@/lib/types"

const categoryStyles: Record<
  string,
  {
    icon: React.ElementType
    color: string
  }
> = {
  Cycling: {
    icon: Bike,
    color: "text-blue-600 bg-blue-100 dark:bg-blue-950 dark:text-blue-400",
  },
  Camping: {
    icon: Tent,
    color: "text-green-600 bg-green-100 dark:bg-green-950 dark:text-green-400",
  },
  Fitness: {
    icon: Dumbbell,
    color: "text-purple-600 bg-purple-100 dark:bg-purple-950 dark:text-purple-400",
  },
  "Water Sports": {
    icon: Waves,
    color: "text-cyan-600 bg-cyan-100 dark:bg-cyan-950 dark:text-cyan-400",
  },
  Hiking: {
    icon: Mountain,
    color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-400",
  },
  Football: {
    icon: Volleyball,
    color: "text-orange-600 bg-orange-100 dark:bg-orange-950 dark:text-orange-400",
  },
  Cricket: {
    icon: CircleDot,
    color: "text-red-600 bg-red-100 dark:bg-red-950 dark:text-red-400",
  },
  Tennis: {
    icon: Gamepad2,
    color: "text-yellow-600 bg-yellow-100 dark:bg-yellow-950 dark:text-yellow-400",
  },
  Other: {
    icon: MoreHorizontal,
    color: "text-gray-600 bg-gray-100 dark:bg-gray-950 dark:text-gray-400",
  },
  SkyDiving: {
    icon: Plane,
    color: "text-indigo-600 bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-400",
  },
}

export const revalidate = 60

export async function Services() {
  const res = await fetchAllCategories({ next: { revalidate: 60 } })
  const categories = res.success ? (res.data as Category[]) : []

  return (
    <section className="relative bg-muted/40 px-4 py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Categories"
          title={
            <>
              Popular{" "}
              <span className="text-gradient-brand">Categories</span>
            </>
          }
          description="Explore gear across top sports and outdoor categories, hand-picked from trusted local providers."
        />

        {categories.length === 0 ? (
          <div className="py-10 text-center text-muted-foreground">
            No categories found.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, i) => {
              const style = categoryStyles[category.name]
              const Icon = style?.icon || MoreHorizontal
              const color = style?.color || "text-primary bg-primary/10"
              const hasImage =
                category.image && category.image.startsWith("http")

              return (
                <Link
                  key={category.id}
                  href={`/gear?category=${encodeURIComponent(category.name)}`}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 animate-fade-up"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  {hasImage && (
                    <Image
                      src={category.image!}
                      alt={category.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="absolute inset-0 object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-25"
                    />
                  )}

                  <div className="relative flex items-start gap-4 p-6">
                    <div
                      className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${color} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}
                    >
                      <Icon className="size-6" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold transition-colors group-hover:text-primary">
                          {category.name}
                        </h3>
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                          <ArrowRight className="size-4" />
                        </span>
                      </div>

                      <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                        {category.description || "Browse gear in this category"}
                      </p>
                    </div>
                  </div>

                  <div className="relative h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-primary to-gold transition-transform duration-500 group-hover:scale-x-100" />
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
