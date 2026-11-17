"use client";

/** Opens the browser's print dialog, where the CV can also be saved as a PDF. */
export function PrintButton() {
  return (
    <button type="button" className="pill cv-print" onClick={() => window.print()}>
      Print / save PDF
    </button>
  );
}
