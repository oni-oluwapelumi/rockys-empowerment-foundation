import { createFileRoute } from "@tanstack/react-router";
import { contactEmail, LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/terms")({ component: TermsPage });

function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      intro="These terms govern your use of Rocky's Empowerment Foundation's website. By using the site, you agree to these terms and all applicable laws."
    >
      <section>
        <h2>Website purpose</h2>
        <p className="mt-3">
          The website provides information about our mission, programs, leadership, volunteering,
          communications, and ways to support our work. Website information is general and is not
          professional medical, legal, financial, or emergency advice.
        </p>
      </section>
      <section>
        <h2>Acceptable use</h2>
        <ul className="mt-3">
          <li>
            Do not misuse the website, interfere with its operation, attempt unauthorised access, or
            introduce malicious code.
          </li>
          <li>Do not submit false, unlawful, abusive, infringing, or misleading material.</li>
          <li>
            Do not impersonate another person or use another person&apos;s payment or contact
            details without authority.
          </li>
        </ul>
      </section>
      <section>
        <h2>Donations and third-party services</h2>
        <p className="mt-3">
          Donations are subject to our <a href="/donation-policy">Donation &amp; Refund Policy</a>.
          Payments are processed by Flutterwave, whose terms and privacy practices also apply. Other
          third-party links are provided for convenience; we do not control their availability or
          content.
        </p>
      </section>
      <section>
        <h2>Content and intellectual property</h2>
        <p className="mt-3">
          Unless otherwise stated, the website&apos;s branding, text, graphics, and original
          materials belong to or are licensed to Rocky&apos;s Empowerment Foundation. You may view
          and share public pages for personal, informational, and non-commercial use with
          attribution. Other copying or commercial use requires written permission.
        </p>
      </section>
      <section>
        <h2>Accuracy and availability</h2>
        <p className="mt-3">
          We aim to keep information accurate and current but do not guarantee that every page will
          always be complete, error-free, or available. Program dates, locations, eligibility, and
          activities may change. Confirm time-sensitive details with us before relying on them.
        </p>
      </section>
      <section>
        <h2>Responsibility</h2>
        <p className="mt-3">
          To the extent permitted by law, the website is provided without implied guarantees beyond
          those that cannot lawfully be excluded. We are not responsible for indirect losses caused
          by use of, or inability to use, the website. Nothing in these terms excludes liability
          that applicable law does not allow us to exclude.
        </p>
      </section>
      <section>
        <h2>Privacy, changes, and contact</h2>
        <p className="mt-3">
          Our <a href="/privacy">Privacy Policy</a> explains how we handle personal information. We
          may update these terms and will post the current version here. Questions may be sent to{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>
      </section>
    </LegalPage>
  );
}
