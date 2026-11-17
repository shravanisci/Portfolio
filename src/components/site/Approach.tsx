import type { CSSProperties } from "react";
import { interests, rightNow } from "@/content/profile";
import { ScaleBar } from "./ScaleBar";

// Her own words from the About section, set as five line groups.
const LINES = [
  "Curious about how biological",
  "systems adapt, fail, and can be",
  "engineered, I work where",
  "computational biology, genomics",
  "and disease research meet.",
];

export function Approach() {
  return (
    <section id="about" tabIndex={-1} className="approach" aria-labelledby="about-title">
      <h2 id="about-title" className="kicker" style={{ margin: 0, fontWeight: 400 }}>
        {"// Research Approach"}
      </h2>
      <p className="statement disp" data-reveal="0.2">
        {LINES.map((l, i) => (
          <span key={i} className="ln">
            <span style={{ "--i": i } as CSSProperties}>{l} </span>
          </span>
        ))}
      </p>
      <div className="approach-meta">
        <div className="approach-left">
          <p>
            I&rsquo;m an undergraduate researcher in biochemistry, genetics and biotechnology. My long-term goal is to
            contribute to research that combines biological insight with computational methods to advance precision
            medicine, translational genomics and therapeutic innovation.
          </p>
          <article className="now-card" aria-labelledby="now-title">
            <p className="now-status">
              <span className="now-dot" aria-hidden="true" />
              Currently · since {rightNow.since}
            </p>
            <h3 id="now-title" className="now-title disp">
              {rightNow.topic ?? "Undergraduate dissertation"}
            </h3>
            <p className="now-body">{rightNow.topic ? `Undergraduate dissertation, ${rightNow.place}.` : rightNow.body}</p>
            {rightNow.supervisor ? <p className="now-meta">Supervised by {rightNow.supervisor}</p> : null}
          </article>
        </div>
        <div className="approach-tags">
          <h3 className="kicker-sm" style={{ margin: 0, fontWeight: 400 }}>
            Research interests
          </h3>
          <ul>
            {interests.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ScaleBar label="100 µm" />
    </section>
  );
}
