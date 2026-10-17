import { Star, MessageSquareOff } from "lucide-react"
import { Section } from "@/components/shared/section"
import { summariseReviews } from "@/lib/reviews"
import { cn } from "@/lib/utils"
import type { GearReview } from "@/lib/types"

interface GearReviewsProps {
  reviews: GearReview[]
}

function Stars({ value, size = "size-4" }: { value: number; size?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            size,
            i <= Math.round(value) ? "fill-gold text-gold" : "fill-muted text-muted"
          )}
        />
      ))}
    </span>
  )
}

function reviewerName(review: GearReview): string {
  return (
    review.reviewer_name ||
    review.user?.name ||
    review.user?.email?.split("@")[0] ||
    "GearUp member"
  )
}

function reviewerInitials(review: GearReview): string {
  const name = reviewerName(review)
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function formatDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ""
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

/**
 * Public reviews for a gear item.
 *
 * The backend currently exposes only `POST /api/review`, so an empty list here
 * means "no reviews available yet". The section stays honest and never shows
 * a fabricated rating.
 */
export function GearReviews({ reviews }: GearReviewsProps) {
  const list = Array.isArray(reviews) ? reviews : []
  const summary = summariseReviews(list)

  return (
    <Section id="reviews" tone="muted">
      <div className="mx-auto max-w-5xl">
        <h2 className="flex items-center gap-2.5 text-2xl font-bold tracking-tight sm:text-3xl">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
            <Star className="size-5 text-primary" />
          </span>
          Reviews &amp; ratings
        </h2>

        {summary.total === 0 ? (
          <div className="mt-6 flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card py-14 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10">
              <MessageSquareOff className="size-7 text-primary/70" />
            </div>
            <h3 className="mt-4 text-lg font-bold">No reviews yet</h3>
            <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
              Customers can leave a rating once this item&apos;s rental has been returned.
              Nothing is shown here until a real review exists.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)]">
            {/* Summary */}
            <div className="h-fit rounded-3xl border border-border bg-card p-6">
              <p className="flex items-baseline gap-2">
                <span className="text-5xl font-bold leading-none text-foreground">
                  {summary.average.toFixed(1)}
                </span>
                <span className="text-sm text-muted-foreground">/ 5</span>
              </p>
              <div className="mt-3">
                <Stars value={summary.average} size="size-5" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Based on {summary.total} review{summary.total === 1 ? "" : "s"}
              </p>

              <div className="mt-6 space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = summary.distribution[star - 1]
                  const pct = summary.total === 0 ? 0 : (count / summary.total) * 100
                  return (
                    <div key={star} className="flex items-center gap-2.5">
                      <span className="w-3 text-xs font-medium text-muted-foreground">
                        {star}
                      </span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-gold transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-6 text-right text-xs tabular-nums text-muted-foreground">
                        {count}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* List */}
            <ul className="space-y-4">
              {list.map((review) => (
                <li
                  key={review.id}
                  className="rounded-3xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/30"
                >
                  <div className="flex items-start gap-3.5">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {reviewerInitials(review)}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <p className="truncate text-sm font-semibold">{reviewerName(review)}</p>
                        <Stars value={review.rating} size="size-3.5" />
                      </div>
                      {review.created_at && (
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {formatDate(review.created_at)}
                        </p>
                      )}
                      {review.comment && (
                        <p className="mt-2.5 leading-relaxed text-sm text-muted-foreground">
                          {review.comment}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Section>
  )
}