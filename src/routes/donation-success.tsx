import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Clock3, XCircle } from "lucide-react";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";

export const Route = createFileRoute("/donation-success")({
  validateSearch: (search: Record<string, unknown>) => ({
    status: typeof search.status === "string" ? search.status : "pending",
    tx_ref: typeof search.tx_ref === "string" ? search.tx_ref : "",
    transaction_id: typeof search.transaction_id === "string" ? search.transaction_id : "",
  }),
  component: DonationSuccessPage,
});

function DonationSuccessPage() {
  const { status, tx_ref: reference } = Route.useSearch();
  const successful = status === "successful" || status === "completed";
  const failed = status === "failed" || status === "cancelled";
  const Icon = successful ? CheckCircle2 : failed ? XCircle : Clock3;

  useEffect(() => {
    if (!successful || !reference.startsWith("RF_DONATION_")) return;
    void fetch("/api/flutterwave/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tx_ref: reference }),
    });
  }, [reference, successful]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="bg-surface-warm px-4 py-20 sm:py-28">
        <section className="mx-auto max-w-2xl rounded-3xl border border-border/70 bg-white p-8 text-center shadow-xl sm:p-12">
          <span
            className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
              failed ? "bg-red-50 text-red-600" : "bg-primary/10 text-primary"
            }`}
          >
            <Icon className="h-9 w-9" aria-hidden="true" />
          </span>
          <p className="mt-7 text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Donation update
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold text-secondary">
            {successful
              ? "Thank you for your generous support."
              : failed
                ? "Your payment was not completed."
                : "Your payment is being processed."}
          </h1>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            {successful
              ? "Flutterwave has received your payment. Our secure webhook will independently verify and record the donation before it appears in our internal records."
              : failed
                ? "No completed donation has been recorded. You may return to the donation page and try again."
                : "Some payment methods take a little longer to confirm. Please keep your transaction reference for your records."}
          </p>
          {reference && (
            <div className="mt-7 rounded-2xl bg-surface-warm p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Transaction reference
              </p>
              <p className="mt-2 break-all font-mono text-sm font-semibold text-secondary">
                {reference}
              </p>
            </div>
          )}
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Questions about a donation? Email{" "}
            <a
              href="mailto:info@rockysempowermentfoundation.org"
              className="font-semibold text-primary underline underline-offset-2"
            >
              info@rockysempowermentfoundation.org
            </a>
            .
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md bg-secondary px-6 py-3 text-sm font-bold text-secondary-foreground"
            >
              Return Home
            </Link>
            {!successful && (
              <Link
                to="/donate"
                search={{ campaign: "general" }}
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
              >
                Return to Donation Page
              </Link>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
