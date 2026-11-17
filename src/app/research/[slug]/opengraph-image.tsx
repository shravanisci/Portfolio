import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { flagships, statusLabel } from "@/content/profile";

export const alt = "A research study by Shravani BS Bollapragada";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0f3038";
const FG = "#ecfafc";
const MUTED = "#aecdd2";
const CYAN = "#66e6f2";
const SAGE = "#a8d0b0";

export function generateStaticParams() {
  return flagships.map((p) => ({ slug: p.slug }));
}

/** The study's preview card: its title and summary on the left, its lead figure on a plate on the right. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = flagships.findIndex((p) => p.slug === slug);
  const p = flagships[i] ?? flagships[0];
  const f = p.figures?.find((x) => !x.video);

  // The figure, fitted inside a 440×400 plate.
  let fig: { src: string; w: number; h: number; dark: boolean } | null = null;
  if (f) {
    const ext = f.src.split(".").pop() === "jpg" ? "jpeg" : f.src.split(".").pop();
    const data = await readFile(join(process.cwd(), "public", f.src), "base64");
    const k = Math.min(400 / f.width, 360 / f.height);
    fig = { src: `data:image/${ext};base64,${data}`, w: Math.round(f.width * k), h: Math.round(f.height * k), dark: f.plate === "dark" };
  }
  const titleSize = p.name.length > 60 ? 50 : p.name.length > 44 ? 56 : 64;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: BG, color: FG, padding: "60px 64px" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 620 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 20, letterSpacing: 3, color: MUTED, textTransform: "uppercase" }}>
              {`Research ${String(i + 1).padStart(2, "0")} · ${p.field} · ${p.year}`}
            </div>
            <div style={{ fontSize: titleSize, fontWeight: 700, letterSpacing: -2, lineHeight: 1.02, marginTop: 24 }}>{p.name}</div>
            <div style={{ fontSize: 26, lineHeight: 1.35, color: MUTED, marginTop: 22 }}>{p.tagline}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 12, height: 12, borderRadius: 99, background: CYAN }} />
            <div style={{ fontSize: 24 }}>Shravani BS Bollapragada</div>
            <div
              style={{
                display: "flex",
                fontSize: 18,
                padding: "4px 12px",
                border: `2px solid ${p.status === "progress" ? CYAN : SAGE}`,
                color: p.status === "progress" ? CYAN : SAGE,
              }}
            >
              {statusLabel[p.status]}
            </div>
          </div>
        </div>
        {fig ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, marginLeft: 36 }}>
            <div
              style={{
                display: "flex",
                padding: 14,
                background: fig.dark ? "#05030a" : "#ffffff",
                border: `1px solid rgba(200, 245, 250, 0.3)`,
                transform: "rotate(2deg)",
              }}
            >
              <img src={fig.src} width={fig.w} height={fig.h} alt="" />
            </div>
          </div>
        ) : (
          // No figure yet: the empty microscope field from the hero stands in.
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1 }}>
            <div
              style={{
                display: "flex",
                width: 360,
                height: 360,
                borderRadius: 999,
                border: "2px solid rgba(236, 250, 252, 0.28)",
                backgroundImage: "radial-gradient(circle at 50% 50%, rgba(168, 208, 176, 0.25), rgba(15, 48, 56, 0) 70%)",
                position: "relative",
              }}
            >
              {[
                { x: 110, y: 120, s: 90, c: "168, 208, 176" },
                { x: 230, y: 100, s: 60, c: "102, 230, 242" },
                { x: 220, y: 220, s: 110, c: "168, 208, 176" },
                { x: 120, y: 240, s: 70, c: "102, 230, 242" },
              ].map((d, k) => (
                <div
                  key={k}
                  style={{
                    position: "absolute",
                    left: d.x - d.s / 2,
                    top: d.y - d.s / 2,
                    width: d.s,
                    height: d.s,
                    borderRadius: 999,
                    backgroundImage: `radial-gradient(circle, rgba(${d.c}, 0.5) 0%, rgba(${d.c}, 0) 70%)`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    ),
    size,
  );
}
