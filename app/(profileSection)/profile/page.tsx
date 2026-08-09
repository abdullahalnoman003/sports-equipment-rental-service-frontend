"use client"

import { useEffect, useState } from "react"
import { ProfileForm } from "../_components/profile-form"
import { getMe } from "@/service/getMe"
import type { UserProfile } from "@/lib/types"
import toast from "react-hot-toast"

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
          toast.error(res.message || "Failed to fetch profile")
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
      <div className="mx-auto w-full max-w-2xl px-4 py-10">
        <p className="text-sm text-muted-foreground">Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage your account information
      </p>

      <div className="mt-8">
        <ProfileForm
          initialData={profile ? {
            name: profile.name,
            email: profile.email,
            role: profile.role,
            phone_number: profile.profile?.phone_number ?? "",
            address: profile.profile?.address ?? "",
            profile_picture: profile.profile?.profile_picture ?? "",
          } : undefined}
        />
      </div>
    </div>
  )
}
