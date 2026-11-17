import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "./Contact";
import { ThemeButton } from "./TopNav";
import { back } from "./transitions";

/** Top bar for pages other than the homepage: a way home, a few links, and the theme switch. */
export function SubBar({ children }: { children?: ReactNode }) {
  return (
    <header className="legal-bar">
      <Link href="/" className="legal-home" transitionTypes={back}>
        <span aria-hidden="true">←</span> Shravani BS Bollapragada
      </Link>
      <nav aria-label="Page" className="legal-nav">
        {children}
        <ThemeButton />
      </nav>
    </header>
  );
}

/** Frame for a standalone page: top bar, main, footer. */
export function SubPage({ nav, children, className }: { nav?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`legal${className ? ` ${className}` : ""}`}>
      <SubBar>{nav}</SubBar>
      <main id="main">{children}</main>
      <Footer standalone />
    </div>
  );
}
