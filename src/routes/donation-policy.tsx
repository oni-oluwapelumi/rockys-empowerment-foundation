import { createFileRoute } from "@tanstack/react-router";
import { contactEmail, LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/donation-policy")({ component: DonationPolicyPage });

function DonationPolicyPage() {
  return (
    <LegalPage
      title="Donation & Refund Policy"
      intro="This policy explains how donations are used and when a donation may be corrected or refunded."
    >
      <section>
        <h2>Using your donation</h2>
        <p className="mt-3">
          Donations support Rocky&apos;s Empowerment Foundation&apos;s charitable mission, programs,
          administration, safeguarding, and reasonable operational costs. Unless a campaign
          expressly guarantees restricted use, a donation may be applied where the need is greatest.
          If a restricted purpose becomes impossible or fully funded, we may contact the donor or
          apply the funds to a closely related charitable purpose, as permitted by law.
        </p>
      </section>
      <section>
        <h2>Payment processing and confirmation</h2>
        <p className="mt-3">
          Online payments are processed by Flutterwave. Donors are responsible for providing
          accurate contact and payment information and confirming the amount and currency before
          authorising payment. A processor confirmation is evidence that a transaction was
          submitted; final acceptance may depend on successful settlement and verification.
        </p>
      </section>
      <section>
        <h2>Refund eligibility</h2>
        <p className="mt-3">
          Donations are normally final because charitable programs may rely on funds soon after
          receipt. We will nevertheless review requests involving a duplicate payment, an incorrect
          amount, a technical error, suspected unauthorised use, or another exceptional
          circumstance. A request does not guarantee a refund, and statutory rights remain
          unaffected.
        </p>
      </section>
      <section>
        <h2>How to request a review</h2>
        <p className="mt-3">
          Email <a href={`mailto:${contactEmail}`}>{contactEmail}</a> as soon as possible,
          preferably within seven days of the transaction. Include the donor name, transaction
          reference, date, amount, currency, reason, and a safe contact method. Never email full
          card details, passwords, PINs, or one-time codes.
        </p>
      </section>
      <section>
        <h2>Approved refunds</h2>
        <p className="mt-3">
          We may verify the request with the donor and payment provider. Approved refunds are
          normally returned through the original payment method and may take time to appear due to
          processor or bank timelines. Processing or transfer fees may be deducted or non-refundable
          where they have already been charged and the law permits.
        </p>
      </section>
      <section>
        <h2>Chargebacks and bank transfers</h2>
        <p className="mt-3">
          Please contact us before starting a chargeback so we can investigate promptly. For
          bank-transfer errors, contact both us and your bank immediately; recovery may depend on
          the receiving bank and applicable payment rules.
        </p>
      </section>
      <section>
        <h2>Policy updates</h2>
        <p className="mt-3">
          We may update this policy to reflect changes in our programs, payment providers, or
          applicable requirements. The current version will be posted here.
        </p>
      </section>
    </LegalPage>
  );
}
