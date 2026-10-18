import type { ReactNode } from "react"
import { BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChartFrameProps {
  title: string
  description?: string
  action?: ReactNode
  /** Rendered instead of the chart when there is nothing to draw. */
  empty?: boolean
  emptyMessage?: string
  children: ReactNode
  className?: string
}

/** Consistent card shell for every chart, so they all match visually. */
export function ChartFrame({
  title,
  description,
  action,
  empty = false,
  emptyMessage = "No data yet",
  children,
  className,
}: ChartFrameProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/25 sm:p-6",
        className
      )}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold tracking-tight">{title}</h3>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {action}
      </div>

      {empty ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-12 text-center">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
            <BarChart3 className="size-5 text-primary/70" />
          </span>
          <p className="mt-3 text-sm text-muted-foreground">{emptyMessage}</p>
        </div>
      ) : (
        children
      )}
    </div>
  )
}

/** Vertical bar chart. Values are labelled so no tooltip is required. */
export function BarChart({
  data,
  format = (v) => String(v),
  className,
}: {
  data: { label: string; value: number }[]
  format?: (value: number) => string
  className?: string
}) {
  const max = Math.max(...data.map((d) => d.value), 1)

  return (
    <div className={cn("space-y-3.5", className)}>
      {data.map((point) => (
        <div key={point.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{point.label}</p>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700"
                style={{ width: `${Math.max(2, (point.value / max) * 100)}%` }}
              />
            </div>
          </div>
          <span className="shrink-0 text-sm font-bold tabular-nums text-primary">
            {format(point.value)}
          </span>
        </div>
      ))}
    </div>
  )
}

/** Line chart with an area fill, drawn with plain SVG. */
export function LineChart({
  data,
  format = (v) => String(v),
  height = 200,
  className,
}: {
  data: { label: string; value: number }[]
  format?: (value: number) => string
  height?: number
  className?: string
}) {
  const W = 600
  const H = height
  const PAD_X = 8
  const PAD_Y = 16

  const max = Math.max(...data.map((d) => d.value), 1)
  const stepX = data.length > 1 ? (W - PAD_X * 2) / (data.length - 1) : 0

  const points = data.map((point, i) => {
    const x = PAD_X + i * stepX
    const y = H - PAD_Y - (point.value / max) * (H - PAD_Y * 2)
    return { x, y, ...point }
  })

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ")

  const areaPath =
    points.length > 0
      ? `${linePath} L${points[points.length - 1].x.toFixed(1)},${H - PAD_Y} L${points[0].x.toFixed(1)},${H - PAD_Y} Z`
      : ""

  const peak = points.reduce((m, p) => Math.max(m, p.value), 0)

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label={`Trend peaking at ${format(peak)}`}
      >
        <defs>
          <linearGradient id="lineAreaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Gridlines */}
        {[0.25, 0.5, 0.75].map((t) => (
          <line
            key={t}
            x1={PAD_X}
            x2={W - PAD_X}
            y1={H - PAD_Y - t * (H - PAD_Y * 2)}
            y2={H - PAD_Y - t * (H - PAD_Y * 2)}
            stroke="var(--border)"
            strokeDasharray="4 6"
          />
        ))}

        {areaPath && <path d={areaPath} fill="url(#lineAreaFill)" />}
        <path
          d={linePath}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((p) => (
          <circle
            key={p.label}
            cx={p.x}
            cy={p.y}
            r="3.5"
            fill="var(--background)"
            stroke="var(--primary)"
            strokeWidth="2.5"
          />
        ))}
      </svg>

      <div className="mt-2 flex justify-between">
        {data.map((p, i) => (
          <span
            key={p.label}
            className="text-[11px] font-medium text-muted-foreground"
            style={{ display: i % Math.ceil(data.length / 6) === 0 ? "block" : "none" }}
          >
            {p.label}
          </span>
        ))}
      </div>
    </div>
  )
}

/** Donut chart with a centred total and a colour-coded legend. */
export function PieChart({
  data,
  format = (v) => String(v),
  totalLabel = "Total",
}: {
  data: { label: string; value: number }[]
  format?: (value: number) => string
  totalLabel?: string
}) {
  const HUES = [
    "var(--primary)",
    "var(--gold)",
    "var(--slate-accent)",
    "var(--primary)",
    "var(--gold)",
    "var(--slate-accent)",
  ]

  const total = data.reduce((sum, d) => sum + d.value, 0)
  const size = 180
  const radius = 68
  const stroke = 26
  const circumference = 2 * Math.PI * radius

  let offset = 0

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="size-full -rotate-90"
          role="img"
          aria-label={`${totalLabel}: ${format(total)}`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--muted)"
            strokeWidth={stroke}
          />
          {total > 0 &&
            data.map((point, i) => {
              const fraction = point.value / total
              const dash = fraction * circumference
              const el = (
                <circle
                  key={point.label}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke={HUES[i % HUES.length]}
                  strokeWidth={stroke}
                  strokeDasharray={`${dash} ${circumference - dash}`}
                  strokeDashoffset={-offset}
                  strokeLinecap="butt"
                  className="transition-all duration-700"
                />
              )
              offset += dash
              return el
            })}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold leading-none">{format(total)}</span>
          <span className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
            {totalLabel}
          </span>
        </div>
      </div>

      <ul className="w-full min-w-0 flex-1 space-y-2.5">
        {data.map((point, i) => (
          <li key={point.label} className="flex items-center gap-2.5 text-sm">
            <span
              className="size-3 shrink-0 rounded-sm"
              style={{ background: HUES[i % HUES.length] }}
            />
            <span className="min-w-0 flex-1 truncate text-muted-foreground">{point.label}</span>
            <span className="shrink-0 font-semibold tabular-nums">{format(point.value)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}