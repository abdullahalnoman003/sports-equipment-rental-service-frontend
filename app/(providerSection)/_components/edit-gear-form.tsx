/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useEffect } from "react"
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
import { updateGearById } from "../_actions/gear"
import { fetchAllCategories } from "@/app/(publicSection)/_actions/gear"
import toast from "react-hot-toast"
import type { Category, Gear } from "@/lib/types"

interface EditGearFormProps {
  gear: Gear
  onSuccess?: () => void
  onCancel?: () => void
}

interface GearForm {
  name: string
  description: string
  image: string
  price: string
  quantity: string
  brand: string
  category_name: string
}

export function EditGearForm({ gear, onSuccess, onCancel }: EditGearFormProps) {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<GearForm>({
    name: gear.name,
    description: gear.description,
    image: gear.image || "",
    price: String(gear.price),
    quantity: String(gear.quantity),
    brand: gear.brand,
    category_name: gear.category_Name,
  })
  const [categories, setCategories] = useState<string[]>([])
  const [imageError, setImageError] = useState(false)

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
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await updateGearById(gear.id, {
        name: form.name,
        description: form.description,
        image: form.image,
        price: Number(form.price),
        quantity: Number(form.quantity),
        brand: form.brand,
        category_name: form.category_name,
      })

      if (res.success) {
        toast.success("Gear updated successfully!")
        onSuccess?.()
      } else {
        toast.error(res.message || "Failed to update gear")
      }
    } catch {
      toast.error("Failed to update gear")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="image">Image URL (optional)</Label>
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              id="image"
              type="url"
              value={form.image}
              onChange={(e) => handleChange("image", e.target.value)}
              placeholder="https://example.com/photo.jpg"
              className="flex-1"
            />
          </div>
          <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted/50">
            {form.image && !imageError ? (
              <img
                src={form.image}
                alt="Gear preview"
                className="size-full object-cover"
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
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="brand">Brand *</Label>
          <Input
            id="brand"
            required
            value={form.brand}
            onChange={(e) => handleChange("brand", e.target.value)}
            placeholder="e.g. Trek"
          />
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
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="price">Price/Day ($) *</Label>
          <Input
            id="price"
            type="number"
            min="1"
            required
            value={form.price}
            onChange={(e) => handleChange("price", e.target.value)}
            placeholder="45"
          />
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
          />
        </div>
        <div className="space-y-2">
          <Label>Category *</Label>
          <Select
            value={form.category_name}
            onValueChange={(value) => handleChange("category_name", value)}
          >
            <SelectTrigger className="w-full">
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
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
