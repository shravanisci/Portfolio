/**
 * A microscope scale bar used as a section's closing mark. Decorative: hidden from assistive tech.
 * The bar draws out from its right end when it scrolls into view (via the page's [data-reveal]).
 */
export function ScaleBar({ label, width = 120 }: { label: string; width?: number }) {
  return (
    <div className="scalebar" aria-hidden="true" data-reveal="1">
      <span className="sb-inner" style={{ width }}>
        <span className="sb-bar" />
        <span className="sb-label">{label}</span>
      </span>
    </div>
  );
}
