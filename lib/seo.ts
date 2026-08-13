import type { Metadata } from "next"

export const siteConfig = {
  name: "GearUp",
  title: "GearUp | Rent Sports & Outdoor Gear in Bangladesh",
  description:
    "GearUp is Bangladesh's peer-to-peer marketplace for renting sports and outdoor equipment. Browse gear by category and price, book by the day, and pay securely with Stripe.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/gearup-logo.svg",
}

export function pageMetadata(title: string, description: string, path = "/"): Metadata {
  const url = `${siteConfig.url}${path === "/" ? "" : path}`
  const ogTitle = `${title} | ${siteConfig.name}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: siteConfig.ogImage, width: 512, height: 512, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [siteConfig.ogImage],
    },
  }
}
