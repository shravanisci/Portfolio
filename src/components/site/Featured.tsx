import { ViewTransition } from "react";
import { flagships } from "@/content/profile";
import { MoleculeClip } from "./MoleculeClip";
import { OpenCase } from "./OpenCase";
import { ScaleBar } from "./ScaleBar";
import { splitLetters } from "./split";
import { morphOn, visualName } from "./transitions";

const SLUG = "egfr-nsclc";

/**
 * The featured project: a huge two-line title over a fine grid band, with the EGFR kinase domain
 * turning in 3D where a card used to sit. The molecular-dynamics clip lives in the case study.
 */
export function Featured() {
  const project = flagships.find((p) => p.slug === SLUG)!;
  const l1 = splitLetters("EGFR");
  const l2 = splitLetters("INHIBITORS", l1.next);

  return (
    <section id="featured" className="featured" data-reveal="0.22" aria-labelledby="featured-label">
      <div className="sec-head">
        <h2 id="featured-label" className="kicker" style={{ margin: 0, fontWeight: 400 }}>
          {"// Featured Research"}
        </h2>
        <p className="kicker-sm" style={{ margin: 0 }}>
          Prescience Insilico // 2025
        </p>
      </div>

      <h3 className="f-title disp split" style={{ fontWeight: 500 }}>
        <span className="line">
          {l1.nodes}
          <span className="mark" aria-hidden="true">
            [01]
          </span>
        </span>
        <span className="line">{l2.nodes}</span>
      </h3>

      <div className="f-stage">
        <div className="f-band" aria-hidden="true">
          <span>01 / L858R · T790M · C797S — THE TRIPLE MUTANT</span>
        </div>
        <ViewTransition name={visualName(SLUG)} share={morphOn("via-featured")} default="none">
        <figure className="f-mol">
          <span className="f-corners" aria-hidden="true" />
          <MoleculeClip />
          <figcaption>
            <span>MOL_9 bound to EGFR 6WXN</span>
            <span>MD simulation · PyMOL</span>
          </figcaption>
        </figure>
        </ViewTransition>
      </div>

      <div className="f-caption">
        <p>Selective EGFR inhibitors — Docking &amp; molecular dynamics</p>
        <p>Structure-based drug design / Virtual screening / MD simulation</p>
        <OpenCase slug={SLUG} className="pill" via="via-featured">
          View case study <span className="sr-only">: {project.name}</span>
          <span aria-hidden="true">↗</span>
        </OpenCase>
      </div>
      <ScaleBar label="5 nm" />
    </section>
  );
}
