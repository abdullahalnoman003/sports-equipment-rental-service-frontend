import { BrandLoader } from "@/components/shared/loader"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl animate-pulse-soft" />
        <div className="absolute -left-32 -top-32 size-80 rounded-full bg-primary/5 blur-3xl animate-pulse-soft [animation-delay:1s]" />
        <div className="absolute -bottom-32 -right-32 size-80 rounded-full bg-primary/5 blur-3xl animate-pulse-soft [animation-delay:2s]" />
      </div>

      <div className="relative z-10">
        <BrandLoader />
      </div>
    </div>
  )
}
