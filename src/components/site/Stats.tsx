"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { articles, education, flagships, milestones } from "@/content/profile";
import { reducedMotion } from "./split";

const gpaNote = education[0]?.notes.find((n) => /GPA/.test(n));
const gpa = gpaNote?.match(/\d+(\.\d+)?/)?.[0];

// Every number is counted from the content file, so it stays true when the content changes.
const STATS: { value: number; decimals?: number; label: string; sub: string }[] = [
  { value: milestones.filter((m) => m.kind === "fellowship").length, label: "Stanford fellowship", sub: "Molecular imaging, 2026" },
  { value: milestones.filter((m) => m.kind === "internship").length, label: "Research internships", sub: "2024 – 2026" },
  { value: flagships.length, label: "Research projects", sub: "Transcriptomics to structure" },
  { value: articles.length, label: "Science articles", sub: "Published on LinkedIn" },
  ...(gpa ? [{ value: Number(gpa), decimals: 2, label: "Cumulative GPA", sub: "B.Sc., years 1 and 2" }] : []),
];

const fmt = (v: number, d = 0) => v.toFixed(d);

/**
 * A row of big numbers on a mint band. Each counts up from zero the first time the row comes into
 * view (over ~1.4s, easing out); under reduced motion, or without JS, the final numbers simply show.
 */
export function Stats() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || reducedMotion()) return;
    const nums = Array.from(el.querySelectorAll<HTMLElement>("[data-to]"));
    nums.forEach((n) => (n.textContent = fmt(0, Number(n.dataset.dec))));
    let frame = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          let done = true;
          nums.forEach((n, i) => {
            // Each number starts 90ms after the one before it and eases out over 1.4s.
            const q = Math.min(Math.max((t - t0 - i * 90) / 1400, 0), 1);
            if (q < 1) done = false;
            n.textContent = fmt(Number(n.dataset.to) * (1 - Math.pow(1 - q, 4)), Number(n.dataset.dec));
          });
          if (!done) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={ref} className="stats band" aria-label="At a glance" data-reveal="0.3">
      <p className="kicker-sm stats-kicker">{"// At a glance"}</p>
      <ul className="stats-row rows">
        {STATS.map((s, i) => (
          <li key={s.label} style={{ "--i": i } as CSSProperties}>
            <span className="sr-only">{fmt(s.value, s.decimals)}</span>
            <span className="stats-num disp" aria-hidden="true" data-to={s.value} data-dec={s.decimals ?? 0}>
              {fmt(s.value, s.decimals)}
            </span>
            <span className="stats-label">{s.label}</span>
            <span className="stats-sub">{s.sub}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
