"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import { Bot, Send, X, Loader2, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { askAssistant } from "@/app/(publicSection)/_actions/ai"

/**
 * GearUp chat assistant.
 *
 * Answers questions about renting using the live catalog as ground truth, so it
 * cannot invent gear that does not exist. If no provider is reachable the server
 * action returns a deterministic answer instead, so the assistant always has
 * something useful to say.
 *
 * The widget deliberately shows no provider or vendor branding. To a renter this
 * is the GearUp assistant; which model happened to serve a reply is an
 * implementation detail, and surfacing it made the widget read as a generic
 * third-party chatbot rather than part of the product.
 */

interface Message {
  id: number
  role: "user" | "assistant"
  text: string
}

const GREETING: Message = {
  id: 0,
  role: "assistant",
  text: "Hi, I am the GearUp assistant. Ask me about pricing, how renting works, or what gear suits a trip.",
}

const PROMPTS = ["How does renting work?", "What is the cheapest tent?", "How do I become a provider?"]

export function AiAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([GREETING])
  const [draft, setDraft] = useState("")
  const [pending, startTransition] = useTransition()

  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const nextId = useRef(1)

  // Keep the newest message in view as the conversation grows.
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, open])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  function send(text: string) {
    const question = text.trim()
    if (!question || pending) return

    const userId = nextId.current++
    setMessages((prev) => [...prev, { id: userId, role: "user", text: question }])
    setDraft("")

    startTransition(async () => {
      try {
        const result = await askAssistant(question)
        const replyId = nextId.current++
        setMessages((prev) => [...prev, { id: replyId, role: "assistant", text: result.text }])
      } catch {
        const replyId = nextId.current++
        setMessages((prev) => [
          ...prev,
          {
            id: replyId,
            role: "assistant",
            text: "I could not reach the assistant just now. Please try again in a moment.",
          },
        ])
      }
    })
  }

  function reset() {
    nextId.current = 1
    setMessages([GREETING])
    setDraft("")
  }

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close assistant" : "Open assistant"}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/25 transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        {open ? <X className="size-6" /> : <Bot className="size-6" />}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="GearUp assistant"
          className="fixed bottom-24 right-5 z-50 flex h-[30rem] w-[min(23rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl animate-fade-up"
        >
          <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/40 px-4 py-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Bot className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">GearUp Assistant</p>
                <p className="truncate text-xs text-muted-foreground">
                  Here to help with renting
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={reset} aria-label="Start a new conversation">
              <RotateCcw className="size-4" />
            </Button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-muted/50"
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {pending && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl border border-border bg-muted/50 px-3.5 py-3">
                  <Loader2 className="size-3.5 animate-spin text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Thinking</span>
                </div>
              </div>
            )}
          </div>

          {messages.length === 1 && !pending && (
            <div className="flex flex-wrap gap-1.5 px-4 pb-2">
              {PROMPTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => send(p)}
                  className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          <form
            className="flex items-center gap-2 border-t border-border p-3"
            onSubmit={(e) => {
              e.preventDefault()
              send(draft)
            }}
          >
            <Input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask a question..."
              aria-label="Message the assistant"
              disabled={pending}
              className="rounded-xl"
            />
            <Button type="submit" size="icon" disabled={pending || !draft.trim()} aria-label="Send message">
              {pending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
            </Button>
          </form>
        </div>
      )}
    </>
  )
}