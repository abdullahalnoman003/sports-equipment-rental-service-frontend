/**
 * Grid helpers that guarantee a *full* row of cards.
 *
 * The landing page must never show a half-empty row. Two things break that:
 *
 *  1. A fixed column count with a count that isn't a multiple of it
 *     (e.g. 8 cards in 3 columns -> 3 + 3 + 2, one orphan).
 *  2. A data-driven grid whose item count shrinks (e.g. only 2 providers
 *     exist, but the grid is hard-coded to 4 columns -> 2 empty cells).
 *
 * `fillGrid` solves both: pick a column count that divides the item count
 * evenly, then return only the items that fit.
 *
 * IMPORTANT: a responsive column chain is only safe if *every* step in the
 * chain divides the item count. A chain of 2 -> 3 -> 4 is fine for 12 cards but
 * renders 4 cards as 3 + 1 at the 3-column step. `colsClass` therefore only ever
 * emits divisors of `cols`.
 */

/**
 * Full static class strings so the Tailwind scanner sees every variant.
 * Every breakpoint listed here is a divisor of the column count, so a count
 * that is a multiple of `cols` fills completely at every screen size.
 */
const COL_CLASSES: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-5",
  6: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6",
}

export function colsClass(cols: number): string {
  return COL_CLASSES[cols] ?? COL_CLASSES[4]
}

/**
 * Choose the column count that divides `count` most evenly, preferring wider
 * grids on ties so the layout stays visually balanced.
 */
export function bestCols(count: number, maxCols = 4): number {
  if (count <= 1) return 1

  const upper = Math.min(count, maxCols)
  let best = 1
  let bestWaste = Number.POSITIVE_INFINITY

  for (let c = upper; c >= 2; c--) {
    const waste = count % c
    if (waste < bestWaste) {
      bestWaste = waste
      best = c
    }
    if (waste === 0) break
  }

  return best
}

export interface FillGridResult<T> {
  items: T[]
  cols: number
}

/**
 * Trim `items` so they fill complete rows of `cols` columns.
 * Items are never duplicated or invented — anything that would leave a
 * partial trailing row is dropped.
 */
export function fillGrid<T>(items: T[], maxCols = 4): FillGridResult<T> {
  const cols = bestCols(items.length, maxCols)
  const filled = Math.floor(items.length / cols) * cols
  return { items: items.slice(0, filled), cols }
}

/**
 * Cap a list at the largest multiple of `step` that does not exceed it,
 * so the result divides evenly across the section's column chain.
 */
export function capToMultiple(count: number, step: number, max: number): number {
  const capped = Math.min(count, max)
  const filled = Math.floor(capped / step) * step
  return filled > 0 ? filled : capped
}