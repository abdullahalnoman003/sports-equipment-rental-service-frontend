"use client"

import { useEffect, useState } from "react"
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
import { api } from "@/service/api"

const categoryStyles: Record<
  string,
  {
    icon: React.ElementType
    color: string
  }
> = {
  Cycling: {
    icon: Bike,
    color:
      "text-blue-600 bg-blue-100 dark:bg-blue-950 dark:text-blue-400",
  },
  Camping: {
    icon: Tent,
    color:
      "text-green-600 bg-green-100 dark:bg-green-950 dark:text-green-400",
  },
  Fitness: {
    icon: Dumbbell,
    color:
      "text-purple-600 bg-purple-100 dark:bg-purple-950 dark:text-purple-400",
  },
  "Water Sports": {
    icon: Waves,
    color:
      "text-cyan-600 bg-cyan-100 dark:bg-cyan-950 dark:text-cyan-400",
  },
  Hiking: {
    icon: Mountain,
    color:
      "text-emerald-600 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-400",
  },
  Football: {
    icon: Volleyball,
    color:
      "text-orange-600 bg-orange-100 dark:bg-orange-950 dark:text-orange-400",
  },
  Cricket: {
    icon: CircleDot,
    color:
      "text-red-600 bg-red-100 dark:bg-red-950 dark:text-red-400",
  },
  Tennis: {
    icon: Gamepad2,
    color:
      "text-yellow-600 bg-yellow-100 dark:bg-yellow-950 dark:text-yellow-400",
  },
  Other: {
    icon: MoreHorizontal,
    color:
      "text-gray-600 bg-gray-100 dark:bg-gray-950 dark:text-gray-400",
  },
  SkyDiving: {
    icon: Plane,
    color:
      "text-indigo-600 bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-400",
  },
}

type Category = {
  id: string
  name: string
  description: string
  image: string
}

export function Services() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api<Category[]>("/api/category")
        if (res.success) {
          setCategories(res.data)
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return (
    <section className="relative px-4 py-20">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Categories
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Popular{" "}
            <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Categories
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Explore gear across top sports and outdoor categories.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-32 animate-pulse rounded-2xl border border-border bg-muted"
              />
            ))}
          </div>
        )}

        {/* Categories */}
        {!loading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const style = categoryStyles[category.name]

              const Icon = style?.icon || MoreHorizontal

              const color =
                style?.color ||
                "text-primary bg-primary/10"

              return (
                <a
                  key={category.id}
                  href={`/gear?category=${encodeURIComponent(
                    category.name
                  )}`}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${color} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="size-6" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold transition-colors group-hover:text-primary">
                          {category.name}
                        </h3>

                        <ArrowRight className="size-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </div>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Category image */}
                  {category.image &&
                    category.image.startsWith("http") && (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-30"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                </a>
              )
            })}
          </div>
        )}

        {/* Empty state */}
        {!loading && categories.length === 0 && (
          <div className="py-10 text-center text-muted-foreground">
            No categories found.
          </div>
        )}
      </div>
    </section>
  )
}