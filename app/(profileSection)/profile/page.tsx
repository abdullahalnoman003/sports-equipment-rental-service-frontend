"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ProfileForm } from "../_components/profile-form"
import { getMe } from "@/service/getMe"
import type { UserProfile } from "@/lib/types"
import toast from "react-hot-toast"
import { BrandLoader } from "@/components/shared/loader"
import { CalendarDays, BadgeCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { friendlyError } from "@/lib/messages"

const ROLE_META: Record<string, { label: string; className: string }> = {
  CUSTOMER: { label: "Customer", className: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300" },
  PROVIDER: { label: "Provider", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300" },
  ADMIN: { label: "Admin", className: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300" },
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await getMe()
        if (res.success) {
          setProfile(res.data as UserProfile)
        } else {
          toast.error(friendlyError(res.message, "Please login to view your profile"))
        }
      } catch {
        toast.error("Failed to fetch profile")
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
        <BrandLoader label="GearUp" hint="Loading your profile..." />
      </div>
    )
  }

  const roleMeta = profile ? ROLE_META[profile.role] ?? ROLE_META.CUSTOMER : ROLE_META.CUSTOMER
  const hasPicture = !!profile?.profile?.profile_picture
  const memberSince = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : ""

  const initials = profile?.name
    ? profile.name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()
    : "?"

  return (
    <div className="relative mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 size-96 rounded-full bg-primary/5 blur-3xl animate-pulse-soft" />
        <div className="absolute -left-32 bottom-0 size-80 rounded-full bg-gold/5 blur-3xl animate-pulse-soft [animation-delay:1.5s]" />
      </div>

      {/* Page heading */}
      <div className="relative mb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur-sm">
          <span className="size-1.5 rounded-full bg-primary" />
          My account
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl">Profile management</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Review your account details and keep your personal information up to date.
        </p>
      </div>

      {/* Profile hero card */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 size-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 size-64 rounded-full bg-gold/5 blur-3xl" />
          <div className="absolute inset-0 bg-grid-faint [mask-image:radial-gradient(ellipse_70%_120%_at_20%_0%,#000_40%,transparent_100%)]" />
        </div>

        <div className="relative flex flex-col items-center gap-6 p-6 sm:p-8 md:flex-row md:gap-8">
          {/* Avatar */}
          <div className="relative shrink-0">
            <span className="absolute -inset-3 -z-10 rounded-full border-2 border-dashed border-primary/25 animate-spin-slow" />
            <div className="relative flex size-32 items-center justify-center overflow-hidden rounded-full border-4 border-background shadow-xl shadow-primary/10">
              {hasPicture ? (
                <Image
                  src={profile!.profile!.profile_picture!}
                  alt={profile!.name}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              ) : (
                <span className="flex size-full items-center justify-center bg-gradient-to-br from-primary/20 to-brand-soft text-4xl font-bold text-primary">
                  {initials}
                </span>
              )}
            </div>
            <span className="absolute bottom-1 right-1 flex size-9 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow-md">
              <BadgeCheck className="size-4" />
            </span>
          </div>

          {/* Identity */}
          <div className="min-w-0 flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center gap-2.5 md:justify-start">
              <h2 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">{profile?.name}</h2>
              <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold", roleMeta.className)}>
                <span className="size-1.5 rounded-full bg-current opacity-70" />
                {roleMeta.label}
              </span>
            </div>
            <p className="mt-1 text-muted-foreground">{profile?.email}</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
              <CalendarDays className="size-3.5 text-primary" />
              Member since {memberSince || "recently"}
            </div>
          </div>

          {/* Quick stats */}
          <div className="hidden shrink-0 flex-col items-end gap-3 md:flex">
            <div className="rounded-2xl border border-border bg-card/70 px-5 py-3 text-center backdrop-blur-sm">
              <p className="text-2xl font-bold tracking-tight text-primary">{initials}</p>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Account badge</p>
            </div>
          </div>
        </div>
      </section>

      {/* Editable sections */}
      <div className="relative mt-6 animate-fade-up">
        <ProfileForm
          initialData={profile ? {
            name: profile.name,
            email: profile.email,
            role: profile.role,
            phone_number: profile.profile?.phone_number ?? "",
            address: profile.profile?.address ?? "",
            profile_picture: profile.profile?.profile_picture ?? "",
            createdAt: profile.createdAt,
          } : undefined}
        />
      </div>
    </div>
  )
}
