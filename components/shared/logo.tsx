import { cn } from "@/lib/utils"

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-9", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="gearup-logo-gradient" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--primary)" />
          <stop offset="1" stopColor="oklch(0.45 0.14 162.8)" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="45" height="45" rx="14" fill="url(#gearup-logo-gradient)" />
      <rect x="1.5" y="1.5" width="45" height="45" rx="14" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <rect
          key={deg}
          x="22.4"
          y="7"
          width="3.2"
          height="8.5"
          rx="1.6"
          fill="currentColor"
          opacity="0.9"
          transform={`rotate(${deg} 24 24)`}
          className="text-white"
        />
      ))}
      <circle cx="24" cy="24" r="9" fill="currentColor" className="text-white" />
      <path
        d="M24 18.5 29 23.5 24 28.5 22.8 27.3 26.1 24H19v-1h7.1L22.8 19.7 24 18.5Z"
        fill="var(--primary)"
      />
    </svg>
  )
}

export function Logo({
  showText = true,
  className,
  textClassName,
}: {
  showText?: boolean
  className?: string
  textClassName?: string
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="size-9 shrink-0" />
      {showText && (
        <span className={cn("text-lg font-bold tracking-tight", textClassName)}>
          GearUp<span className="text-primary">.</span>
        </span>
      )}
    </span>
  )
}
