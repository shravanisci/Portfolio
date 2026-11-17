"use client";

import { useEffect, useRef } from "react";
import { onScrollFrame } from "../motion";

/** A thin accent line along the top of the window that fills as the reader scrolls down the page. */
export function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0})`;
    };
    update();
    const off = onScrollFrame(update);
    window.addEventListener("resize", update);
    return () => {
      off();
      window.removeEventListener("resize", update);
    };
  }, []);
  return <div ref={ref} className="read-progress" aria-hidden="true" />;
}
