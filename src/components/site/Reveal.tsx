"use client";

import { useEffect } from "react";

/**
 * Reveals every [data-reveal] element once, when the given fraction of it is visible
 * (data-reveal="0.2"). Content is visible by default; it is only held back once the layout script
 * has set html[data-js], and if IntersectionObserver is missing everything is revealed at once.
 */
export function Reveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const observers = els.map((el) => {
      const ratio = Math.min(Math.max(parseFloat(el.dataset.reveal || "0.15") || 0.15, 0), 1);
      const io = new IntersectionObserver(
        ([e]) => {
          // Tall sections can never be 20% visible on a short screen, so a third of the viewport also counts.
          const enough = e.intersectionRatio >= ratio || e.intersectionRect.height >= window.innerHeight * 0.33;
          if (e.isIntersecting && enough) {
            el.classList.add("is-in");
            io.disconnect();
          }
        },
        { threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.22, 0.3, 0.5] },
      );
      io.observe(el);
      return io;
    });
    return () => observers.forEach((io) => io.disconnect());
  }, []);
  return null;
}
