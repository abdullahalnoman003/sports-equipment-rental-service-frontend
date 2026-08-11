"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { submitReview } from "../_actions/orders"
import { z } from "zod"
import toast from "react-hot-toast"

const reviewFormSchema = z.object({
  rating: z.number().int().min(1, "Please select a rating").max(5, "Rating must be at most 5"),
  comment: z.string().optional().or(z.literal("")),
})

interface ReviewFormProps {
  rentalId: string
  onSubmit?: () => void
}

export function ReviewForm({ rentalId, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [alreadyReviewed, setAlreadyReviewed] = useState(false)

  const validate = () => {
    const result = reviewFormSchema.safeParse({ rating, comment })
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof typeof reviewFormSchema.shape
        fieldErrors[field] = issue.message
      }
      setErrors(fieldErrors)
      return false
    }
    setErrors({})
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)

    try {
      const res = await submitReview({ rentalId, comment, rating })
      if (res.success) {
        toast.success("Review submitted!")
        onSubmit?.()
      } else if (res.message.toLowerCase().includes("already reviewed")) {
        setAlreadyReviewed(true)
      } else {
        toast.error(res.message || "Failed to submit review")
      }
    } catch {
      toast.error("Failed to submit review")
    } finally {
      setLoading(false)
    }
  }

  if (alreadyReviewed) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Review</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            You have already reviewed this gear. Only one review per gear is allowed per account.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Rating</Label>
            <div className="mt-1 flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setRating(s)
                    setErrors((prev) => {
                      const next = { ...prev }
                      delete next.rating
                      return next
                    })
                  }}
                  className="focus:outline-none"
                >
                  <Star
                    className={`size-6 ${
                      s <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                </button>
              ))}
            </div>
            {errors.rating && <p className="text-xs text-destructive">{errors.rating}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor={`review-${rentalId}`}>Comment</Label>
          <Textarea
            id={`review-${rentalId}`}
            value={comment}
            onChange={(e) => {
              setComment(e.target.value)
              setErrors((prev) => {
                const next = { ...prev }
                delete next.comment
                return next
              })
            }}
            rows={3}
            placeholder="Share your experience with this gear..."
            className={errors.comment ? "border-destructive" : ""}
          />
          {errors.comment && <p className="text-xs text-destructive">{errors.comment}</p>}
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
