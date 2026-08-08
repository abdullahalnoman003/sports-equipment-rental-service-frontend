import { Bike, Tent, Dumbbell, Gamepad2, Volleyball, Mountain, ArrowRight } from "lucide-react"


const categories = [
  {
    icon: Bike,
    name: "Cycling",
    description: "Bicycles and cycling accessories.",
    href: "/gear?category=Cycling",
    color: "text-blue-600 bg-blue-100 dark:bg-blue-950 dark:text-blue-400",
    count: "200+ items",
  },
  {
    icon: Tent,
    name: "Camping",
    description: "Camping tents and outdoor equipment.",
    href: "/gear?category=Camping",
    color: "text-green-600 bg-green-100 dark:bg-green-950 dark:text-green-400",
    count: "150+ items",
  },
  {
    icon: Dumbbell,
    name: "Fitness",
    description: "Weights, resistance bands, and workout gear.",
    href: "/gear?category=Fitness",
    color: "text-purple-600 bg-purple-100 dark:bg-purple-950 dark:text-purple-400",
    count: "300+ items",
  },
  {
    icon: Volleyball,
    name: "Football",
    description: "Footballs, gloves, and training equipment.",
    href: "/gear?category=Football",
    color: "text-orange-600 bg-orange-100 dark:bg-orange-950 dark:text-orange-400",
    count: "180+ items",
  },
  {
    icon: Gamepad2,
    name: "Tennis",
    description: "Rackets, balls, and tennis accessories.",
    href: "/gear?category=Tennis",
    color: "text-yellow-600 bg-yellow-100 dark:bg-yellow-950 dark:text-yellow-400",
    count: "120+ items",
  },
  {
    icon: Mountain,
    name: "Hiking",
    description: "Backpacks, boots, and trail essentials.",
    href: "/gear?category=Hiking",
    color: "text-primary bg-primary/10",
    count: "250+ items",
  },
]

export function Services() {
  return (
    <section className="relative bg-muted/50 px-4 py-24" id="categories">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />
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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href={cat.href}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${cat.color} transition-transform duration-300 group-hover:scale-110`}>
                  <cat.icon className="size-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {cat.name}
                    </h3>
                    <ArrowRight className="size-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5" />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {cat.description}
                  </p>
                  <p className="mt-2 text-xs font-medium text-primary">
                    {cat.count}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
