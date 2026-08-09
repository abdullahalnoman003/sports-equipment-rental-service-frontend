"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export interface ContactFormProps {
  onSuccess?: () => void
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: "", email: "", subject: "", message: "" })
    onSuccess?.()
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <>
      {sent && (
        <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
          Message sent successfully! We&apos;ll get back to you soon.
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor="contact-name">Name</Label>
            <Input
              id="contact-name"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Your full name"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label htmlFor="contact-subject">Subject</Label>
          <Input
            id="contact-subject"
            required
            value={form.subject}
            onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
            placeholder="How can we help?"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="contact-message">Message</Label>
          <Textarea
            id="contact-message"
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            placeholder="Tell us more..."
          />
        </div>
        <Button type="submit" className="w-full">
          <Send className="size-4" />
          Send Message
        </Button>
      </form>
    </>
  )
}
