import { ImageResponse } from "next/og";
import { articles, flagships, milestones } from "@/content/profile";

export const alt =
  "Shravani BS Bollapragada: undergraduate researcher in the life sciences selected for Stanford's 2026 Mini Fellowship on Molecular Imaging, working on cancer biology and transcriptomics";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0f3038";
const FG = "#ecfafc";
const MUTED = "#aecdd2";
const CYAN = "#66e6f2";
const SAGE = "#a8d0b0";

const internships = milestones.filter((m) => m.kind === "internship").length;
const stats = [
  { n: String(internships), l: "internships" },
  { n: String(flagships.length), l: "research projects" },
  { n: String(articles.length), l: "science articles" },
];

// Fluorescent spots inside the field of view: centre (as % of the circle), size, colour.
const spots = [
  { x: 34, y: 34, s: 120, c: SAGE, o: 0.55 },
  { x: 62, y: 28, s: 80, c: CYAN, o: 0.5 },
  { x: 70, y: 60, s: 150, c: SAGE, o: 0.45 },
  { x: 44, y: 68, s: 96, c: CYAN, o: 0.5 },
  { x: 24, y: 58, s: 70, c: SAGE, o: 0.5 },
  { x: 54, y: 47, s: 46, c: FG, o: 0.4 },
];

const hexA = (hex: string, a: number) =>
  `rgba(${parseInt(hex.slice(1, 3), 16)}, ${parseInt(hex.slice(3, 5), 16)}, ${parseInt(hex.slice(5, 7), 16)}, ${a})`;

/** The link preview: her name and fellowship on the left, the hero's microscope field of view on the right. */
export default function Image() {
  const D = 520;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: BG, color: FG, position: "relative" }}>
        {/* Field of view */}
        <div
          style={{
            position: "absolute",
            right: -60,
            top: 55,
            width: D,
            height: D,
            borderRadius: 999,
            border: `2px solid ${hexA(FG, 0.28)}`,
            display: "flex",
            backgroundImage: `radial-gradient(circle at 50% 50%, ${hexA(SAGE, 0.22)}, ${hexA(BG, 0)} 70%)`,
          }}
        >
          {spots.map((s, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: (s.x / 100) * D - s.s / 2,
                top: (s.y / 100) * D - s.s / 2,
                width: s.s,
                height: s.s,
                borderRadius: 999,
                backgroundImage: `radial-gradient(circle, ${hexA(s.c, s.o)} 0%, ${hexA(s.c, 0)} 70%)`,
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              left: D * 0.18,
              top: D * 0.18,
              width: D * 0.64,
              height: D * 0.64,
              borderRadius: 999,
              border: `1px solid ${hexA(FG, 0.12)}`,
            }}
          />
          <div style={{ position: "absolute", left: D / 2 - 1, top: -2, width: 2, height: 26, background: hexA(FG, 0.4) }} />
          <div style={{ position: "absolute", left: -2, top: D / 2 - 1, width: 26, height: 2, background: hexA(FG, 0.4) }} />
          <div style={{ position: "absolute", left: D / 2 - 1, bottom: -2, width: 2, height: 26, background: hexA(FG, 0.4) }} />
          <div style={{ position: "absolute", left: D / 2 - 14, top: D / 2, width: 28, height: 1, background: hexA(FG, 0.3) }} />
          <div style={{ position: "absolute", left: D / 2, top: D / 2 - 14, width: 1, height: 28, background: hexA(FG, 0.3) }} />
        </div>

        {/* Text */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            width: 820,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 22, letterSpacing: 3, color: MUTED, textTransform: "uppercase" }}>
              Undergraduate researcher · Life sciences
            </div>
            <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -4, lineHeight: 0.95, marginTop: 26, display: "flex", flexDirection: "column" }}>
              <span>Shravani BS</span>
              <span>Bollapragada</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginTop: 34, fontSize: 30 }}>
              <div style={{ width: 14, height: 14, borderRadius: 99, background: CYAN, marginRight: 16 }} />
              <span>Stanford Summer Fellow · Molecular Imaging, 2026</span>
            </div>
            <div style={{ marginTop: 10, marginLeft: 30, fontSize: 24, color: MUTED }}>
              Cancer biology · Transcriptomics · Drug design
            </div>
          </div>
          <div style={{ display: "flex", gap: 44 }}>
            {stats.map((s) => (
              <div key={s.l} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontSize: 54, fontWeight: 700, color: CYAN, letterSpacing: -2 }}>{s.n}</span>
                <span style={{ fontSize: 22, color: MUTED }}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
