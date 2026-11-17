import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "./Contact";
import { ThemeButton } from "./TopNav";

export const LEGAL_UPDATED = "12 November 2026";

/** One labelled part of a legal page: the label sits in the left column on wide screens. */
export function LegalSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section className="legal-sec" aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      <div className="legal-body">{children}</div>
    </section>
  );
}

/** Shared frame for Privacy, Terms and Accessibility: small top bar, big title, sections, footer. */
export function LegalPage({ kicker, title, lead, children }: { kicker: string; title: string; lead: ReactNode; children: ReactNode }) {
  return (
    <div className="legal">
      <header className="legal-bar">
        <Link href="/" className="legal-home">
          <span aria-hidden="true">←</span> Shravani BS Bollapragada
        </Link>
        <nav aria-label="Legal" className="legal-nav">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/accessibility">Accessibility</Link>
          <ThemeButton />
        </nav>
      </header>
      <main id="main" className="legal-main">
        <p className="kicker" style={{ margin: 0 }}>
          {`// ${kicker}`}
        </p>
        <h1 className="legal-title disp">{title}</h1>
        <p className="legal-updated">Last updated {LEGAL_UPDATED}</p>
        <div className="legal-lead">{lead}</div>
        {children}
      </main>
      <Footer standalone />
    </div>
  );
}
