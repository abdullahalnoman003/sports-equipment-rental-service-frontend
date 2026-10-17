import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import {
  Home,
  ChevronRight,
  CalendarDays,
  Clock3,
  Newspaper,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { BLOG_POSTS, formatPostDate, getPostBySlug } from "@/content/blog"
import { siteConfig } from "@/lib/seo"

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) return { title: "Article Not Found" }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${siteConfig.url}/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | ${siteConfig.name}`,
      description: post.excerpt,
      url: `${siteConfig.url}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      tags: post.tags,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const aMatch = a.category === post.category ? 1 : 0
      const bMatch = b.category === post.category ? 1 : 0
      return bMatch - aMatch
    })
    .slice(0, 3)

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="inline-flex shrink-0 items-center gap-1 transition-colors hover:text-foreground">
          <Home className="size-3.5" />
          <span className="hidden sm:inline">Home</span>
        </Link>
        <ChevronRight className="size-4 shrink-0" />
        <Link href="/blog" className="shrink-0 transition-colors hover:text-foreground">
          Blog
        </Link>
        <ChevronRight className="size-4 shrink-0" />
        <span className="truncate font-medium text-foreground">{post.title}</span>
      </nav>

      <article className="overflow-hidden rounded-3xl border border-border bg-card">
        {/* Cover */}
        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-primary/15 via-card to-gold/10 sm:h-52">
          <div className="absolute inset-0 bg-dots-faint [mask-image:radial-gradient(ellipse_70%_100%_at_50%_0%,#000_40%,transparent_100%)]" />
          <span className="absolute left-8 top-8 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
            <Newspaper className="size-3.5" />
            {post.category}
          </span>
        </div>

        <div className="p-7 sm:p-10">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-border py-4 text-sm">
            <span className="font-semibold">{post.author}</span>
            <span className="text-muted-foreground">{post.authorRole}</span>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <CalendarDays className="size-4" />
              {formatPostDate(post.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <Clock3 className="size-4" />
              {post.readMinutes} min read
            </span>
          </div>

          <div className="mt-8 space-y-5 leading-relaxed text-muted-foreground">
            {post.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-10">
            <Button asChild variant="outline" className="group gap-2 rounded-full">
              <Link href="/blog">
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                Back to all articles
              </Link>
            </Button>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-tight">Keep reading</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="group flex flex-col rounded-3xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {item.category}
                </span>
                <h3 className="mt-2 text-base font-bold leading-snug transition-colors group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{item.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}