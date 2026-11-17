"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, ViewTransition, type CSSProperties } from "react";
import { flagships, statusLabel } from "@/content/profile";
import { caseHref } from "./links";
import { fwd, headName, morphOn } from "./transitions";

/** Old shared links used #work-<slug> to open a pop-up; send them to the study's own page. */
function LegacyHashRedirect() {
  const router = useRouter();
  useEffect(() => {
    const m = location.hash.match(/^#work-(.+)$/);
    if (m && flagships.some((p) => p.slug === m[1])) router.replace(caseHref(m[1]));
  }, [router]);
  return null;
}

export function Research() {
  const years = flagships.map((p) => Number(p.year));
  const span = `${Math.min(...years)}–${Math.max(...years)}`;
  return (
    <section id="work" tabIndex={-1} className="research" aria-labelledby="work-title">
      <div className="sec-head">
        <h2 id="work-title" className="kicker" style={{ margin: 0, fontWeight: 400 }}>
          {"// Selected Research"}
        </h2>
        <p className="kicker-sm" style={{ margin: 0 }}>
          {flagships.length} projects / {span}
        </p>
      </div>

      <div className="r-cols" aria-hidden="true">
        <span>#</span>
        <span>Project</span>
        <span>Field</span>
        <span>Year</span>
        <span />
      </div>
      <ul className="r-table rows" data-reveal="0.15">
        {flagships.map((p, i) => {
          const preview = p.figures?.find((f) => !f.video) ?? p.figures?.[0];
          return (
            <li key={p.slug} style={{ "--i": i } as CSSProperties}>
              <ViewTransition name={headName(p.slug)} share={morphOn("via-row")} default="none">
              <Link href={caseHref(p.slug)} className="r-row" prefetch transitionTypes={fwd("via-row")}>
                <span className="r-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="r-name disp">
                  {p.short}
                  <span className="r-status">{statusLabel[p.status]}</span>
                </span>
                <span className="r-field">{p.field}</span>
                <span className="r-year">{p.year}</span>
                <span className="r-arrow" aria-hidden="true">
                  ↗
                </span>
                {preview ? (
                  <span className={`r-preview${preview.plate === "dark" ? " is-dark" : ""}`} aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element -- small decorative thumbnail */}
                    <img src={preview.src} alt="" loading="lazy" decoding="async" />
                  </span>
                ) : null}
              </Link>
              </ViewTransition>
            </li>
          );
        })}
      </ul>
      <noscript>
        <ul style={{ marginTop: 24 }}>
          {flagships.map((p) => (
            <li key={p.slug} style={{ marginTop: 12 }}>
              <strong>{p.name}.</strong> {p.tagline}{" "}
              {p.links.map((l) => (
                <a key={l.href} href={l.href}>
                  {l.label}
                </a>
              ))}
            </li>
          ))}
        </ul>
      </noscript>

      <div className="r-cta">
        <p className="disp">Open to research positions &amp; summer programs</p>
        <a className="pill" href="#contact">
          Get in touch <span aria-hidden="true">↗</span>
        </a>
      </div>

      <LegacyHashRedirect />
    </section>
  );
}
