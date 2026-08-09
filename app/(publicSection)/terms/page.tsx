import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Privacy Policy | GearUp Bangladesh",
  description: "GearUp Bangladesh terms of service and privacy policy.",
}

export default function TermsPage() {
  return (
    <div className="px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">Terms & Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: July 2026</p>

        <div className="prose prose-sm mt-10 space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-xl font-bold text-foreground">1. Acceptance of Terms</h2>
            <p className="mt-2 leading-relaxed">
              By accessing or using GearUp (&quot;the Platform&quot;), operated by GearUp Bangladesh
              (&quot;the Company&quot;), you agree to be bound by these Terms of Service. If you do
              not agree, do not use the Platform. These terms apply to all users — customers,
              providers, and visitors.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">2. Definitions</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
              <li><strong>Customer:</strong> A user who rents gear from the Platform.</li>
              <li><strong>Provider:</strong> A user who lists gear for rent on the Platform.</li>
              <li><strong>Gear:</strong> Any sports or outdoor equipment listed for rent.</li>
              <li><strong>Rental:</strong> A transaction where a Customer books Gear from a Provider for a specific period.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">3. User Accounts</h2>
            <p className="mt-2 leading-relaxed">
              You must be at least 18 years old to create an account. You are responsible for
              maintaining the confidentiality of your account credentials. You must provide
              accurate and complete information during registration. One person may not maintain
              more than one account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">4. Rentals & Payments</h2>
            <p className="mt-2 leading-relaxed">
              All payments are processed through Stripe. Customers are charged after a Provider
              confirms the rental. GearUp charges a service fee on each transaction. Providers
              receive payouts after the rental is confirmed and picked up. Cancellations before
              the rental start date receive a full refund. Cancellations after payment may incur
              a fee.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">5. Damage & Liability</h2>
            <p className="mt-2 leading-relaxed">
              Providers are responsible for listing gear in good, working condition. Customers
              are responsible for returning gear in the same condition. Damage protection is
              included in every rental. Claims are reviewed by the GearUp team within 48 hours.
              GearUp is not liable for injuries caused by misuse of rented gear.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">6. Prohibited Conduct</h2>
            <p className="mt-2 leading-relaxed">
              Users may not list counterfeit, stolen, or illegal items. Users may not engage in
              fraud, harassment, or abuse of the Platform. Violations may result in account
              suspension or permanent ban. GearUp reserves the right to remove any listing
              without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">7. Privacy Policy</h2>
            <p className="mt-2 leading-relaxed">
              We collect personal information (name, email, phone, address) to provide our
              services. Payment information is handled by Stripe and is never stored on our
              servers. We do not sell or share personal data with third parties except as
              required by law. Usage data (analytics) is collected to improve the Platform.
              You may request deletion of your data by contacting{" "}
              <a href="mailto:privacy@gearup.com.bd" className="text-primary hover:underline">
                privacy@gearup.com.bd
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">8. Dispute Resolution</h2>
            <p className="mt-2 leading-relaxed">
              Disputes between Customers and Providers should first be reported through the
              Platform. GearUp will mediate fairly. These terms are governed by the laws of
              the People&apos;s Republic of Bangladesh. Any legal disputes shall be resolved in
              the courts of Dhaka, Bangladesh.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">9. Changes to Terms</h2>
            <p className="mt-2 leading-relaxed">
              GearUp reserves the modify these terms at any time. Changes will be posted on
              this page with an updated date. Continued use of the Platform after changes
              constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground">10. Contact</h2>
            <p className="mt-2 leading-relaxed">
              For questions about these terms, contact us at{" "}
              <a href="mailto:legal@gearup.com.bd" className="text-primary hover:underline">
                legal@gearup.com.bd
              </a>{" "}
              or write to: GearUp Bangladesh, House 12, Road 5, Dhanmondi, Dhaka 1205.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
