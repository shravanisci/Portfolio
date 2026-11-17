import type { CSSProperties, ReactNode } from "react";

/**
 * Splits text into letters (each with an index, --i, for staggered reveals) while keeping each word
 * on one line. Screen readers get the plain text once; the letters are hidden from them.
 * Returns the nodes and the next index, so several lines can share one stagger sequence.
 */
export function splitLetters(text: string, start = 0): { nodes: ReactNode; next: number } {
  let i = start;
  const words = text.split(" ");
  const nodes = (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, wi) => (
          <span key={wi}>
            <span className="w">
              {Array.from(w).map((c, ci) => (
                <span key={ci} className="ch" style={{ "--i": i++ } as CSSProperties}>
                  {c}
                </span>
              ))}
            </span>
            {wi < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </>
  );
  return { nodes, next: i };
}

export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Smooth-scrolls to an in-page section and moves keyboard focus there (instant under reduced motion). */
export function goTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
  el.focus({ preventScroll: true });
  history.pushState(null, "", `#${id}`);
  return true;
}
