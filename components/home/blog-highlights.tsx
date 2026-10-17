import Link from "next/link"
import { ArrowRight, CalendarDays, Clock3, Newspaper } from "lucide-react"
import { SectionHeading } from "@/components/shared/page-hero"
import { Section } from "@/components/shared/section"
import { Button } from "@/components/ui/button"
import { brandTint } from "@/lib/brand"
import { formatPostDate, getLatestPosts } from "@/content/blog"

export function BlogHighlights() {
  const posts = getLatestPosts(3)

  if (posts.length === 0) return null

  return (
    <Section id="blog" tone="plain">
      <SectionHeading
          eyebrow="From the Blog"
          title={
            <>
              Guides from people who{" "}
              <span className="text-gradient-brand">rent and own gear</span>
            </>
          }
          description="Practical writing on pricing, safety and getting the most out of every rental season."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {posts.map((post, i) => (
            <article
              key={post.slug}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 animate-fade-up"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              {/* Cover band */}
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
                    {post.readMinutes} min read
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-bold leading-snug transition-colors group-hover:text-primary">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>

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

        <div className="mt-8 flex justify-center">
          <Button asChild size="lg" variant="outline" className="group gap-2 rounded-full px-8">
            <Link href="/blog">
              All articles
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
    </Section>
  )
}