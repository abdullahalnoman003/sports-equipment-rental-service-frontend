/**
 * Demo account roles available on the login page.
 *
 * Credentials stay on the server: `demoLoginAction` reads them from env vars and
 * calls the API directly. The client only ever learns which roles exist, so
 * nothing sensitive ships in the browser bundle.
 */

export type DemoRole = "CUSTOMER" | "PROVIDER" | "ADMIN"

export interface DemoAccount {
  role: DemoRole
  label: string
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  { role: "CUSTOMER", label: "Customer" },
  { role: "PROVIDER", label: "Provider" },
  { role: "ADMIN", label: "Admin" },
]