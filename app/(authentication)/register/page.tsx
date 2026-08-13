import Link from "next/link"
import type { Metadata } from "next"
import { AuthShell } from "@/components/shared/auth-shell"
import { RegisterForm } from "../_components/register-form"

export const metadata: Metadata = {
  title: "Create an Account",
  description:
    "Join GearUp as a customer or provider. Rent sports and outdoor gear, or list your own equipment and start earning.",
  alternates: { canonical: "/register" },
  robots: { index: false, follow: false },
}

export default function RegisterPage() {
  return (
    <AuthShell
      eyebrow="Join GearUp"
      title="Create your account"
      subtitle="Join the gear rental community and start exploring."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  )
}
