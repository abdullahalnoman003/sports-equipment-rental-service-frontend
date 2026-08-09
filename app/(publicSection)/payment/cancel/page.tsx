import Link from "next/link"
import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PaymentCancelPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-20">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-red-100">
          <XCircle className="size-10 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Payment Cancelled</h1>
        <p className="mt-3 text-muted-foreground">
          Your payment was not processed. The rental is still pending and you can
          try again from your dashboard.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Button asChild>
            <Link href="/dashboard/customer">Go to Dashboard</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/gear">Browse Gear</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
