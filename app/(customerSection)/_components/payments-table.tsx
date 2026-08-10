import { CreditCard } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { Payment } from "@/lib/types"

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  SUCCESS: "bg-green-100 text-green-700",
  FAILED: "bg-red-100 text-red-700",
  REFUNDED: "bg-orange-100 text-orange-700",
}

interface PaymentsTableProps {
  payments: Payment[]
}

export function PaymentsTable({ payments }: PaymentsTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <Table className="min-w-[500px]">
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Gear</TableHead>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <CreditCard className="size-4 text-primary" />
                  <span className="font-medium">{payment.rental?.gear.name ?? "N/A"}</span>
                </div>
              </TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {payment.transaction_id}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {payment.paid_at
                  ? new Date(payment.paid_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                  : new Date(payment.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </TableCell>
              <TableCell>
                <Badge
                  className={STATUS_COLORS[payment.status]}
                  variant="outline"
                >
                  {payment.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-medium">
                ${payment.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {payments.length === 0 && (
        <div className="py-12 text-center text-sm text-muted-foreground">
          No payment history found.
        </div>
      )}
    </div>
  )
}
