/**
 * Brand palette helpers.
 *
 * Project rule: a maximum of 3 primary colours plus a neutral.
 *   1. primary  (emerald (brand / actions)
 *   2. gold     (amber accent (highlights, ratings, promos)
 *   3. neutral  (slate (tertiary accents)
 *
 * Every icon tile, badge and card accent on the site must come from here so
 * the palette stays consistent instead of drifting into raw Tailwind colours.
 */

export type BrandHue = "primary" | "gold" | "neutral" | "destructive"

const HUES: BrandHue[] = ["primary", "gold", "neutral"]

const TINT: Record<BrandHue, string> = {
  primary: "bg-primary/10 text-primary",
  gold: "bg-gold/15 text-gold-deep",
  neutral: "bg-slate-accent/10 text-slate-accent",
  destructive: "bg-destructive/10 text-destructive",
}

const SOFT: Record<BrandHue, string> = {
  primary: "bg-primary/5",
  gold: "bg-gold/10",
  neutral: "bg-slate-accent/5",
  destructive: "bg-destructive/5",
}

const BORDER: Record<BrandHue, string> = {
  primary: "border-primary/30",
  gold: "border-gold-deep/30",
  neutral: "border-slate-accent/30",
  destructive: "border-destructive/30",
}

const BARE: Record<BrandHue, string> = {
  primary: "text-primary",
  gold: "text-gold-deep",
  neutral: "text-slate-accent",
  destructive: "text-destructive",
}

/** Solid fill used for status dots. */
const DOT: Record<BrandHue, string> = {
  primary: "bg-primary",
  gold: "bg-gold",
  neutral: "bg-slate-accent",
  destructive: "bg-destructive",
}

/** Deterministically cycle the palette so a given index always gets the same hue. */
export function brandHue(index: number): BrandHue {
  if (!Number.isFinite(index)) return "primary"
  const i = Math.trunc(index)
  return HUES[((i % HUES.length) + HUES.length) % HUES.length]
}

/** Icon tile / badge background + foreground pair. */
export function brandTint(index: number): string {
  return TINT[brandHue(index)]
}

export function brandTintOf(hue: BrandHue): string {
  return TINT[hue]
}

export function brandDotOf(hue: BrandHue): string {
  return DOT[hue]
}

/**
 * Semantic status -> brand hue.
 *
 * Order and payment states deliberately reuse the same three hues instead of
 * each getting its own colour, so the dashboard never drifts past the palette.
 * `destructive` is the single allowed exception, reserved for failures.
 */
const STATUS_HUE: Record<string, BrandHue> = {
  // Rental lifecycle
  PLACED: "gold",
  CONFIRMED: "primary",
  PAID: "gold",
  PICKED_UP: "primary",
  RETURNED: "neutral",
  CANCELED: "destructive",
  // Payments
  PENDING: "gold",
  SUCCESS: "primary",
  FAILED: "destructive",
  REFUNDED: "neutral",
  // Users
  ACTIVE: "primary",
  INACTIVE: "neutral",
  SUSPENDED: "destructive",
  // Roles
  CUSTOMER: "neutral",
  PROVIDER: "primary",
  ADMIN: "gold",
}

export function statusHue(status: string): BrandHue {
  return STATUS_HUE[status.toUpperCase()] ?? "neutral"
}

/** Soft fill for decorative blobs and card backgrounds. */
export function brandSoft(index: number): string {
  return SOFT[brandHue(index)]
}

/** Border colour for tinted cards. */
export function brandBorder(index: number): string {
  return BORDER[brandHue(index)]
}

/** Text-only accent colour. */
export function brandText(index: number): string {
  return BARE[brandHue(index)]
}

export function brandBorderOf(hue: BrandHue): string {
  return BORDER[hue]
}