import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/site/Legal";
import { links } from "@/content/profile";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What this site collects (almost nothing), what the host logs, and how to reach me about your data.",
  alternates: { canonical: "/privacy" },
  openGraph: { title: "Privacy · Shravani BS Bollapragada", url: "/privacy", siteName: "Shravani BS Bollapragada", type: "website" },
};

export default function Privacy() {
  const mail = <a href={`mailto:${links.email}`}>{links.email}</a>;
  return (
    <LegalPage
      kicker="Privacy policy"
      title="Privacy."
      lead={<p>This is a personal portfolio. It has no accounts, no forms, no cookies, no analytics and no ads, and it does not track you.</p>}
    >
      <LegalSection id="who" title="Who runs this site">
        <p>
          Shravani BS Bollapragada, Bengaluru, India, is responsible for this site and for any personal data it
          handles. For anything about this policy or your data, email {mail}.
        </p>
      </LegalSection>

      <LegalSection id="collect" title="What the site collects">
        <p>
          <strong>Nothing, directly.</strong> There are no sign-ups, contact forms, comment boxes, tracking pixels,
          analytics or advertising scripts.
        </p>
        <p>
          The fonts, images, research figures, simulation clips and resume are all served from this site itself, so
          opening them does not contact Google, YouTube or any other third party.
        </p>
      </LegalSection>

      <LegalSection id="storage" title="Storage on your device">
        <p>
          The site sets <strong>no cookies</strong>. It saves one thing in your browser&rsquo;s local storage: your
          light or dark theme choice (the key <code>theme</code>), so the page remembers it next time. It never leaves
          your device and is removed when you clear this site&rsquo;s data. Because it only stores a preference you
          chose, no consent banner is needed.
        </p>
        <p>
          The &ldquo;Copy email&rdquo; button copies my address to your clipboard on your own device. Nothing is sent
          anywhere.
        </p>
      </LegalSection>

      <LegalSection id="hosting" title="Hosting and server logs">
        <p>
          The site is hosted by Vercel. Like any web host, Vercel processes standard technical details of each
          request, such as your IP address, browser type, the page requested and the time, to deliver the site and
          protect it from abuse. I don&apos;t use this data to identify or profile visitors. Vercel&apos;s handling of
          it is described in the{" "}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
            Vercel privacy policy
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection id="email" title="If you email me">
        <p>
          Your email address and message are used only to read and reply to what you sent. I don&apos;t share or sell
          them, don&apos;t add you to any mailing list, and will delete our correspondence if you ask. Your email
          provider and mine process messages under their own policies.
        </p>
      </LegalSection>

      <LegalSection id="links" title="Links to other sites">
        <p>
          Links to GitHub, LinkedIn, LinkedIn articles, certificate issuers and other sites take you to services with
          their own privacy policies, which apply once you leave this one.
        </p>
      </LegalSection>

      <LegalSection id="rights" title="Your rights">
        <p>
          Wherever you are, you can ask what personal data I hold about you (in practice, only emails you have sent
          me), ask me to correct it, or ask me to delete it. This includes the rights given by India&rsquo;s Digital
          Personal Data Protection Act, 2023 and, for visitors in the EU or UK, the GDPR. Email {mail}; I&apos;ll
          respond within 30 days. This address is also the contact for any grievance about how your data is handled.
        </p>
      </LegalSection>

      <LegalSection id="children" title="Children">
        <p>The site is not directed at children and does not knowingly collect data from anyone.</p>
      </LegalSection>

      <LegalSection id="changes" title="Changes">
        <p>
          If the site ever starts collecting anything, for example visitor analytics, this page will be updated first
          and the date at the top will change.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
