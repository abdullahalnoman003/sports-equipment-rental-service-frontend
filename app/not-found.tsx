import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dumbbell, SearchX } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-20">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded-full bg-primary/10">
          <SearchX className="size-10 text-primary" />
        </div>

        <h1 className="text-6xl font-bold tracking-tight text-primary">404</h1>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight">Page Not Found</h2>
        <p className="mt-3 text-muted-foreground">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or you entered the wrong URL.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/">Go Back Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/gear">Browse Gear</Link>
          </Button>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          If you think this is an error, please contact our support team.
        </p>
      </div>
    </div>
  )
}
