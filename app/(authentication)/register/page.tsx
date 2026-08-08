"use client"

import Link from "next/link"
import { Dumbbell } from "lucide-react"
import { RegisterForm } from "../_components/register-form"

export default function RegisterPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold">
            <Dumbbell className="size-6 text-primary" />
            GearUp<span className="text-primary">.</span>
          </Link>
          <h1 className="mt-4 text-2xl font-bold tracking-tight">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Join the gear rental community
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  )
}
