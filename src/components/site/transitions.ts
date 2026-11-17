/**
 * View-transition vocabulary for page-to-page navigation.
 *
 * Types tag a navigation: `nav-forward` (going deeper) and `nav-back` (returning) pick the slide
 * direction; `via-row`, `via-figure` and `via-featured` say which shared element was clicked, so only
 * that element morphs and nothing off screen flies in.
 */
export const SLIDE = { "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" } as const;

export const morphOn = (type: "via-row" | "via-figure" | "via-featured") => ({ [type]: "morph", default: "none" }) as const;

export const fwd = (via?: "via-row" | "via-figure" | "via-featured") => (via ? ["nav-forward", via] : ["nav-forward"]);
export const back = ["nav-back"];

/** Shared-element names: a study's title block, and its lead visual. */
export const headName = (slug: string) => `study-head-${slug}`;
export const visualName = (slug: string) => `study-visual-${slug}`;
