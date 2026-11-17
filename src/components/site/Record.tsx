"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { onScrollFrame } from "../motion";
import { articles, certifications, education, honors, involvement, milestones, presentations, type Milestone } from "@/content/profile";
import { useDisclosure } from "./Methods";
import { ArticleGlyph } from "./ArticleGlyph";
import { ScaleBar } from "./ScaleBar";
import { reducedMotion, splitLetters } from "./split";

const WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
const word = (n: number) => WORDS[n] ?? String(n);
const kindLabel = { internship: "Internship", fellowship: "Fellowship" } as const;
const pad = (n: number) => String(n).padStart(2, "0");

/** A sub-section heading: "// Title" on the left, the count on the right, over a full-width rule. */
function Head({ id, title, count, children }: { id: string; title: string; count?: number; children?: ReactNode }) {
  return (
    <div className="rec-head">
      <h3 id={id}>{`// ${title}`}</h3>
      <div className="rec-head-side">
        {children}
        {count !== undefined ? <span className="rec-count">{pad(count)}</span> : null}
      </div>
    </div>
  );
}

/* ---------- Experience: a timeline ---------- */

function TimelineItem({ m, i }: { m: Milestone; i: number }) {
  const { button, panel } = useDisclosure();
  const [month, year] = m.when.split(" ");
  return (
    <li className="tl-item" style={{ "--i": i } as CSSProperties}>
      <div className="tl-date">
        <span className="tl-year disp">{year}</span>
        <span className="tl-month">{month}</span>
      </div>
      <span className={`tl-dot${m.kind === "fellowship" ? " is-fellow" : ""}`} aria-hidden="true" />
      <div className="tl-body">
        <p className="tl-kind">{kindLabel[m.kind]}</p>
        <h4 className="tl-title disp">{m.title}</h4>
        <p className="tl-org">{m.org}</p>
        {panel(
          "tl-panel",
          <>
            <ul className="bul">
              {m.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            {m.sources?.map((s) => (
              <a key={s.href} className="inline-link" href={s.href} style={{ display: "inline-block", marginTop: 14 }}>
                {s.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </>,
        )}
      </div>
      <div className="tl-btn">{button(m.title)}</div>
    </li>
  );
}

/* ---------- Writing: a slowly revolving row of cards ---------- */

/**
 * The articles drift sideways in a loop, the opposite way to the figure strip above. The row is drawn
 * twice so the loop is seamless; the copy is hidden from assistive tech and the tab order. It pauses
 * on hover, on keyboard focus and while off screen; under reduced motion it stands still and scrolls
 * by hand.
 */
function Writing() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => el.classList.toggle("is-off", !e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const row = (copy: boolean) => (
    <ul className="wr-row" aria-hidden={copy || undefined}>
      {articles.map((a, i) => (
        <li key={a.href}>
          <a className={`wr-card tone-${i % 3}`} href={a.href} target="_blank" rel="noreferrer" tabIndex={copy ? -1 : undefined}>
            <span className="wr-cover">
              <ArticleGlyph glyph={a.glyph} />
            </span>
            <span className="wr-num">
              {pad(i + 1)} / {pad(articles.length)}
            </span>
            <span className="wr-title disp">{a.title}</span>
            <span className="wr-foot">
              <span>{a.coauthor ?? "LinkedIn article"}</span>
              <span aria-hidden="true">Read ↗</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <section ref={ref} className="rec-block wr" aria-labelledby="rec-writing">
      <Head id="rec-writing" title="Writing" count={articles.length} />
      <div className="wr-viewport">
        <div className="wr-loop" style={{ "--n": articles.length } as CSSProperties}>
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}

/**
 * Draws the timeline's rail as the reader scrolls: the accent line grows down to a point 60% of the
 * way down the viewport, and each dot lights up once the line reaches it. Fully drawn under reduced
 * motion.
 */
function useTimelineDraw() {
  const ref = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const tl = ref.current;
    if (!tl) return;
    const dots = Array.from(tl.querySelectorAll<HTMLElement>(".tl-dot"));
    tl.classList.add("is-drawing");
    const update = () => {
      const line = reducedMotion() ? Infinity : window.innerHeight * 0.6;
      const r = tl.getBoundingClientRect();
      const p = Math.min(Math.max((line - r.top) / r.height, 0), 1);
      tl.style.setProperty("--p", p.toFixed(4));
      dots.forEach((d) => {
        const b = d.getBoundingClientRect();
        d.classList.toggle("is-lit", b.top + b.height / 2 <= line);
      });
    };
    update();
    const off = onScrollFrame(update);
    window.addEventListener("resize", update);
    return () => {
      off();
      window.removeEventListener("resize", update);
      tl.classList.remove("is-drawing");
    };
  }, []);
  return ref;
}

export function Record() {
  const tlRef = useTimelineDraw();
  const internships = milestones.filter((m) => m.kind === "internship").length;
  const fellowships = milestones.length - internships;
  const l1 = splitLetters(`${word(internships).toUpperCase()} INTERNSHIPS.`);
  const l2 = splitLetters(`${word(fellowships).toUpperCase()} FELLOWSHIP${fellowships === 1 ? "" : "S"}.`, l1.next);

  return (
    <section id="record" tabIndex={-1} className="caps rec" aria-labelledby="record-title">
      <div className="caps-top" data-reveal="0.3">
        <h2 id="record-title" className="caps-h disp split" style={{ fontWeight: 500 }}>
          <span className="line">{l1.nodes}</span>
          <span className="line">{l2.nodes}</span>
        </h2>
        <p className="kicker" style={{ margin: 0 }}>
          {"// RECORD."}
        </p>
      </div>

      {/* Experience */}
      <section className="rec-block" aria-labelledby="rec-exp">
        <Head id="rec-exp" title="Experience" count={milestones.length} />
        <ol ref={tlRef} className="tl rows" data-reveal="0.15">
          {milestones.map((m, i) => (
            <TimelineItem key={m.title + m.when} m={m} i={i} />
          ))}
        </ol>
      </section>

      {/* Honors */}
      <section className="rec-block" aria-labelledby="rec-hon">
        <Head id="rec-hon" title="Honors" count={honors.length} />
        <ul className="hon rows" data-reveal="0.15">
          {honors.map((h, i) => {
            // "1st Prize, Research Poster Competition" → big "1st Prize", smaller rest. Falls back to " for ".
            const comma = h.title.indexOf(", ");
            const forAt = h.title.indexOf(" for ");
            const lead = comma > 0 ? h.title.slice(0, comma) : forAt > 0 ? h.title.slice(0, forAt) : h.title;
            const rest = comma > 0 ? h.title.slice(comma + 2) : forAt > 0 ? h.title.slice(forAt + 1) : "";
            return (
              <li key={h.title} className={`hon-item${i === 0 ? " is-top" : ""}`} style={{ "--i": i } as CSSProperties}>
                <span className="hon-idx">
                  <svg className="hon-medal" viewBox="0 0 20 24" aria-hidden="true" focusable="false">
                    <path d="M5 1h4l3 7H8zM15 1h-4L8 8h4z" />
                    <circle cx="10" cy="15" r="7" />
                    <circle cx="10" cy="15" r="3.6" />
                  </svg>
                  {pad(i + 1)} — {h.year}
                </span>
                <p className="hon-lead disp">{lead}</p>
                {rest ? <p className="hon-rest disp">{rest}</p> : null}
                <p className="hon-org">{h.org}</p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Presentations & posters */}
      <section className="rec-block" aria-labelledby="rec-pres">
        <Head id="rec-pres" title="Presentations & posters" count={presentations.length} />
        <ul className="pst rows" data-reveal="0.15">
          {presentations.map((p, i) => (
            <li key={p.title} className={`pst-card${p.image ? " has-image" : ""}`} style={{ "--i": i } as CSSProperties}>
              {p.image ? (
                <span className="pst-img">
                  {/* eslint-disable-next-line @next/next/no-img-element -- poster photo, sized by CSS */}
                  <img src={p.image} alt={`The poster: ${p.title}`} loading="lazy" decoding="async" />
                </span>
              ) : null}
              <div className="pst-top">
                <span>{p.kind}</span>
                <span>{p.year}</span>
              </div>
              <h4 className="pst-title disp">{p.title}</h4>
              {p.summary ? <p className="pst-sum">{p.summary}</p> : null}
              <div className="pst-foot">
                {p.note ? <span className="pst-note">{p.note}</span> : null}
                <span>{p.venue}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Education, certifications, memberships */}
      <div className="rec-block edu-grid">
        <section aria-labelledby="rec-edu">
          <Head id="rec-edu" title="Education" count={education.length} />
          <ul className="edu rows" data-reveal="0.15">
            {education.map((e, i) => (
              <li key={e.degree} style={{ "--i": i } as CSSProperties}>
                <span className="edu-years">{e.years.replace(" to ", " – ")}</span>
                <h4 className="edu-degree disp">{e.degree}</h4>
                <p className="edu-school">{e.school}</p>
                <ul className="case-tags" style={{ marginTop: 14 }}>
                  {e.notes.map((n) => (
                    <li key={n} className="tag">
                      {n}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
        <div>
          <section aria-labelledby="rec-cert">
            <Head id="rec-cert" title="Courses & certifications" count={certifications.length} />
            <ul className="cred rows" data-reveal="0.15">
              {certifications.map((c, i) => (
                <li key={c.name + c.date} className="cred-card" style={{ "--i": Math.min(i, 6) } as CSSProperties}>
                  <span className="cred-top">
                    <span className="cred-issuer">{c.issuer}</span>
                    <span className="cred-when">{c.date || "—"}</span>
                  </span>
                  <span className="cred-name disp">{c.name}</span>
                  {c.note ? <span className="cred-note">{c.note}</span> : null}
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="rec-mem" style={{ marginTop: 56 }}>
            <Head id="rec-mem" title="Memberships & outreach" count={involvement.length} />
            <ul className="mini rows" data-reveal="0.15">
              {involvement.map((v, i) => (
                <li key={v.event} style={{ "--i": i } as CSSProperties}>
                  <span className="mini-when">{v.result}</span>
                  <span>
                    <span className="mini-title">{v.event}</span>
                    <span className="mini-sub">{v.project}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <Writing />
      <ScaleBar label="1 mm" />
    </section>
  );
}
