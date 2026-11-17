import type { Metadata } from "next";
import Link from "next/link";
import { SubPage } from "@/components/site/SubPage";
import { caseHref } from "@/components/site/links";
import { flagships } from "@/content/profile";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

/** An empty microscope field: the same ring as the hero, with nothing in it. */
function EmptyField() {
  return (
    <svg className="nf-field" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth=".3">
        <circle cx="50" cy="50" r="48.5" opacity=".35" />
        <circle cx="50" cy="50" r="38" opacity=".18" strokeDasharray=".6 1.6" />
        <circle cx="50" cy="50" r="24" opacity=".12" />
        <path d="M50 1.5v5M50 93.5v5M1.5 50h5M93.5 50h5" opacity=".5" strokeWidth=".4" />
        <path d="M46 50h8M50 46v8" opacity=".4" />
      </g>
      <text x="50" y="57" textAnchor="middle" className="nf-code">
        404
      </text>
    </svg>
  );
}

export default function NotFound() {
  return (
    <SubPage
      nav={
        <>
          <Link href="/#work">Research</Link>
          <Link href="/cv">CV</Link>
        </>
      }
    >
      <div className="nf">
        <EmptyField />
        <div className="nf-text">
          <p className="kicker" style={{ margin: 0 }}>
            {"// Error 404"}
          </p>
          <h1 className="nf-title disp">Nothing in this field of view.</h1>
          <p className="nf-lead">The page you were looking for isn&rsquo;t here. It may have moved, or the link may have a typo.</p>
          <div className="nf-actions">
            <Link className="pill" href="/">
              Back to the homepage <span aria-hidden="true">↗</span>
            </Link>
            <Link className="pill pill-ghost" href="/cv">
              Read the CV
            </Link>
          </div>
          <h2 className="kicker-sm nf-sub">Or open a study</h2>
          <ul className="nf-list">
            {flagships.map((p) => (
              <li key={p.slug}>
                <Link href={caseHref(p.slug)}>
                  <span className="disp">{p.short}</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SubPage>
  );
}
