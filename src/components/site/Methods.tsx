"use client";

import { useId, useState, type CSSProperties, type ReactNode } from "react";
import { techniques } from "@/content/profile";
import { MethodIcon } from "./MethodIcon";
import { ScaleBar } from "./ScaleBar";
import Link from "next/link";
import { caseHref } from "./links";
import { fwd } from "./transitions";
import { splitLetters } from "./split";

/** An orange "Explore +" toggle and the panel it controls. Hidden panels leave the tab order. */
export function useDisclosure() {
  const [open, setOpen] = useState(false);
  const id = useId();
  const button = (name: string) => (
    <button
      type="button"
      className="disclose"
      aria-expanded={open}
      aria-controls={id}
      aria-label={`${open ? "Close" : "Explore"} ${name}`}
      onClick={() => setOpen((o) => !o)}
    >
      {open ? "Close −" : "Explore +"}
    </button>
  );
  const panel = (className: string, children: ReactNode) => (
    <div id={id} className={className} hidden={!open}>
      {children}
    </div>
  );
  return { button, panel };
}

function MethodRow({ t, i }: { t: (typeof techniques)[number]; i: number }) {
  const { button, panel } = useDisclosure();
  const rest = t.items.length - 3;
  return (
    <li style={{ "--i": i } as CSSProperties}>
      <div className="caps-row">
        <span className="caps-num">{String(i + 1).padStart(2, "0")}</span>
        <h3 className="caps-title disp">
          <MethodIcon name={t.name} />
          {t.name}
        </h3>
        <p className="caps-scope" style={{ margin: 0 }}>
          {t.items.slice(0, 3).join(" / ")}
          {rest > 0 ? ` + ${rest} more` : ""}
        </p>
        {button(t.name)}
      </div>
      {panel(
        "caps-panel",
        <div>
          <span className="label">Techniques:</span>
          <ul className="bul">
            {t.items.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          {t.appliedIn?.length ? (
            <>
              <span className="label">Applied in:</span>
              <ul className="bul">
                {t.appliedIn.map((a) => (
                  <li key={a.label}>
                    {a.project ? (
                      <Link href={caseHref(a.project)} className="inline-link" prefetch transitionTypes={fwd()}>
                        {a.label}
                      </Link>
                    ) : (
                      a.label
                    )}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>,
      )}
    </li>
  );
}

export function Methods() {
  const l1 = splitLetters("FROM RAW DATA");
  const l2 = splitLetters("TO BIOLOGY.", l1.next);
  return (
    <section id="methods" tabIndex={-1} className="caps band" data-reveal="0.15" aria-labelledby="methods-title">
      <div className="caps-top">
        <h2 id="methods-title" className="caps-h disp split" style={{ fontWeight: 500 }}>
          <span className="line">{l1.nodes}</span>
          <span className="line">{l2.nodes}</span>
        </h2>
        <p className="kicker" style={{ margin: 0 }}>
          {"// METHODS."}
        </p>
      </div>
      <div className="caps-cols" aria-hidden="true">
        <span>#</span>
        <span>Area</span>
        <span>Techniques</span>
        <span />
      </div>
      <ul className="caps-list has-cols rows">
        {techniques.map((t, i) => (
          <MethodRow key={t.name} t={t} i={i} />
        ))}
      </ul>
      <div className="caps-notes">
        <p>From wet-lab basics to computational pipelines.</p>
        <p>Python / R &amp; Bioconductor / PRinS3</p>
      </div>
      <ScaleBar label="10 µm" />
    </section>
  );
}
