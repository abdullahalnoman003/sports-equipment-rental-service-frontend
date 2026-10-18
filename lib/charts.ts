/**
 * Chart data helpers.
 *
 * Pure functions so the maths can be reasoned about and reused on the server
 * before anything reaches a chart component. No charting library is used, which
 * keeps the bundle small and guarantees every chart only uses the 3 brand hues
 * defined in `lib/brand.ts`.
 */

export interface Point {
  label: string
  value: number
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

/**
 * Buckets records into the last `count` calendar months.
 * Records without a usable date are ignored rather than bucketed into "now",
 * so a malformed timestamp cannot distort a chart.
 */
export function monthlySeries<T>(
  items: T[],
  count: number,
  getDate: (item: T) => string | undefined | null,
  getValue: (item: T) => number
): Point[] {
  const now = new Date()
  const buckets = new Map<string, number>()

  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    buckets.set(`${d.getFullYear()}-${d.getMonth()}`, 0)
  }

  for (const item of items) {
    const raw = getDate(item)
    if (!raw) continue
    const date = new Date(raw)
    if (Number.isNaN(date.getTime())) continue

    const key = `${date.getFullYear()}-${date.getMonth()}`
    // Ignore anything older than the window we are drawing.
    if (!buckets.has(key)) continue

    const value = getValue(item)
    if (!Number.isFinite(value)) continue

    buckets.set(key, (buckets.get(key) ?? 0) + value)
  }

  return Array.from(buckets.entries()).map(([key, value]) => {
    const [, month] = key.split("-").map(Number)
    return { label: MONTHS[month], value }
  })
}

/** Groups records into ordered categories, sorted by value descending. */
export function categorySeries<T>(
  items: T[],
  getKey: (item: T) => string | null | undefined,
  getValue: (item: T) => number,
  limit = 6
): Point[] {
  const totals = new Map<string, number>()

  for (const item of items) {
    const key = getKey(item)
    if (!key) continue
    const value = getValue(item)
    if (!Number.isFinite(value)) continue
    totals.set(key, (totals.get(key) ?? 0) + value)
  }

  return Array.from(totals.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit)
}

/** Counts occurrences of each distinct key, ordered by count descending. */
export function countSeries<T>(
  items: T[],
  getKey: (item: T) => string | null | undefined,
  order?: string[]
): Point[] {
  const counts = new Map<string, number>()

  for (const item of items) {
    const key = getKey(item)
    if (!key) continue
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }

  const entries = Array.from(counts.entries()).map(([label, value]) => ({ label, value }))

  if (order?.length) {
    const rank = new Map(order.map((name, i) => [name, i]))
    return entries.sort((a, b) => (rank.get(a.label) ?? 99) - (rank.get(b.label) ?? 99))
  }

  return entries.sort((a, b) => b.value - a.value)
}

/** Sum of a numeric projection. */
export function totalOf<T>(items: T[], getValue: (item: T) => number): number {
  return items.reduce((sum, item) => {
    const value = getValue(item)
    return sum + (Number.isFinite(value) ? value : 0)
  }, 0)
}

/** Percentage change between two values, guarding divide-by-zero. */
export function percentChange(current: number, previous: number): number | null {
  if (!previous) return null
  return Math.round(((current - previous) / previous) * 1000) / 10
}

/** Max value across a series, never 0 so charts do not divide by zero. */
export function maxOf(points: Point[]): number {
  const max = points.reduce((m, p) => Math.max(m, p.value), 0)
  return max > 0 ? max : 1
}

/** Compact currency formatting for axis labels. */
export function formatCompact(value: number): string {
  if (Math.abs(value) >= 1000) {
    const thousands = value / 1000
    return `৳${thousands % 1 === 0 ? thousands : thousands.toFixed(1)}k`
  }
  return `৳${Math.round(value)}`
}