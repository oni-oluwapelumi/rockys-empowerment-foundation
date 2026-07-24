import { createFileRoute } from "@tanstack/react-router";
import { contactEmail, LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/privacy")({ component: PrivacyPage });

function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This policy explains how Rocky's Empowerment Foundation collects, uses, shares, and protects personal information when you use our website, donate, volunteer, subscribe, or contact us."
    >
      <section>
        <h2>Who controls your information</h2>
        <p className="mt-3">
          Rocky&apos;s Empowerment Foundation is responsible for the personal information described
          in this policy. Privacy requests may be sent to{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>
      </section>
      <section>
        <h2>Information we collect</h2>
        <ul className="mt-3">
          <li>Contact details such as your name, email address, and phone number.</li>
          <li>
            Volunteer information, including your area of interest and any message you submit.
          </li>
          <li>Newsletter subscription information.</li>
          <li>
            Donation information such as donor details, amount, currency, transaction reference, and
            payment status. We do not intentionally store full payment-card details.
          </li>
          <li>
            Technical and security information needed to operate and protect the website, such as
            device, browser, IP, and error information where made available by our service
            providers.
          </li>
        </ul>
      </section>
      <section>
        <h2>How and why we use information</h2>
        <p className="mt-3">
          We use information to process donations, provide confirmations, respond to enquiries,
          manage volunteers, send requested updates, administer programs, prevent fraud, maintain
          records, improve the website, and comply with applicable obligations. Depending on the
          context, processing is based on consent, steps taken at your request, legitimate
          organisational interests, or legal obligations.
        </p>
      </section>
      <section>
        <h2>Service providers and international processing</h2>
        <p className="mt-3">
          We use service providers including Flutterwave for payment processing and Supabase for
          website data and storage. They process information under their own terms and privacy
          practices. Information may be processed outside your country; where required, we use
          appropriate safeguards and limit sharing to what is necessary.
        </p>
      </section>
      <section>
        <h2>Retention and security</h2>
        <p className="mt-3">
          We retain information only as long as reasonably necessary for the purposes described
          above, including financial, safeguarding, dispute, and legal recordkeeping. We use
          reasonable administrative and technical safeguards, but no online system can be guaranteed
          completely secure.
        </p>
      </section>
      <section>
        <h2>Your choices and rights</h2>
        <p className="mt-3">
          Subject to applicable law, you may ask to access, correct, delete, restrict, or receive a
          copy of your information; object to certain processing; withdraw consent; or unsubscribe
          from communications. You may also complain to the Nigeria Data Protection Commission. We
          may need to verify your identity before acting on a request.
        </p>
      </section>
      <section>
        <h2>Children</h2>
        <p className="mt-3">
          This website is not designed to collect personal information directly from children
          without appropriate parent, guardian, or lawful safeguarding involvement. Contact us if
          you believe a child has submitted information improperly.
        </p>
      </section>
      <section>
        <h2>Changes and contact</h2>
        <p className="mt-3">
          We may update this policy as our services or obligations change. The current version and
          effective date will remain on this page. Questions and requests can be sent to{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>
      </section>
    </LegalPage>
  );
}
