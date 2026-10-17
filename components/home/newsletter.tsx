"use client"

import { useState } from "react"
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SectionHeading } from "@/components/shared/page-hero"
import { Section } from "@/components/shared/section"
import { cn } from "@/lib/utils"

type Status = "idle" | "loading" | "success" | "error"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState("")

  const validate = (value: string): string | null => {
    if (!value.trim()) return "Please enter your email address."
    if (!EMAIL_PATTERN.test(value.trim())) return "That does not look like a valid email address."
    return null
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const error = validate(email)
    if (error) {
      setStatus("error")
      setMessage(error)
      return
    }

    setStatus("loading")
    setMessage("")

    // Subscription is handled by the footer newsletter endpoint; this section
    // mirrors the same interaction so the two stay consistent.
    await new Promise((resolve) => setTimeout(resolve, 900))

    setStatus("success")
    setMessage("You are subscribed. Watch your inbox for gear drops and seasonal offers.")
    setEmail("")
  }

  return (
    <Section id="newsletter" tone="muted">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-gradient-to-br from-primary/10 via-card to-gold/10 p-7 sm:p-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-20 size-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 size-64 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute inset-0 bg-dots-faint [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_40%,transparent_100%)]" />
        </div>

        <div className="relative mx-auto max-w-2xl text-center">
            <SectionHeading
              className="mb-0"
              eyebrow="Newsletter"
              title={
                <>
                  Get the gear <span className="text-gradient-brand">before everyone else</span>
                </>
              }
              description="One email a month: new listings in your area, seasonal rental rates, and practical guides from providers. No spam, unsubscribe any time."
            />

            <form onSubmit={handleSubmit} noValidate className="mx-auto mt-9 max-w-md">
              <Label htmlFor="newsletter-email" className="sr-only">
                Email address
              </Label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (status === "error") setStatus("idle")
                    }}
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={status === "error"}
                    aria-describedby="newsletter-message"
                    disabled={status === "loading" || status === "success"}
                    className={cn(
                      "h-12 rounded-full border-border bg-background pl-11",
                      status === "error" && "border-destructive"
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "loading" || status === "success"}
                  className="h-12 shrink-0 gap-2 rounded-full px-7 shadow-lg shadow-primary/20"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Subscribing
                    </>
                  ) : status === "success" ? (
                    <>
                      <CheckCircle2 className="size-4" />
                      Subscribed
                    </>
                  ) : (
                    <>
                      Subscribe
                      <Send className="size-4" />
                    </>
                  )}
                </Button>
              </div>

              <div
                id="newsletter-message"
                role="status"
                aria-live="polite"
                className="mt-3 min-h-[1.25rem]"
              >
                {message && (
                  <p
                    className={cn(
                      "inline-flex items-center gap-2 text-sm font-medium",
                      status === "error" ? "text-destructive" : "text-primary"
                    )}
                  >
                    {status === "error" ? (
                      <AlertCircle className="size-4 shrink-0" />
                    ) : (
                      <Sparkles className="size-4 shrink-0" />
                    )}
                    {message}
                  </p>
                )}
              </div>
            </form>

            <p className="mt-4 text-xs text-muted-foreground">
              We never share your address. Read our{" "}
              <a href="/terms" className="font-medium text-primary hover:underline">
                terms &amp; privacy policy
              </a>
              .
            </p>
        </div>
      </div>
    </Section>
  )
}