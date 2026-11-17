import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { flagships, statusLabel, type Project } from "@/content/profile";
import { FigureViewer } from "../FigureViewer";
import { MoleculeClip } from "./MoleculeClip";
import { ReadingProgress } from "./ReadingProgress";
import { Reveal } from "./Reveal";
import { ScaleBar } from "./ScaleBar";
import { SubPage } from "./SubPage";
import { caseHref } from "./links";
import { back, fwd, headName, morphOn, SLIDE, visualName } from "./transitions";

const stateLabel = { done: "Done", works: "Works", "not yet": "Not yet", next: "Next" } as const;

/** The big visual under the title: the 3D protein for the EGFR study, otherwise the first still figure. */
function Lead({ p }: { p: Project }) {
  if (p.slug === "egfr-nsclc") {
    return (
      <ViewTransition name={visualName(p.slug)} share={morphOn("via-featured")} default="none">
      <figure className="cp-lead cp-lead-mol">
        <span className="f-corners" aria-hidden="true" />
        <MoleculeClip />
        <figcaption>
          <span>MOL_9 (green) bound in the pocket of the EGFR triple mutant · 3 ns molecular dynamics</span>
          <span>PyMOL · PDB 6WXN</span>
        </figcaption>
      </figure>
      </ViewTransition>
    );
  }
  const f = p.figures?.find((x) => !x.video);
  if (!f) return null;
  return (
    <figure className={`cp-lead cp-lead-fig${f.plate === "dark" ? " is-dark" : ""}`}>
      <ViewTransition name={visualName(p.slug)} share={morphOn("via-figure")} default="none">
        <Image src={f.src} alt={f.alt} width={f.width} height={f.height} sizes="(max-width: 1200px) 100vw, 1200px" preload />
      </ViewTransition>
      <figcaption>
        <span>{f.caption}</span>
      </figcaption>
    </figure>
  );
}

/**
 * A full page per study, laid out like a short paper: title and abstract, a lead visual, the
 * question and approach side by side, the pipeline, key numbers, every figure, findings, where it
 * stands, methods, and links to the previous and next study.
 */
export function CaseArticle({ p }: { p: Project }) {
  const i = flagships.findIndex((x) => x.slug === p.slug);
  const prev = flagships[(i - 1 + flagships.length) % flagships.length];
  const next = flagships[(i + 1) % flagships.length];
  const n = (k: number) => String(k + 1).padStart(2, "0");

  return (
    <ViewTransition key={p.slug} enter={SLIDE} exit={SLIDE} default="none">
      <article className="cp-main" aria-labelledby="cp-title">
        <ViewTransition name={headName(p.slug)} share={morphOn("via-row")} default="none">
        <header className="cp-head">
          <p className="kicker" style={{ margin: 0 }}>
            {`// Research ${n(i)} / ${String(flagships.length).padStart(2, "0")}`}
          </p>
          <h1 id="cp-title" className="cp-title disp">
            {p.name}
          </h1>
          <p className="cp-abstract">{p.tagline}</p>
          <dl className="cp-meta">
            <div>
              <dt>Status</dt>
              <dd>
                <span className={`cp-status is-${p.status}`}>{statusLabel[p.status]}</span>
              </dd>
            </div>
            <div>
              <dt>Field</dt>
              <dd>{p.field}</dd>
            </div>
            <div>
              <dt>Context</dt>
              <dd>{p.context}</dd>
            </div>
            <div>
              <dt>Source</dt>
              <dd>
                {p.links.map((l, k) => (
                  <span key={l.href}>
                    {k ? " · " : null}
                    <a href={l.href} target="_blank" rel="noreferrer">
                      {l.label} <span aria-hidden="true">↗</span>
                    </a>
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </header>
        </ViewTransition>

        <Lead p={p} />

        <div className="cp-qa">
          <section aria-labelledby="cp-q">
            <h2 id="cp-q" className="cp-h">
              Question
            </h2>
            <p>{p.problem}</p>
          </section>
          <section aria-labelledby="cp-a">
            <h2 id="cp-a" className="cp-h">
              Approach
            </h2>
            <p>{p.approach}</p>
          </section>
        </div>

        <section className="cp-sec" aria-labelledby="cp-p">
          <h2 id="cp-p" className="cp-h">
            Pipeline
          </h2>
          <ol className="cp-pipe">
            {p.pipeline.map((s, k) => (
              <li key={s.name}>
                <span className="cp-pipe-n">{n(k)}</span>
                <span className="cp-pipe-name disp">{s.name}</span>
                <span className="cp-pipe-detail">{s.detail}</span>
              </li>
            ))}
          </ol>
        </section>

        {p.facts?.length ? (
          <section className="cp-facts band" aria-labelledby="cp-f">
            <h2 id="cp-f" className="cp-h">
              Key figures
            </h2>
            <dl>
              {p.facts.map((f) => (
                <div key={f.label}>
                  <dd className="disp">{f.value}</dd>
                  <dt>{f.label}</dt>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {p.figures?.length ? (
          <section className="cp-sec" aria-labelledby="cp-figs">
            <h2 id="cp-figs" className="cp-h">
              Figures
            </h2>
            <div className="cp-figs">
              <FigureViewer figures={p.figures} label={p.short} />
            </div>
          </section>
        ) : null}

        {p.tokens?.map((t) => (
          <section key={t.label} className="cp-sec" aria-label={t.label}>
            <h2 className="cp-h">{t.label}</h2>
            <ul className="case-tags">
              {t.items.map((x) => (
                <li key={x} className="tag">
                  {x}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="cp-sec cp-findings" aria-labelledby="cp-o">
          <h2 id="cp-o" className="cp-h">
            Findings
          </h2>
          <p>{p.outcome}</p>
        </section>

        {p.progress?.length ? (
          <section className="cp-sec" aria-labelledby="cp-s">
            <h2 id="cp-s" className="cp-h">
              Where it stands
            </h2>
            <ol className="case-steps">
              {p.progress.map((s) => (
                <li key={s.step} style={{ gridTemplateColumns: "80px minmax(0,1fr)" }}>
                  <span className="n" style={{ color: s.state === "done" ? "var(--ok)" : "var(--wip)" }}>
                    {stateLabel[s.state]}
                  </span>
                  <span>{s.step}</span>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        <section className="cp-sec" aria-labelledby="cp-m">
          <h2 id="cp-m" className="cp-h">
            Methods &amp; tools
          </h2>
          <ul className="case-tags">
            {p.stack.map((x) => (
              <li key={x} className="tag">
                {x}
              </li>
            ))}
          </ul>
        </section>

        <ScaleBar label={p.slug === "egfr-nsclc" ? "5 nm" : "10 µm"} />

        <nav className="cp-pager" aria-label="More research">
          <Link href={caseHref(prev.slug)} className="cp-pager-link" prefetch transitionTypes={back}>
            <span className="kicker-sm">← Previous</span>
            <span className="disp">{prev.short}</span>
          </Link>
          <Link href={caseHref(next.slug)} className="cp-pager-link is-next" prefetch transitionTypes={fwd()}>
            <span className="kicker-sm">Next →</span>
            <span className="disp">{next.short}</span>
          </Link>
        </nav>
      </article>
      {/* Keyed so it re-scans when moving between studies without a full reload. */}
      <Reveal key={p.slug} />
    </ViewTransition>
  );
}

/** The frame every study page shares; it doesn't depend on which study is open. */
export function CaseFrame({ children }: { children: React.ReactNode }) {
  return (
    <SubPage
      className="cp"
      nav={
        <>
          <Link href="/#work" transitionTypes={back}>
            All research
          </Link>
          <Link href="/cv" transitionTypes={fwd()}>
            CV
          </Link>
        </>
      }
    >
      <ReadingProgress />
      {children}
    </SubPage>
  );
}
