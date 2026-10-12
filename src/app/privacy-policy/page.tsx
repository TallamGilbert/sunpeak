import Link from "next/link";

import { Note } from "@/components/ui/Note";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How the Sunpeak Energy Solutions website handles information submitted through its forms.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Privacy Policy" }]}
        eyebrow="Privacy"
        title="Privacy Policy"
        intro="How this website handles the information you provide."
      />
      <div className="container-site py-16 sm:py-20">
        <div className="max-w-3xl">
          <Note>
            This is template content and is not legal advice. A real business should have its
            privacy notice reviewed against the Kenya Data Protection Act, 2019 and its actual data practices before
            publishing.
          </Note>

          <div className="prose-site mt-10 text-ink">
            <p className="text-muted-text">Last updated: {site.copyrightYear}</p>

            <h2>About this website</h2>
            <p>
              Sunpeak Energy Solutions is a fictional company. By default, its forms run in <strong>demo mode</strong>: entries are checked in your browser and on the
              server, but they are not sent anywhere, stored or shared.
            </p>

            <h2>Information you may provide</h2>
            <p>The quote request and contact forms ask for:</p>
            <ul>
              <li>Your name, phone number and, optionally, email address</li>
              <li>Your property type and town or area</li>
              <li>Your energy concerns, preferred solution and backup requirements</li>
              <li>Optionally, your average monthly electricity bill and any notes you add</li>
            </ul>
            <p>
              The <Link href="/solar-savings">savings calculator</Link> runs entirely in your browser. Figures you
              enter there are not sent to our server.
            </p>

            <h2>How information would be used</h2>
            <p>If this site were connected to a lead-capture system, the information you submit would be used only to:</p>
            <ul>
              <li>Respond to your enquiry or quote request</li>
              <li>Prepare for a consultation about your energy needs</li>
              <li>Keep a record of the request so we can follow up</li>
            </ul>
            <p>It would not be sold, or used for unrelated marketing without your separate consent.</p>

            <h2>Consent</h2>
            <p>
              Forms ask you to confirm that you agree to be contacted about your request. You can withdraw that consent
              at any time by asking us to delete your details.
            </p>

            <h2>Cookies and analytics</h2>
            <p>
              This website does not set advertising or analytics cookies. If analytics were added, this notice would be
              updated to describe them and, where required, ask for your consent.
            </p>

            <h2>Retention and security</h2>
            <p>
              In a live deployment, submitted details would be kept only as long as needed to handle your enquiry and
              any resulting work, and protected with appropriate technical and organisational measures.
            </p>

            <h2>Your rights</h2>
            <p>
              You would have the right to ask what information is held about you, to have it corrected or deleted, and
              to object to its use. Requests would be made using the contact details on the{" "}
              <Link href="/contact">contact page</Link>.
            </p>

            <h2>Contact</h2>
            <p>
              Sample contact email: {site.contact.email}. This address uses a reserved example domain and does not
              receive mail.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
