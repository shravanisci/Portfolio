import type { ReactNode } from "react";
import type { Glyph } from "@/content/profile";

/**
 * Line-drawn cover symbols for the article cards, one per topic. Drawn on a 120×80 box in
 * currentColor; `.g-fill` shapes take the card's soft fill colour. Decorative only.
 */
// Rounded so the server and the browser produce the same path text (Math.sin can differ in the last digit).
const r2 = (n: number) => Math.round(n * 100) / 100;
const helix = Array.from({ length: 9 }, (_, i) => {
  const x = r2(22 + i * 9.5);
  const y = r2(40 + Math.sin(i * 0.9) * 18);
  const y2 = r2(40 - Math.sin(i * 0.9) * 18);
  return { x, y, y2 };
});

const GLYPHS: Record<Glyph, ReactNode> = {
  microscope: (
    <>
      <circle cx="60" cy="40" r="30" />
      <circle cx="60" cy="40" r="19" strokeDasharray="1.5 3" opacity=".6" />
      <path d="M60 6v6M60 68v6M26 40h6M88 40h6" />
      <circle className="g-fill" cx="51" cy="34" r="5" />
      <circle className="g-fill" cx="69" cy="47" r="3.5" />
      <circle className="g-fill" cx="64" cy="31" r="2" />
      <path d="M98 66h14M98 64v4M112 64v4" opacity=".7" />
    </>
  ),
  senescence: (
    <>
      <ellipse cx="60" cy="40" rx="34" ry="24" />
      <circle cx="60" cy="40" r="9" />
      {[
        [38, 30],
        [44, 54],
        [78, 28],
        [83, 48],
        [70, 58],
        [36, 44],
      ].map(([x, y], i) => (
        <circle key={i} className="g-fill" cx={x} cy={y} r={2 + (i % 3)} />
      ))}
    </>
  ),
  tumour: (
    <>
      {[
        [48, 34, 11],
        [66, 30, 9],
        [60, 48, 12],
        [42, 52, 7],
        [78, 46, 8],
        [74, 60, 5],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} className={i % 2 ? "g-fill" : undefined} />
      ))}
      <path d="M96 18c4 0 6 3 6 6s-2 6-6 6" opacity=".6" />
    </>
  ),
  storm: (
    <>
      <path d="M14 30c10-10 20 10 30 0s20 10 30 0 20 10 30 0" />
      <path d="M14 44c10-10 20 10 30 0s20 10 30 0 20 10 30 0" opacity=".7" />
      <path d="M14 58c10-10 20 10 30 0s20 10 30 0 20 10 30 0" opacity=".45" />
      <path className="g-fill" d="M64 12l-8 16h8l-6 14 14-20h-8l6-10z" />
    </>
  ),
  network: (
    <>
      <path d="M24 22L52 36L40 62M52 36L80 18L98 44L76 64L52 36M80 18L76 64M40 62L76 64" opacity=".75" />
      {[
        [24, 22, 4],
        [52, 36, 6],
        [40, 62, 4],
        [80, 18, 5],
        [98, 44, 4],
        [76, 64, 5],
      ].map(([x, y, r], i) => (
        <circle key={i} className="g-fill" cx={x} cy={y} r={r} />
      ))}
    </>
  ),
  gut: (
    <>
      <path d="M22 18h66a10 10 0 0 1 0 20H34a10 10 0 0 0 0 20h66" strokeWidth="5" opacity=".9" />
      {[
        [40, 28],
        [62, 26],
        [78, 48],
        [52, 50],
        [88, 60],
      ].map(([x, y], i) => (
        <ellipse key={i} className="g-fill" cx={x} cy={y} rx="3.5" ry="1.8" transform={`rotate(${i * 37} ${x} ${y})`} />
      ))}
    </>
  ),
  capsule: (
    <>
      <g transform="rotate(-30 60 40)">
        <rect x="30" y="29" width="60" height="22" rx="11" />
        <path className="g-fill" d="M60 29h19a11 11 0 0 1 0 22H60z" />
      </g>
      <path d="M20 66c8-14 22-16 30-10-10 2-18 6-30 10z" />
      <path d="M22 64c8-5 16-7 24-8" opacity=".6" />
    </>
  ),
  lattice: (
    <>
      {[0, 1, 2].flatMap((r) =>
        [0, 1, 2, 3].map((c) => {
          const x = 30 + c * 20 + (r % 2) * 10;
          const y = 20 + r * 17;
          return <path key={`${r}-${c}`} d={`M${x} ${y - 8}l7 4v8l-7 4-7-4v-8z`} opacity={0.5 + ((r + c) % 3) * 0.25} />;
        }),
      )}
      <circle className="g-fill" cx="60" cy="37" r="4" />
    </>
  ),
  hyphae: (
    <>
      <path d="M14 66C34 60 44 46 58 40s30-4 48-20" />
      <path d="M44 50c2-10 0-18-6-26M58 40c6 6 8 14 6 24M78 34c0-8 4-14 10-18M86 30c8 2 14 8 18 16" opacity=".75" />
      <path d="M38 24c-4-2-8-2-12 0M64 64c2 3 6 5 10 5" opacity=".5" />
      {[
        [38, 24],
        [64, 64],
        [88, 16],
        [104, 46],
      ].map(([x, y], i) => (
        <circle key={i} className="g-fill" cx={x} cy={y} r="3" />
      ))}
    </>
  ),
  helix: (
    <>
      <path d={`M${helix.map((p) => `${p.x} ${p.y}`).join(" L")}`} />
      <path d={`M${helix.map((p) => `${p.x} ${p.y2}`).join(" L")}`} opacity=".6" />
      {helix.map((p, i) => (
        <path key={i} d={`M${p.x} ${p.y}V${p.y2}`} opacity=".45" />
      ))}
      <circle className="g-fill" cx={helix[4].x} cy={helix[4].y} r="3.5" />
    </>
  ),
  shield: (
    <>
      <path d="M60 10l26 10v18c0 16-11 28-26 34-15-6-26-18-26-34V20z" />
      <path className="g-fill" d="M60 18l18 7v13c0 11-7 20-18 25z" />
      <path d="M50 40l7 7 13-14" strokeWidth="3" />
    </>
  ),
};

export function ArticleGlyph({ glyph }: { glyph: Glyph }) {
  return (
    <svg className="wr-glyph" viewBox="0 0 120 80" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {GLYPHS[glyph]}
    </svg>
  );
}
