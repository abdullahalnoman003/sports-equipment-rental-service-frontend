"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import { Search, X, Loader2, Sparkles, Tag, Layers } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { suggestSearch, type Suggestion } from "@/app/(publicSection)/_actions/ai"

/**
 * AI-assisted search box.
 *
 * Suggests completions as the user types. Suggestions come from a server action
 * that queries whichever configured model provider answers first, with a local
 * catalog match as the fallback, so the dropdown stays useful either way.
 *
 * The debounce lives in the change handler rather than an effect on purpose.
 * Driving it from an effect means setting state synchronously every time the
 * query changes, which risks a cascading render. Here nothing is set until the
 * user actually types, and the visible list is derived from the current query.
 *
 * Follows the combobox pattern: full keyboard support plus a listbox role, so it
 * is fully usable without a mouse.
 */

const DEBOUNCE_MS = 280

const KIND_ICON = {
  gear: Search,
  category: Layers,
  brand: Tag,
  question: Sparkles,
} as const

export function AiSearchBox({
  search,
  onSearchChange,
  placeholder = "Search by name or brand...",
}: {
  search: string
  onSearchChange: (value: string) => void
  placeholder?: string
}) {
  const listId = useId()
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState(-1)

  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Guards against a slow earlier response overwriting newer suggestions.
  const requestId = useRef(0)

  const schedule = useCallback((query: string) => {
    if (timerRef.current) clearTimeout(timerRef.current)

    if (query.trim().length < 2) {
      // Invalidate any request still in flight for the old query.
      requestId.current += 1
      setItems([])
      setLoading(false)
      return
    }

    const id = ++requestId.current
    setLoading(true)

    timerRef.current = setTimeout(async () => {
      try {
        const result = await suggestSearch(query)
        if (id !== requestId.current) return
        setItems(Array.isArray(result) ? result : [])
        setActive(-1)
      } catch {
        if (id !== requestId.current) return
        setItems([])
      } finally {
        if (id === requestId.current) setLoading(false)
      }
    }, DEBOUNCE_MS)
  }, [])

  // Only clears a timer, never sets state, so this is safe in an effect.
  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  // Close when a click lands outside the widget.
  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onPointerDown)
    return () => document.removeEventListener("mousedown", onPointerDown)
  }, [])

  const choose = useCallback(
    (label: string) => {
      if (timerRef.current) clearTimeout(timerRef.current)
      requestId.current += 1
      onSearchChange(label)
      setItems([])
      setLoading(false)
      setActive(-1)
      setOpen(false)
      inputRef.current?.focus()
    },
    [onSearchChange]
  )

  const clear = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    requestId.current += 1
    setItems([])
    setLoading(false)
    setActive(-1)
    onSearchChange("")
  }, [onSearchChange])

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || items.length === 0) return

    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActive((i) => (i + 1) % items.length)
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      setActive((i) => (i <= 0 ? items.length - 1 : i - 1))
    } else if (event.key === "Enter" && active >= 0) {
      event.preventDefault()
      choose(items[active].label)
    } else if (event.key === "Escape") {
      setOpen(false)
      setActive(-1)
    }
  }

  // Derived, so clearing the query from anywhere hides stale suggestions.
  const hasQuery = search.trim().length >= 2
  const visible = hasQuery ? items : []
  const showList = open && visible.length > 0

  return (
    <div ref={rootRef} className="relative">
      <Search className="absolute left-4 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        ref={inputRef}
        type="text"
        role="combobox"
        aria-expanded={showList}
        aria-controls={showList ? listId : undefined}
        aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
        placeholder={placeholder}
        value={search}
        onChange={(e) => {
          onSearchChange(e.target.value)
          setOpen(true)
          schedule(e.target.value)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        className="h-11 rounded-xl border-border bg-background pl-11 pr-10"
        aria-label="Search gear"
      />

      <div className="absolute right-3 top-1/2 z-10 flex -translate-y-1/2 items-center">
        {hasQuery && loading && (
          <Loader2 className="size-4 animate-spin text-primary" aria-hidden />
        )}
        {!loading && search && (
          <button
            type="button"
            onClick={clear}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {showList && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Search suggestions"
          className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-40 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-lg animate-fade-in"
        >
          {visible.map((item, index) => {
            const Icon = KIND_ICON[item.kind] ?? Search
            return (
              <li key={`${item.label}-${index}`} role="none">
                <button
                  id={`${listId}-${index}`}
                  type="button"
                  role="option"
                  aria-selected={index === active}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => choose(item.label)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                    index === active ? "bg-primary/10 text-primary" : "hover:bg-accent"
                  )}
                >
                  <Icon className="size-4 shrink-0 opacity-70" aria-hidden />
                  <span className="truncate">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}