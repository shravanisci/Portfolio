"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { onScrollFrame } from "../motion";
import { goTo, reducedMotion } from "./split";

const MONO = "Bio";
const NAME = "Shravani";
const FIRST_DELAY = 0.38;
const STEP = 0.1;
const LETTER_MS = 900;
const LAST_END_MS = (FIRST_DELAY + (MONO.length + NAME.length - 1) * STEP) * 1000 + LETTER_MS;

function Letters({ text, start }: { text: string; start: number }) {
  return Array.from(text).map((c, i) => (
    <span key={i} className="ch" style={{ "--d": `${(FIRST_DELAY + (start + i) * STEP).toFixed(2)}s` } as CSSProperties}>
      {c}
    </span>
  ));
}

// Fluorescent spots in the field of view: position, radius, colour, opacity, and a slow drift path.
const SPOTS = [
  { x: 38, y: 36, r: 4.2, c: "var(--accent-2)", o: 0.34, dx: 1.6, dy: -1.1, t: 23 },
  { x: 61, y: 30, r: 2.6, c: "var(--accent)", o: 0.3, dx: -1.2, dy: 1.4, t: 19 },
  { x: 70, y: 58, r: 5.2, c: "var(--accent-2)", o: 0.26, dx: -1.4, dy: -1.6, t: 29 },
  { x: 45, y: 66, r: 3.1, c: "var(--accent)", o: 0.28, dx: 1.3, dy: 1.2, t: 21 },
  { x: 27, y: 57, r: 2.2, c: "var(--accent-2)", o: 0.3, dx: 1.1, dy: -1.5, t: 17 },
  { x: 56, y: 47, r: 1.6, c: "var(--fg)", o: 0.22, dx: -0.9, dy: 1.1, t: 15 },
];

/**
 * Decorative backdrop in place of a portrait: a microscope field of view with a few fluorescent
 * spots, a nod to her molecular-imaging work. The spots drift slowly, and every so often a sharp
 * copy fades in and out, as if someone were adjusting the focus. Nothing follows the pointer. All of
 * it stops under reduced motion and while the hero is off screen.
 */
const drift = (s: (typeof SPOTS)[number]) =>
  ({ "--dx": `${s.dx}px`, "--dy": `${s.dy}px`, animationDuration: `${s.t}s` }) as CSSProperties;

function FieldOfView() {
  return (
    <svg className="hero-field" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <defs>
        <filter id="hero-spot-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>
      <g filter="url(#hero-spot-blur)">
        {SPOTS.map((s, i) => (
          <circle key={i} className="spot" cx={s.x} cy={s.y} r={s.r} fill={s.c} opacity={s.o} style={drift(s)} />
        ))}
      </g>
      <g className="spots-sharp">
        {SPOTS.map((s, i) => (
          <circle key={i} className="spot" cx={s.x} cy={s.y} r={s.r * 0.55} fill={s.c} opacity={Math.min(s.o * 1.9, 0.6)} style={drift(s)} />
        ))}
      </g>
      <g fill="none" stroke="currentColor" strokeWidth=".14">
        <circle cx="50" cy="50" r="48.5" opacity=".26" />
        <circle cx="50" cy="50" r="38" opacity=".12" strokeDasharray=".5 1.4" />
        <circle cx="50" cy="50" r="24" opacity=".09" />
        <path d="M50 1.5v5M50 93.5v5M1.5 50h5M93.5 50h5" opacity=".4" strokeWidth=".2" />
        <path d="M47 50h6M50 47v6" opacity=".25" />
        <path d="M66 80h14M66 79v2M80 79v2" opacity=".35" strokeWidth=".2" />
      </g>
    </svg>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Entrance: wait for the fonts (never more than 1.8s), then play the letters once. Replays when the
  // hero has fully left the viewport and then comes back by at least 20% of the smaller of its height
  // or the viewport.
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const site = hero.closest(".site");
    let endTimer = 0;
    let cancelled = false;

    const play = () => {
      if (reducedMotion()) return;
      hero.classList.remove("is-playing");
      void hero.offsetWidth; // restart the CSS animations
      hero.classList.add("is-playing");
      window.clearTimeout(endTimer);
      endTimer = window.setTimeout(() => hero.classList.remove("is-playing"), LAST_END_MS + 60);
    };

    const ready = () => {
      if (cancelled) return;
      hero.classList.add("is-ready");
      site?.classList.add("is-ready");
      if (!reducedMotion()) {
        hero.classList.add("is-intro");
        site?.classList.add("is-intro");
        play();
      }
    };
    const fonts = document.fonts?.ready ?? Promise.resolve();
    Promise.race([fonts, new Promise((r) => setTimeout(r, 1800))]).then(ready, ready);

    let left = false;
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        ([e]) => {
          hero.classList.toggle("is-paused", !e.isIntersecting);
          if (!e.isIntersecting) {
            left = true;
            return;
          }
          const need = Math.min(e.boundingClientRect.height, window.innerHeight) * 0.2;
          if (left && e.intersectionRect.height >= need) {
            left = false;
            play();
          }
        },
        { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
      );
      io.observe(hero);
    }
    // If motion is switched back on while the hero is in view, the finite sequence may play again.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => {
      if (!mq.matches && hero.getBoundingClientRect().bottom > 0) play();
    };
    mq.addEventListener("change", onMq);
    return () => {
      cancelled = true;
      window.clearTimeout(endTimer);
      io?.disconnect();
      mq.removeEventListener("change", onMq);
    };
  }, []);

  // Scroll parallax on the backdrop only: progress = clamp(-top / height, 0, 1).
  useEffect(() => {
    const hero = heroRef.current;
    const bg = bgRef.current;
    if (!hero || !bg) return;
    const update = () => {
      if (reducedMotion()) {
        bg.style.transform = "";
        return;
      }
      const r = hero.getBoundingClientRect();
      const p = Math.min(Math.max(-r.top / r.height, 0), 1);
      bg.style.transform = p ? `translateY(${(p * -7).toFixed(3)}%) scale(${(1 + p * 0.2).toFixed(4)})` : "";
    };
    update();
    return onScrollFrame(update);
  }, []);

  return (
    <section id="top" ref={heroRef} className="hero" aria-labelledby="hero-name">
      <div ref={bgRef} className="hero-bg" aria-hidden="true">
        <div className="hero-glow" />
        <FieldOfView />
        <div className="hero-grain" />
      </div>
      <div className="hero-shade" aria-hidden="true" />

      <div className="hero-title">
        <h1 id="hero-name" className="hero-h1 disp">
          <span className="sr-only">Shravani BS Bollapragada</span>
          <span className="mono" aria-hidden="true">
            <Letters text={MONO} start={0} />
          </span>
          <span className="name" aria-hidden="true">
            <Letters text={NAME} start={MONO.length} />
            <span className="sup">[BSc]</span>
          </span>
        </h1>
        <p className="hero-sub">
          <span>Shravani BS Bollapragada — Undergraduate researcher, life sciences</span>
          <span>[ Research // Selected work ]</span>
        </p>
        <a
          href="#about"
          className="scroll-link"
          aria-label="Scroll down to Research Approach"
          onClick={(e) => {
            if (goTo("about")) e.preventDefault();
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 4v15M5 12l7 7 7-7" />
          </svg>
        </a>
      </div>

      <p className="hero-vlabel" aria-hidden="true">
        FIELD OF VIEW / STRUCTURE &amp; EXPRESSION — 001
      </p>

      <ul className="hero-notes">
        <li>• Cancer biology, transcriptomics, molecular imaging.</li>
        <li>• Right now: writing my undergraduate dissertation.</li>
      </ul>
      <a className="pill hero-cta" href="#work">
        Explore research <span aria-hidden="true">↘</span>
      </a>
    </section>
  );
}
