"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Save,
  Camera,
  User,
  Phone,
  MapPin,
  Link2,
  Mail,
  ShieldCheck,
  CalendarDays,
  UserRound,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateUserProfile } from "../_actions/profile"
import { z } from "zod"
import toast from "react-hot-toast"
import { cn } from "@/lib/utils"
import { friendlyError } from "@/lib/messages"

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  profile_picture: z.string().url("Invalid image URL").optional().or(z.literal("")),
  phone_number: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
})

export interface ProfileFormProps {
  initialData?: {
    name: string
    email: string
    role: string
    phone_number?: string
    address?: string
    profile_picture?: string
    createdAt?: string
  }
}

const ROLE_META: Record<string, { label: string; className: string }> = {
  CUSTOMER: { label: "Customer", className: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300" },
  PROVIDER: { label: "Provider", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300" },
  ADMIN: { label: "Admin", className: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300" },
}

function FieldCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-muted/30 px-4 py-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
        <Icon className="size-4 text-primary" />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-semibold">{value}</p>
      </div>
    </div>
  )
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
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const result = profileSchema.safeParse({
      name: form.name,
      profile_picture: form.profile_picture,
      phone_number: form.phone_number,
      address: form.address,
    })
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof typeof form
        fieldErrors[field] = issue.message
      }
      setErrors(fieldErrors)
      return false
    }
    setErrors({})
    return true
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
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
        toast.error(friendlyError(res.message, "Please login to update your profile"))
      }
    } catch {
      toast.error("Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  const initials = form.name
    ? form.name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()
    : "?"
  const hasPicture =
    form.profile_picture &&
    !imgError &&
    (form.profile_picture.startsWith("http://") || form.profile_picture.startsWith("https://"))
  const roleMeta = ROLE_META[initialData?.role ?? ""] ?? ROLE_META.CUSTOMER
  const memberSince = initialData?.createdAt
    ? new Date(initialData.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : ""

  const fieldLabelClass = "flex items-center gap-1.5 text-sm font-semibold"

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Left column */}
      <div className="space-y-6 lg:col-span-1">
        {/* Profile photo */}
        <section className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 text-center">
          <div className="pointer-events-none absolute inset-x-0 -top-16 h-32 bg-gradient-to-b from-primary/10 to-transparent" />
          <div className="relative">
            <div className="relative mx-auto size-28">
              <span className="absolute -inset-2 -z-10 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow" />
              <div className="relative flex size-28 items-center justify-center overflow-hidden rounded-full border-4 border-background shadow-lg shadow-primary/10">
                {hasPicture ? (
                  <Image
                    src={form.profile_picture}
                    alt={form.name}
                    fill
                    className="object-cover"
                    onError={() => setImgError(true)}
                    sizes="112px"
                  />
                ) : (
                  <span className="flex size-full items-center justify-center bg-gradient-to-br from-primary/20 to-brand-soft text-3xl font-bold text-primary">
                    {initials}
                  </span>
                )}
              </div>
              <span className="absolute bottom-1 right-1 flex size-8 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow-md">
                <Camera className="size-3.5" />
              </span>
            </div>
            <h2 className="mt-5 text-lg font-bold tracking-tight">Profile photo</h2>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Add a clear photo so people can recognise you across GearUp.
            </p>
          </div>

          <div className="relative mt-5 space-y-2 text-left">
            <Label htmlFor="profile_picture" className={fieldLabelClass}>
              <Link2 className="size-3.5 text-primary" />
              Photo URL
            </Label>
            <Input
              id="profile_picture"
              type="url"
              value={form.profile_picture}
              onChange={(e) => {
                setForm((f) => ({ ...f, profile_picture: e.target.value }))
                setImgError(false)
              }}
              placeholder="https://example.com/photo.jpg"
              aria-invalid={!!errors.profile_picture}
            />
            {errors.profile_picture ? (
              <p className="text-xs text-destructive">{errors.profile_picture}</p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Paste a direct link to your profile picture.
              </p>
            )}
          </div>
        </section>

        {/* Account summary */}
        <section className="relative overflow-hidden rounded-3xl border border-border bg-card p-6">
          <div className="pointer-events-none absolute -bottom-16 -right-16 size-40 rounded-full bg-primary/5 blur-3xl" />
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground">
            <ShieldCheck className="size-4 text-primary" />
            Account
          </h2>
          <div className="mt-4 space-y-3">
            <FieldCard icon={Mail} label="Email" value={initialData?.email ?? "Not available"} />
            <FieldCard icon={UserRound} label="Account type" value={roleMeta.label} />
            <FieldCard icon={CalendarDays} label="Member since" value={memberSince || "New member"} />
          </div>
        </section>
      </div>

      {/* Right column: personal information */}
      <form onSubmit={handleSave} className="lg:col-span-2">
        <section className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8">
          <div className="pointer-events-none absolute inset-x-0 -top-20 h-40 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-primary" />
              Personal information
            </span>
            <h2 className="mt-4 text-xl font-bold tracking-tight sm:text-2xl">Edit your details</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Keep your contact information up to date so providers can reach you.
            </p>

            <div className="mt-7 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className={fieldLabelClass}>
                  <User className="size-3.5 text-primary" />
                  Full name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, name: e.target.value }))
                    setErrors((prev) => {
                      const next = { ...prev }
                      delete next.name
                      return next
                    })
                  }}
                  placeholder="Your full name"
                  className={cn(errors.name && "aria-invalid:border-destructive")}
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className={fieldLabelClass}>
                  <Phone className="size-3.5 text-primary" />
                  Phone number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone_number}
                  onChange={(e) => setForm((f) => ({ ...f, phone_number: e.target.value }))}
                  placeholder="+880 1XXX-XXXXXX"
                />
                <p className="text-xs text-muted-foreground">
                  Used for order updates and rental coordination.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className={fieldLabelClass}>
                  <MapPin className="size-3.5 text-primary" />
                  Address
                </Label>
                <Input
                  id="address"
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  placeholder="House, road, city, area"
                />
              </div>
            </div>
          </div>

          <div className="relative mt-8 flex flex-col-reverse items-stretch gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-end">
            <p className="text-xs text-muted-foreground sm:mr-auto">
              Changes are saved securely to your account.
            </p>
            <Button type="submit" disabled={saving} size="lg" className="gap-2 rounded-xl shadow-lg shadow-primary/20">
              {saving ? (
                <span className="flex items-center gap-2">
                  <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
                  Saving...
                </span>
              ) : (
                <>
                  <Save className="size-4" />
                  Save changes
                </>
              )}
            </Button>
          </div>
        </section>
      </form>
    </div>
  )
}
