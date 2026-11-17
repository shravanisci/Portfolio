"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { MotionConfig } from "motion/react";

/**
 * Reduced motion, page-wide. Motion skips transform and layout animation for anyone who asks
 * for less motion; opacity fades still run, so nothing pops in abruptly.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/**
 * Hydration-safe media query. The server can't know the answer, so the first client render
 * matches the server value and React re-renders with the real one straight after hydration,
 * instead of throwing a hydration mismatch.
 */
export function useMediaQuery(query: string, serverValue: boolean) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

/** Hydration-safe version of Motion's useReducedMotion. */
export function useReducedMotionSafe() {
  return useMediaQuery("(prefers-reduced-motion: reduce)", false);
}

/**
 * Listen to scroll, but run the handler at most once per frame. Scroll events can fire several
 * times a frame (high-rate mice and trackpads); measuring layout on each one is wasted work.
 * The handler runs in the frame's animation callback, before paint, so nothing visibly lags.
 * Returns the cleanup.
 */
export function onScrollFrame(fn: () => void) {
  let id = 0;
  const onScroll = () => {
    if (id) return;
    id = requestAnimationFrame(() => {
      id = 0;
      fn();
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => {
    window.removeEventListener("scroll", onScroll);
    cancelAnimationFrame(id);
  };
}
