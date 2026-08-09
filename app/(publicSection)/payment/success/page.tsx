import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PaymentSuccessPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-20">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="size-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Payment Successful!</h1>
        <p className="mt-3 text-muted-foreground">
          Your rental has been confirmed. The provider will be notified and you&apos;ll receive
          a confirmation email shortly.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Button asChild>
            <Link href="/dashboard/customer">View My Rentals</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/gear">Browse More Gear</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
