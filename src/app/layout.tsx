import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Mona_Sans } from "next/font/google";
import { MotionProvider } from "@/components/motion";
import { links } from "@/content/profile";
import { siteUrl } from "@/lib/site";
import "./globals.css";
import "./site.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Display and body face. The width axis gives the semi-condensed display cut (wdth 87.5) from one file.
const mona = Mona_Sans({
  variable: "--font-mona",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // The full name leads so a search for it matches the title exactly; child pages get "Page · Name".
  title: {
    default: "Shravani BS Bollapragada · Undergraduate Researcher, Life Sciences",
    template: "%s · Shravani BS Bollapragada",
  },
  description:
    "Shravani BS Bollapragada, undergraduate researcher in the life sciences at JAIN (Deemed-to-be University), Bengaluru, working on cancer biology, transcriptomics and molecular imaging.",
  applicationName: "Shravani BS Bollapragada",
  authors: [{ name: "Shravani BS Bollapragada", url: siteUrl }],
  creator: "Shravani BS Bollapragada",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Shravani BS Bollapragada · Undergraduate Researcher, Life Sciences",
    description: "Cancer biology, transcriptomics and molecular imaging. Research, presentations, honors and CV.",
    type: "website",
    url: "/",
    siteName: "Shravani BS Bollapragada",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
  // Google Search Console ownership tag, only needed for URL-prefix verification (DNS verification needs no code).
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  }),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f3038" },
    { media: "(prefers-color-scheme: light)", color: "#e8f8fa" },
  ],
};

// Runs before paint so the stored theme never flashes the wrong colours. Dark is the default.
// data-js lets CSS hold the hero name below its masks until GSAP runs the load sequence.
// Structured data so search engines tie the site to the same person as the linked profiles.
// WebSite gives Google the site name for results; ProfilePage marks this as that person's own page.
const personId = `${siteUrl}/#person`;
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Shravani BS Bollapragada",
      alternateName: ["Shravani Bollapragada"],
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile`,
      url: siteUrl,
      name: "Shravani BS Bollapragada · Undergraduate Researcher, Life Sciences",
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntity: { "@id": personId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: "Shravani BS Bollapragada",
      givenName: "Shravani",
      familyName: "Bollapragada",
      alternateName: "Shravani Bollapragada",
      url: siteUrl,
      jobTitle: "Undergraduate researcher in the life sciences",
      alumniOf: { "@type": "CollegeOrUniversity", name: "JAIN (Deemed-to-be University), Bengaluru" },
      address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
      sameAs: [links.orcid, links.github, links.linkedin],
      identifier: { "@type": "PropertyValue", propertyID: "ORCID", value: links.orcid.replace("https://orcid.org/", "") },
    },
  ],
};

const themeScript = `(function(){document.documentElement.dataset.js='';try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${mona.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
