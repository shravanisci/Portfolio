"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Figure } from "@/content/profile";
import { useReducedMotionSafe } from "./motion";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * A trajectory clip in the figure slot. It loads nothing until it is the selected figure and near
 * the viewport, plays only while on screen, and can be paused. With reduced motion on it never
 * autoplays: the poster shows, with native controls to play it.
 */
function FigureVideo({ fig }: { fig: Figure }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotionSafe();
  const [playing, setPlaying] = useState(false);
  // The reader's pause sticks: scrolling away and back does not restart it.
  const userPaused = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduced) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= 0.35 && !userPaused.current) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: [0, 0.35] },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduced]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  return (
    <>
      <video
        ref={ref}
        className="block size-full object-contain"
        poster={`${fig.video}-poster.jpg`}
        muted
        loop
        playsInline
        preload="none"
        controls={reduced}
        aria-label={fig.alt}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={`${fig.video}.webm`} type="video/webm" />
        <source src={`${fig.video}.mp4`} type="video/mp4" />
      </video>
      {reduced ? null : (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause the simulation clip" : "Play the simulation clip"}
          className="press absolute right-3 bottom-3 inline-flex size-10 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white backdrop-blur-sm transition-colors hover:border-white/60 hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor" aria-hidden>
            {playing ? <path d="M4 3h3v10H4zM9 3h3v10H9z" /> : <path d="M5 3v10l8-5z" />}
          </svg>
        </button>
      )}
    </>
  );
}

/**
 * The case study's own figures, one at a time, in the artifact slot. Plots exported on white sit on
 * a white plate in both themes; trajectory stills and clips sit on black. The tabs below switch
 * between them with a crossfade.
 */
export function FigureViewer({ figures, label }: { figures: Figure[]; label: string }) {
  const [i, setI] = useState(0);
  const f = figures[i];

  return (
    <figure className="overflow-hidden rounded-lg border border-line bg-surface">
      <div
        className={`relative aspect-[4/3] max-h-[540px] w-full sm:aspect-[16/10] lg:aspect-[2/1] ${f.plate === "dark" ? "bg-black" : "bg-white"}`}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={f.video ?? f.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease }}
            className="absolute inset-0 p-3 sm:p-5"
          >
            {f.video ? (
              <FigureVideo fig={f} />
            ) : (
              <a
                href={f.src}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open full size: ${f.caption}`}
                className="relative block size-full"
              >
                <Image src={f.src} alt={f.alt} fill sizes="(min-width: 1024px) 720px, 100vw" className="object-contain" />
              </a>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="border-t border-line px-4 pt-3 pb-4 sm:px-5">
        <div role="group" aria-label={`${label} figures`} className="-mx-1 flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {figures.map((fig, n) => {
            const on = n === i;
            return (
              <button
                key={fig.video ?? fig.src}
                type="button"
                aria-pressed={on}
                onClick={() => setI(n)}
                className={`press relative min-h-9 shrink-0 rounded-md px-3 text-[0.85rem] whitespace-nowrap transition-colors ${on ? "text-bg" : "text-muted hover:text-fg"}`}
              >
                {on ? (
                  <motion.span
                    layoutId={`fig-${label}`}
                    aria-hidden
                    className="absolute inset-0 rounded-md bg-fg"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                ) : null}
                <span className="relative">{fig.label}</span>
              </button>
            );
          })}
        </div>
        <figcaption aria-live="polite" className="mt-3 text-[0.85rem] text-muted">
          {f.caption}{" "}
          <span className="text-muted/80">
            {f.video ? "The whole run, played at twice speed." : "Select the figure to open it full size."}
          </span>
        </figcaption>
      </div>
    </figure>
  );
}
