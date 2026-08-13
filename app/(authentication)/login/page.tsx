import Link from "next/link"
import type { Metadata } from "next"
import { AuthShell } from "@/components/shared/auth-shell"
import { LoginForm } from "../_components/login-form"

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your GearUp account to browse, rent, and manage sports and outdoor gear across Bangladesh.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Welcome Back"
      title="Sign in to GearUp"
      subtitle="Pick up where you left off and get back to your adventure."
      footer={
        <>
          New to GearUp?{" "}
          <Link href="/register" className="font-semibold text-primary hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  )
}
