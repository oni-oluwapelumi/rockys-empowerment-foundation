import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Heart, House, Stethoscope } from "lucide-react";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { type DonationDetails, supabase } from "@/lib/supabase";

export const Route = createFileRoute("/donate")({
  component: DonatePage,
});

function DonatePage() {
  const [details, setDetails] = useState<DonationDetails | null>(null);
  const [amountInput, setAmountInput] = useState("");
  const [currency, setCurrency] = useState("NGN");
  const [amountError, setAmountError] = useState("");
  const minimumAmount = currency === "NGN" ? 100 : 1;

  useEffect(() => {
    void supabase
      ?.from("donation_details")
      .select("*")
      .eq("id", 1)
      .maybeSingle()
      .then(({ data }) => setDetails((data as DonationDetails | null) ?? null));
  }, []);

  const validateDonation = (event: React.FormEvent<HTMLFormElement>) => {
    const amount = Number(amountInput);
    if (!Number.isFinite(amount) || amount < minimumAmount) {
      event.preventDefault();
      setAmountError(`Please enter at least ${minimumAmount} ${currency} to continue.`);
      return;
    }
    setAmountError("");
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="overflow-hidden bg-secondary py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary">
              Give with purpose
            </p>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-tight text-white sm:text-6xl">
              Help us build stronger, more resilient communities.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/75">
              Your support helps Rocky&apos;s Empowerment Foundation deliver compassionate and
              sustainable community programs.
            </p>
          </div>
        </section>

        <section className="bg-surface-warm py-20 sm:py-24">
          <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:px-8">
            <article className="rounded-2xl border border-border/70 bg-white p-8 sm:p-10">
              <Heart className="h-10 w-10 text-primary" />
              <h2 className="mt-6 font-display text-3xl font-bold text-secondary">
                Make a donation
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Choose an amount and currency, then continue to Flutterwave&apos;s secure payment
                page.
              </p>
              <form
                method="POST"
                action="https://checkout.flutterwave.com/v3/hosted/pay"
                target="_top"
                onSubmit={validateDonation}
                className="mt-6 grid gap-4"
                noValidate
              >
                <input
                  type="hidden"
                  name="public_key"
                  value={import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY}
                />
                <input
                  type="hidden"
                  name="PBFPubKey"
                  value={import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY}
                />
                <input type="hidden" name="tx_ref" value={`RF_DONATION_${Date.now()}`} />
                <input
                  type="hidden"
                  name="payment_options"
                  value={currency === "NGN" ? "card, banktransfer, ussd" : "card"}
                />
                <input type="hidden" name="customer[email]" value="Rockystv21@gmail.com" />
                <input type="hidden" name="customer[phone_number]" value="07064352758" />
                <input type="hidden" name="customer[name]" value="Rocky's Foundation Donor" />
                <input
                  type="hidden"
                  name="customizations[title]"
                  value="Rocky's Empowerment Foundation"
                />
                <input
                  type="hidden"
                  name="customizations[description]"
                  value="Support Foundation Initiatives"
                />
                <label className="grid gap-1.5 text-sm font-semibold text-secondary">
                  Donation amount
                  <input
                    name="amount"
                    step="0.01"
                    type="number"
                    inputMode="decimal"
                    value={amountInput}
                    onChange={(event) => {
                      setAmountInput(event.target.value);
                      setAmountError("");
                    }}
                    placeholder={currency === "NGN" ? "Minimum 100" : "Minimum 1"}
                    aria-describedby="donation-minimum"
                    className="rounded-md border border-border px-3 py-2.5 font-normal text-foreground outline-none focus:border-primary"
                  />
                  <span className="font-normal text-muted-foreground">
                    Minimum donation: {currency === "NGN" ? "100 NGN" : `1 ${currency}`}
                  </span>
                  {amountError && (
                    <span id="donation-minimum" role="alert" className="font-normal text-primary">
                      {amountError}
                    </span>
                  )}
                </label>
                <label className="grid gap-1.5 text-sm font-semibold text-secondary">
                  Currency
                  <select
                    name="currency"
                    value={currency}
                    onChange={(event) => {
                      setCurrency(event.target.value);
                      setAmountError("");
                    }}
                    className="rounded-md border border-border bg-white px-3 py-2.5 font-normal text-foreground outline-none focus:border-primary"
                  >
                    <option value="NGN">Nigerian naira (NGN)</option>
                    <option value="USD">US dollar (USD)</option>
                    <option value="GBP">British pound (GBP)</option>
                    <option value="EUR">Euro (EUR)</option>
                  </select>
                </label>
                <button
                  type="submit"
                  className="mt-2 rounded-md bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Continue to secure payment
                </button>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Payments are processed by Flutterwave. By continuing, you agree to our{" "}
                  <a href="/donation-policy" className="font-semibold text-primary underline">
                    Donation &amp; Refund Policy
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="font-semibold text-primary underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
              {details?.account_number ? (
                <>
                  <h3 className="mt-10 font-display text-2xl font-bold text-secondary">
                    Bank donation details
                  </h3>
                  <dl className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
                    <div>
                      <dt className="font-bold text-secondary">Bank</dt>
                      <dd>{details.bank_name}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-secondary">Account name</dt>
                      <dd>{details.account_name}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-secondary">Account number</dt>
                      <dd>{details.account_number}</dd>
                    </div>
                    {details.instructions && (
                      <div>
                        <dt className="font-bold text-secondary">Instructions</dt>
                        <dd>{details.instructions}</dd>
                      </div>
                    )}
                  </dl>
                </>
              ) : (
                <>
                  <h3 className="mt-10 font-display text-2xl font-bold text-secondary">
                    Bank donation details coming soon
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    Bank and account details will be added here shortly. Thank you for your
                    willingness to support this work.
                  </p>
                </>
              )}
            </article>
            <aside className="impact-card overflow-hidden rounded-2xl p-8 text-primary-foreground sm:p-10">
              <div className="impact-scene" aria-hidden="true">
                <div className="impact-orbit impact-orbit-one" />
                <div className="impact-orbit impact-orbit-two" />
                <div className="impact-globe">
                  <span className="impact-meridian impact-meridian-one" />
                  <span className="impact-meridian impact-meridian-two" />
                  <span className="impact-latitude impact-latitude-one" />
                  <span className="impact-latitude impact-latitude-two" />
                </div>
                <span className="impact-icon impact-icon-heart">
                  <Heart className="h-4 w-4 fill-current" />
                </span>
                <span className="impact-icon impact-icon-home">
                  <House className="h-4 w-4" />
                </span>
                <span className="impact-icon impact-icon-book">
                  <BookOpen className="h-4 w-4" />
                </span>
                <span className="impact-icon impact-icon-care">
                  <Stethoscope className="h-4 w-4" />
                </span>
              </div>
              <h2 className="mt-7 font-display text-2xl font-bold">Every gift matters.</h2>
              <p className="mt-4 leading-relaxed text-primary-foreground/85">
                Your generosity sends care, opportunity, and hope farther into our communities.
              </p>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
