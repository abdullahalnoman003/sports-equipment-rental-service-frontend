"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createCategory, updateCategory } from "../_actions/categories"
import { z } from "zod"
import toast from "react-hot-toast"
import type { Category } from "@/lib/types"

const categoryFormSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional().or(z.literal("")),
  image: z.string().url("Invalid image URL").optional().or(z.literal("")),
})

interface CategoryFormProps {
  category?: Category | null
  onSuccess?: () => void
  onCancel?: () => void
}

export function CategoryForm({ category, onSuccess, onCancel }: CategoryFormProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const isEdit = !!category

  const validate = () => {
    const result = categoryFormSchema.safeParse({ name, description, image })
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof typeof categoryFormSchema.shape
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
      const res = isEdit
        ? await updateCategory(category.id, { name, description, image })
        : await createCategory({ name, description, image })

      if (res.success) {
        toast.success(isEdit ? "Category updated!" : "Category created!")
        onSuccess?.()
      } else {
        toast.error(res.message || `Failed to ${isEdit ? "update" : "create"} category`)
      }
    } catch {
      toast.error(`Failed to ${isEdit ? "update" : "create"} category`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Category Name *</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setErrors((prev) => {
                const next = { ...prev }
                delete next.name
                return next
              })
            }}
            placeholder="e.g. Cycling"
            required
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
              setErrors((prev) => {
                const next = { ...prev }
                delete next.description
                return next
              })
            }}
            placeholder="Describe this category..."
            rows={3}
            className={errors.description ? "border-destructive" : ""}
          />
          {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            type="url"
            value={image}
            onChange={(e) => {
              setImage(e.target.value)
              setErrors((prev) => {
                const next = { ...prev }
                delete next.image
                return next
              })
            }}
            placeholder="https://example.com/image.jpg"
            className={errors.image ? "border-destructive" : ""}
          />
          {errors.image && <p className="text-xs text-destructive">{errors.image}</p>}
        <p className="text-xs text-muted-foreground">
          Optional image URL for this category
        </p>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : isEdit ? "Update Category" : "Create Category"}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
