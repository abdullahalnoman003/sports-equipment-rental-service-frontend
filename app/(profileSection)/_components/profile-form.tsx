/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateUserProfile } from "../_actions/profile"
import toast from "react-hot-toast"

export interface ProfileFormProps {
  initialData?: {
    name: string
    email: string
    role: string
    phone_number?: string
    address?: string
    profile_picture?: string
  }
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [form, setForm] = useState({
    name: initialData?.name ?? "",
    phone_number: initialData?.phone_number ?? "",
    address: initialData?.address ?? "",
    profile_picture: initialData?.profile_picture ?? "",
  })
  const [saving, setSaving] = useState(false)
  const [imgError, setImgError] = useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const res = await updateUserProfile({
        name: form.name,
        profile_picture: form.profile_picture,
        phone_number: form.phone_number,
        address: form.address,
      })

      if (res.success) {
        toast.success("Profile updated!")
      } else {
        toast.error(res.message || "Failed to update profile")
      }
    } catch {
      toast.error("Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  const initials = form.name ? form.name.charAt(0).toUpperCase() : "?"
  const hasPicture = form.profile_picture && !imgError

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Profile Picture */}
      <div className="flex items-center gap-4">
        <div className="relative">
          {hasPicture ? (
            <img
              src={form.profile_picture}
              alt={form.name}
              className="size-20 rounded-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
              {initials}
            </div>
          )}
        </div>
        <div className="flex-1">
          {initialData?.email && (
            <p className="text-sm font-medium">{initialData.email}</p>
          )}
          {initialData?.role && (
            <p className="text-xs text-muted-foreground">{initialData.role}</p>
          )}
        </div>
      </div>

      {/* Profile Picture URL */}
      <div className="space-y-2">
        <Label htmlFor="profile_picture">Profile Picture URL</Label>
        <div className="flex gap-3">
          <Input
            id="profile_picture"
            type="url"
            value={form.profile_picture}
            onChange={(e) => {
              setForm((f) => ({ ...f, profile_picture: e.target.value }))
              setImgError(false)
            }}
            placeholder="https://example.com/photo.jpg"
            className="flex-1"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Paste a direct link to your profile picture
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={form.phone_number}
          onChange={(e) => setForm((f) => ({ ...f, phone_number: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          type="text"
          value={form.address}
          onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
        />
      </div>

      <Button type="submit" disabled={saving}>
        <Save className="size-4" />
        {saving ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  )
}
