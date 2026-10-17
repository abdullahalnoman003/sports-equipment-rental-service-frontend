import Link from "next/link"
import { ArrowRight, CalendarDays, Clock3, Newspaper, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageHero } from "@/components/shared/page-hero"
import { pageMetadata } from "@/lib/seo"
import { brandTint } from "@/lib/brand"
import { BLOG_CATEGORIES, BLOG_POSTS, formatPostDate } from "@/content/blog"

export const metadata = pageMetadata(
  "Gear Rental Blog",
  "Practical guides on gear rental pricing, provider listings, trip preparation and safety from the GearUp team.",
  "/blog"
)

const ALL = "All"

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>
}) {
  const { category, q } = await searchParams

  const activeCategory = category && BLOG_CATEGORIES.includes(category) ? category : ALL
  const query = (q ?? "").trim().toLowerCase()

  const posts = BLOG_POSTS.filter((post) => {
    if (activeCategory !== ALL && post.category !== activeCategory) return false
    if (!query) return true
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query))
    )
  })

  const buildHref = (nextCategory: string, nextQuery: string) => {
    const params = new URLSearchParams()
    if (nextCategory !== ALL) params.set("category", nextCategory)
    if (nextQuery) params.set("q", nextQuery)
    const qs = params.toString()
    return qs ? `/blog?${qs}` : "/blog"
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <PageHero
        eyebrow="Blog"
        title={
          <>
            The GearUp <span className="text-gradient-brand">Journal</span>
          </>
        }
        description="Guides on renting smarter, listing better, and getting your gear safely from handover to return."
      />

      {/* Filters */}
      <div className="mb-10 space-y-5">
        <div className="relative mx-auto max-w-md">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <form action="/blog" method="get">
            {activeCategory !== ALL && (
              <input type="hidden" name="category" value={activeCategory} />
            )}
            <Input
              type="search"
              name="q"
              defaultValue={q ?? ""}
              placeholder="Search articles..."
              aria-label="Search articles"
              className="h-11 rounded-full border-border bg-background pl-11 pr-10"
            />
          </form>
          {q && (
            <Link
              href={buildHref(activeCategory, "")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-4" />
            </Link>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {[ALL, ...BLOG_CATEGORIES].map((name) => {
            const active = activeCategory === name
            return (
              <Link
                key={name}
                href={buildHref(name, q ?? "")}
                aria-current={active ? "page" : undefined}
                className={`inline-flex h-9 items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-all ${
                  active
                    ? "border-transparent bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "border-border bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {active && <span className="size-1.5 rounded-full bg-current" />}
                {name}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-24 text-center">
          <div className="flex size-20 items-center justify-center rounded-3xl bg-primary/10">
            <Newspaper className="size-9 text-primary" />
          </div>
          <h2 className="mt-6 text-2xl font-bold tracking-tight">No articles found</h2>
          <p className="mt-2 max-w-sm text-muted-foreground">
            We could not find anything matching your search. Try a different keyword or browse all
            categories.
          </p>
          <Button variant="outline" className="mt-6 gap-2" asChild>
            <Link href="/blog">Reset filters</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <article
                key={post.slug}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 animate-fade-up"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="relative h-32 overflow-hidden bg-gradient-to-br from-primary/15 via-card to-gold/10">
                  <div className="absolute inset-0 bg-dots-faint [mask-image:radial-gradient(ellipse_70%_100%_at_50%_0%,#000_40%,transparent_100%)]" />
                  <span
                    className={`absolute left-6 top-6 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${brandTint(i)}`}
                  >
                    <Newspaper className="size-3.5" />
                    {post.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-3.5" />
                      {formatPostDate(post.publishedAt)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="size-3.5" />
                      {post.readMinutes} min
                    </span>
                  </div>

                  <h2 className="mt-3 text-lg font-bold leading-snug transition-colors group-hover:text-primary">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-primary"
                  >
                    Read article
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{posts.length}</span> of{" "}
            {BLOG_POSTS.length} articles
          </p>
        </>
      )}
    </div>
  )
}