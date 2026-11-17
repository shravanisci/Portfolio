"use client";

import { useEffect, useRef, ViewTransition, type CSSProperties, type ReactNode } from "react";
import { flagships } from "@/content/profile";
import Image from "next/image";
import Link from "next/link";
import { caseHref } from "./links";
import { fwd, morphOn, visualName } from "./transitions";

const isLead = (slug: string, src: string) =>
  slug !== "egfr-nsclc" && flagships.find((p) => p.slug === slug)?.figures?.find((f) => !f.video)?.src === src;

// Every still figure from every project, interleaved so neighbouring plates come from different projects.
const perProject = flagships.map((p) => (p.figures ?? []).filter((f) => !f.video).map((f) => ({ f, p })));
const FIGS = Array.from({ length: Math.max(...perProject.map((l) => l.length)) }, (_, i) =>
  perProject.map((l) => l[i]).filter(Boolean),
).flat();

/**
 * Her plots drifting slowly sideways, like slides on a stage. The row is drawn twice so the loop is
 * seamless; the second copy is hidden from assistive tech and the tab order. It pauses on hover, on
 * keyboard focus and while off screen. Under reduced motion it stands still and scrolls by hand.
 * Each plate opens its project's case study.
 */
function wrapLead(slug: string | null, node: ReactNode) {
  if (!slug) return node;
  return (
    <ViewTransition name={visualName(slug)} share={morphOn("via-figure")} default="none">
      {node}
    </ViewTransition>
  );
}

export function FigureStrip() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => el.classList.toggle("is-off", !e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!FIGS.length) return null;

  const row = (copy: boolean) => (
    <ul className="fs-row" aria-hidden={copy || undefined}>
      {FIGS.map(({ f, p }) => (
        <li key={f.src} style={{ "--ar": f.width / f.height } as CSSProperties}>
          <Link
            href={caseHref(p.slug)}
            className={`fs-plate${f.plate === "dark" ? " is-dark" : ""}`}
            tabIndex={copy ? -1 : undefined}
            prefetch={!copy}
            transitionTypes={fwd("via-figure")}
          >
            {wrapLead(
              !copy && isLead(p.slug, f.src) ? p.slug : null,
              <Image src={f.src} alt={copy ? "" : f.alt} width={f.width} height={f.height} sizes="(max-width: 700px) 320px, 460px" />,
            )}
            <span className="fs-cap">
              <span>{f.label}</span>
              <span>{p.short}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <section ref={ref} className="fstrip" aria-label="Figures from her research">
      <div className="fs-head">
        <p className="kicker-sm">{"// From the notebooks"}</p>
        <p className="kicker-sm">{FIGS.length} figures · select one to open its study</p>
      </div>
      <div className="fs-viewport">
        <div className="fs-track" style={{ "--n": FIGS.length } as CSSProperties}>
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
