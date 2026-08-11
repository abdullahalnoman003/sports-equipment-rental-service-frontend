"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { addNewGear } from "../_actions/gear"
import { fetchAllCategories } from "@/app/(publicSection)/_actions/gear"
import { z } from "zod"
import toast from "react-hot-toast"
import type { Category } from "@/lib/types"

const gearSchema = z.object({
  name: z.string().min(1, "Gear name is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("Invalid image URL").optional().or(z.literal("")),
  price: z.number().positive("Price must be greater than 0"),
  quantity: z.number().int("Quantity must be a whole number").positive("Quantity must be greater than 0"),
  brand: z.string().min(1, "Brand is required"),
  category_name: z.string().min(1, "Category is required"),
})

interface GearForm {
  name: string
  description: string
  image: string
  price: string
  quantity: string
  brand: string
  category_name: string
}

const INITIAL_FORM: GearForm = {
  name: "",
  description: "",
  image: "",
  price: "",
  quantity: "",
  brand: "",
  category_name: "",
}

interface AddGearFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export function AddGearForm({ onSuccess, onCancel }: AddGearFormProps) {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<GearForm>(INITIAL_FORM)
  const [categories, setCategories] = useState<string[]>([])
  const [imageError, setImageError] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetchAllCategories()
      if (res.success) {
        setCategories((res.data as Category[]).map((c) => c.name))
      }
    }
    fetchCategories()
  }, [])

  const handleChange = (field: keyof GearForm, value: string) => {
    setForm((f) => ({ ...f, [field]: value }))
    if (field === "image") setImageError(false)
    setErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const validate = () => {
    const result = gearSchema.safeParse({
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
    })
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof GearForm
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
      const res = await addNewGear({
        name: form.name,
        description: form.description,
        image: form.image,
        price: Number(form.price),
        quantity: Number(form.quantity),
        brand: form.brand,
        category_name: form.category_name,
      })

      if (res.success) {
        toast.success("Gear added successfully!")
        onSuccess?.()
      } else {
        toast.error(res.message || "Failed to add gear")
      }
    } catch {
      toast.error("Failed to add gear")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image URL + Preview */}
      <div className="space-y-2">
        <Label htmlFor="image">Image URL (optional)</Label>
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              id="image"
              value={form.image}
              onChange={(e) => handleChange("image", e.target.value)}
              placeholder="https://example.com/photo.jpg"
            />
          </div>
          <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted/50">
            {form.image && !imageError && (form.image.startsWith("http://") || form.image.startsWith("https://")) ? (
              <Image
                src={form.image}
                alt="Gear preview"
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <Package className="size-6 text-muted-foreground/50" />
            )}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Paste a direct link to your gear image (JPG, PNG, or WebP)
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Gear Name *</Label>
          <Input
            id="name"
            required
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g. Mountain Bike Pro"
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="brand">Brand *</Label>
          <Input
            id="brand"
            required
            value={form.brand}
            onChange={(e) => handleChange("brand", e.target.value)}
            placeholder="e.g. Trek"
            className={errors.brand ? "border-destructive" : ""}
          />
          {errors.brand && <p className="text-xs text-destructive">{errors.brand}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            required
            rows={4}
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Describe your gear — condition, features, what's included..."
            className={errors.description ? "border-destructive" : ""}
          />
          {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="price">Price/Day (৳) *</Label>
          <Input
            id="price"
            type="number"
            min="1"
            required
            value={form.price}
            onChange={(e) => handleChange("price", e.target.value)}
            placeholder="45"
            className={errors.price ? "border-destructive" : ""}
          />
          {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity *</Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            required
            value={form.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
            placeholder="3"
            className={errors.quantity ? "border-destructive" : ""}
          />
          {errors.quantity && <p className="text-xs text-destructive">{errors.quantity}</p>}
        </div>
        <div className="space-y-2">
          <Label>Category *</Label>
          <Select
            value={form.category_name}
            onValueChange={(value) => handleChange("category_name", value)}
          >
            <SelectTrigger className={`w-full ${errors.category_name ? "border-destructive" : ""}`}>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category_name && <p className="text-xs text-destructive">{errors.category_name}</p>}
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Gear"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
