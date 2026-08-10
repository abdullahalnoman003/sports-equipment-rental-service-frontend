"use client"

import { Target, Users, Shield, Heart, Globe, Award, Leaf } from "lucide-react"
import { DashboardLayout } from "@/components/shared/dashboard-layout"

const values = [
  { icon: Target, title: "Our Mission", description: "To make sports and outdoor gear accessible to every Bangladeshi by building a trusted peer-to-peer rental community.", color: "text-blue-600 bg-blue-100 dark:bg-blue-950 dark:text-blue-400" },
  { icon: Users, title: "Community First", description: "GearUp is built on trust. Every provider is verified, every transaction is protected, and every review is real.", color: "text-green-600 bg-green-100 dark:bg-green-950 dark:text-green-400" },
  { icon: Shield, title: "Safety & Trust", description: "With secure Stripe payments, refundable deposits, and damage protection on every rental, we ensure peace of mind.", color: "text-purple-600 bg-purple-100 dark:bg-purple-950 dark:text-purple-400" },
  { icon: Heart, title: "Passion for Sports", description: "Born from a love of sports, GearUp helps people across Bangladesh access the gear they need to stay active.", color: "text-orange-600 bg-orange-100 dark:bg-orange-950 dark:text-orange-400" },
]

const stats = [
  { value: "10,000+", label: "Active Users", icon: Users },
  { value: "2,500+", label: "Gear Listed", icon: Globe },
  { value: "15,000+", label: "Rentals Completed", icon: Award },
  { value: "64", label: "Districts Covered", icon: Leaf },
]

export default function DashboardAboutPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">About GearUp</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Making sports gear accessible to all Bangladeshis.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-4 text-center">
              <stat.icon className="mx-auto mb-2 size-5 text-primary" />
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Our Story</h2>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              GearUp was founded in 2026 in Dhaka with a simple observation: thousands of sports
              equipment items sit idle in homes across Bangladesh while others can&apos;t afford to buy them.
            </p>
            <p>
              Our platform lets anyone list their sports and outdoor gear for rent, and anyone can
              browse and book items at affordable daily rates. From cycling in Ramna Park to camping
              in Rangamati, GearUp powers adventures across Bangladesh.
            </p>
            <p>
              Today, GearUp serves users across all 64 districts. Whether you&apos;re a student needing a
              football for a tournament or a family planning a Cox&apos;s Bazar trip — GearUp has you covered.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="rounded-xl border border-border bg-card p-6">
              <div className={`mb-3 flex size-10 items-center justify-center rounded-lg ${v.color}`}>
                <v.icon className="size-5" />
              </div>
              <h3 className="font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
