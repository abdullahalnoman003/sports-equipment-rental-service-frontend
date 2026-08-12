"use client"

import Link from "next/link"
import { AuthShell } from "@/components/shared/auth-shell"
import { RegisterForm } from "../_components/register-form"

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
