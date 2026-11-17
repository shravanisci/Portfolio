import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/site/Legal";
import { links } from "@/content/profile";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "How this site is built to be accessible, its known limitations, and how to report a problem.",
  alternates: { canonical: "/accessibility" },
  openGraph: { title: "Accessibility · Shravani BS Bollapragada", url: "/accessibility", siteName: "Shravani BS Bollapragada", type: "website" },
};

export default function Accessibility() {
  const mail = <a href={`mailto:${links.email}`}>{links.email}</a>;
  return (
    <LegalPage
      kicker="Accessibility statement"
      title="Accessibility."
      lead={<p>This site aims to be usable by everyone, and aims to meet WCAG 2.2 at level AA.</p>}
    >
      <LegalSection id="built" title="What's built in">
        <ul>
          <li>Everything works with a keyboard alone, with a visible focus ring and a &ldquo;Skip to selected research&rdquo; link.</li>
          <li>Menus and case studies trap focus while open, close with Escape, and return focus to where you were.</li>
          <li>
            If your device is set to reduce motion, all text appears at once and the tilt, parallax, bouncing arrow and
            rolling menu text are switched off. Simulation clips never autoplay in that mode.
          </li>
          <li>Light and dark themes, with text colours chosen for AA contrast in both.</li>
          <li>Pages zoom and reflow down to 320px wide without sideways scrolling.</li>
          <li>Research figures have text descriptions, and each case study states its findings in words, not only in plots.</li>
          <li>Decorative letters, backgrounds and duplicate labels are hidden from screen readers so headings are read once.</li>
        </ul>
      </LegalSection>

      <LegalSection id="limits" title="Known limitations">
        <ul>
          <li>The plots are images. Their key numbers are in the text, but the full underlying data tables are not on the site.</li>
          <li>The molecular dynamics clips have no audio and no narration; their captions describe what each one shows.</li>
          <li>The Writing section scrolls sideways; buttons and keyboard focus both move through it.</li>
          <li>The site has been tested with keyboard and in Chrome at several screen sizes, but has not yet had a full audit with every screen reader.</li>
        </ul>
      </LegalSection>

      <LegalSection id="report" title="Report a problem">
        <p>
          If something is hard to use, or you need any content in another format, email {mail}. Please mention the
          page and what you were trying to do. You can expect a reply within 7 days.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
