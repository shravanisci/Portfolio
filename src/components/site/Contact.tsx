"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { links } from "@/content/profile";

/** © line, privacy link and back-to-top. Also used on the privacy page. */
/** The closing ring behind "LET'S TALK RESEARCH.": the hero's field of view, larger, with one slowly turning dashed ring. */
function ContactField() {
  return (
    <svg className="contact-field" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth=".12">
        <circle cx="50" cy="50" r="49" opacity=".22" />
        <circle className="contact-field-spin" cx="50" cy="50" r="40" opacity=".2" strokeDasharray=".4 1.8" />
        <circle cx="50" cy="50" r="27" opacity=".1" />
        <path d="M50 1v4M50 95v4M1 50h4M95 50h4" opacity=".35" strokeWidth=".18" />
      </g>
    </svg>
  );
}

export function Footer({ standalone = false }: { standalone?: boolean }) {
  // Rendered as 2026 on the server; the visitor's current year replaces it after hydration.
  const year = useSyncExternalStore(
    () => () => {},
    () => new Date().getFullYear(),
    () => 2026,
  );
  return (
    <>
    <footer className="site-foot" style={standalone ? { margin: "80px 3% 0", paddingBottom: 36 } : undefined}>
      <p style={{ margin: 0 }}>© {year} Shravani BS Bollapragada</p>
      <nav aria-label="Footer">
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/accessibility">Accessibility</Link>
        <a href={standalone ? "#main" : "#top"}>
          Back to top <span aria-hidden="true">&nbsp;↑</span>
        </a>
      </nav>
    </footer>
    {standalone ? null : (
      <p className="wordmark disp" aria-hidden="true">
        Shravani
      </p>
    )}
    </>
  );
}

export function Contact() {
  const [status, setStatus] = useState("");
  const [manual, setManual] = useState(false);

  const copy = async () => {
    try {
      if (!navigator.clipboard) throw new Error("no clipboard");
      await navigator.clipboard.writeText(links.email);
      setManual(false);
      setStatus("Email address copied to the clipboard.");
    } catch {
      setManual(true);
      setStatus("Couldn’t copy automatically. Select the address above to copy it.");
    }
  };

  return (
    <section id="contact" tabIndex={-1} className="contact" aria-labelledby="contact-title">
      <ContactField />
      <p className="kicker" style={{ margin: 0 }}>
        {"// Contact."}
      </p>
      <h2 id="contact-title" className="contact-h disp" style={{ fontWeight: 500 }}>
        <span className="line">LET&rsquo;S TALK</span>
        <span className="line">RESEARCH.</span>
      </h2>

      <div className="contact-grid">
        <div>
          <p>
            I&rsquo;m looking for research positions and summer programs in cancer biology and the translational life
            sciences. Email is the fastest way to reach me.
          </p>
          <p>Cancer biology / Transcriptomics / Molecular imaging</p>
        </div>
        <div className="contact-right">
          <a className="contact-email disp" href={`mailto:${links.email}`} style={manual ? { userSelect: "all" } : undefined}>
            {links.email}
          </a>
          <div className="contact-actions">
            <button type="button" className="pill" onClick={copy}>
              Copy email
            </button>
            <a className="pill pill-ghost" href={links.orcid} target="_blank" rel="noreferrer">
              ORCID <span aria-hidden="true">↗</span>
            </a>
            <a className="pill pill-ghost" href={links.github} target="_blank" rel="noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <a className="pill pill-ghost" href={links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <Link className="pill pill-ghost" href="/cv">
              CV <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <p className="contact-status" aria-live="polite">
            {status}
          </p>
        </div>
      </div>

      <Footer />
    </section>
  );
}
