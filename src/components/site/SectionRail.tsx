"use client";

import { useEffect, useRef, useState } from "react";
import { goTo } from "./split";

const SECTIONS = [
  { id: "about", label: "Approach" },
  { id: "featured", label: "Featured" },
  { id: "work", label: "Research" },
  { id: "methods", label: "Methods" },
  { id: "record", label: "Record" },
  { id: "contact", label: "Contact" },
];

/**
 * A slim index fixed to the right edge on wide screens: one tick per section, the current one
 * lit, with its name beside it. Hidden while the hero fills the screen. Clicking a tick scrolls there.
 */
export function SectionRail() {
  const [active, setActive] = useState<string | null>(null);
  const [shown, setShown] = useState(false);
  const ratios = useRef(new Map<string, number>());

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.current.set(e.target.id, e.intersectionRect.height));
        // The section taking up the most of the screen is the current one.
        let best: string | null = null;
        let max = 0;
        ratios.current.forEach((h, id) => {
          if (h > max) {
            max = h;
            best = id;
          }
        });
        setActive(max > 0 ? best : null);
      },
      { threshold: Array.from({ length: 11 }, (_, i) => i / 10) },
    );
    els.forEach((el) => io.observe(el));

    // Shown once the hero is mostly scrolled away (the hero is always on the homepage).
    const heroIo = new IntersectionObserver(([e]) => setShown(e.intersectionRatio < 0.35), { threshold: [0, 0.35, 1] });
    const hero = document.getElementById("top");
    if (hero) heroIo.observe(hero);
    return () => {
      io.disconnect();
      heroIo.disconnect();
    };
  }, []);

  return (
    <nav className={`rail${shown ? " is-shown" : ""}`} aria-label="Sections">
      <ul>
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              className={active === s.id ? "is-active" : undefined}
              onClick={(e) => {
                if (goTo(s.id)) e.preventDefault();
              }}
            >
              <span className="rail-label">{s.label}</span>
              <span className="rail-tick" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
