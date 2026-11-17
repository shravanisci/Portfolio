"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotionSafe } from "../motion";
import { reducedMotion } from "./split";

const CLIP = "/figures/egfr/mol9-loop";

/**
 * Her own molecular-dynamics render of MOL_9 bound to the EGFR triple mutant (6WXN), visualised in
 * PyMOL, with the black background keyed out so the protein sits on the page colour. The clip plays
 * forwards then backwards, so the loop never jumps.
 *
 * Transparency rides on VP9's alpha channel, which Safari decodes without honouring: there the video
 * would be a black box, so one frame is sampled on a canvas and, if its corner is opaque, the
 * transparent still is shown instead. Reduced motion shows that still too, and the clip plays only
 * while it is on screen.
 */
export function MoleculeClip({ className }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotionSafe();
  const [noAlpha, setNoAlpha] = useState(false);
  const still = reduced || noAlpha;

  useEffect(() => {
    const v = ref.current;
    if (!v || still) return;

    // One frame onto a 2×2 canvas: a corner pixel that is fully opaque means alpha was dropped.
    const probe = () => {
      try {
        const c = document.createElement("canvas");
        c.width = c.height = 2;
        const ctx = c.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, 2, 2);
        ctx.drawImage(v, 0, 0, 2, 2);
        if (ctx.getImageData(0, 0, 1, 1).data[3] > 250) setNoAlpha(true);
      } catch {
        // A readback failure says nothing about alpha; leave the clip playing.
      }
    };
    v.addEventListener("loadeddata", probe, { once: true });

    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting && !reducedMotion()) v.play().catch(() => {});
          else v.pause();
        },
        { threshold: 0.2 },
      );
      io.observe(v);
    }
    const onVis = () => {
      if (document.hidden) v.pause();
      else if (!reducedMotion()) v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      v.removeEventListener("loadeddata", probe);
    };
  }, [still]);

  const label =
    "Molecular dynamics simulation of MOL_9 (green) bound in the pocket of the EGFR triple mutant 6WXN (purple), turning slowly.";
  const cls = `molclip${className ? ` ${className}` : ""}`;

  if (still) {
    // eslint-disable-next-line @next/next/no-img-element -- transparent still, sized by CSS
    return <img className={cls} src={`${CLIP}-poster.png`} alt={label} width={300} height={300} />;
  }

  return (
    <video ref={ref} className={cls} muted loop playsInline preload="none" poster={`${CLIP}-poster.png`} aria-label={label} role="img">
      <source src={`${CLIP}.webm`} type="video/webm" />
    </video>
  );
}
