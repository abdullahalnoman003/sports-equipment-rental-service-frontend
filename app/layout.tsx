import "./globals.css";
import { Lora } from "next/font/google";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "react-hot-toast";
import { siteConfig } from "@/lib/seo";

const inter = Lora({ subsets: ["latin"], variable: "--font-sans" , weight: ["400", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "gear rental",
    "sports equipment rental",
    "outdoor gear",
    "rent sports gear",
    "GearUp",
    "Bangladesh gear rental",
    "bike rental",
    "camping gear",
    "cricket gear",
  ],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: siteConfig.ogImage, width: 512, height: 512, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: [{ url: "/gearup-logo.svg", type: "image/svg+xml" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                const resolved = theme === 'dark' || (theme !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
                document.documentElement.classList.add(resolved);
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2500,
            style: {
              borderRadius: "12px",
              fontWeight: 500,
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}
