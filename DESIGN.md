---
name: Shravani BS Bollapragada
description: An editorial, type-led researcher page in Lagoon teal, cyan and sage, where every fact has a source.
colors:
  ground: "#0f3038"
  surface: "#163c45"
  surface-raised: "#1e4953"
  hairline: "rgb(200 245 250 / 0.12)"
  hairline-strong: "rgb(200 245 250 / 0.24)"
  ink: "#ecfafc"
  muted: "#aecdd2"
  accent: "#66e6f2"
  accent-2: "#a8d0b0"
  on-accent: "#072027"
  completed: "#a8d0b0"
  ongoing: "#66e6f2"
typography:
  hero:
    fontFamily: "Mona Sans (wdth 87.5), Arial, sans-serif"
    fontSize: "clamp(42px, 19cqw, 280px)"
    fontWeight: 500
    lineHeight: 0.727
    letterSpacing: "-0.06em"
  statement:
    fontFamily: "Mona Sans (wdth 87.5), Arial, sans-serif"
    fontSize: "clamp(30px, 9.2cqw, 136px)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  section-display:
    fontFamily: "Mona Sans (wdth 87.5), Arial, sans-serif"
    fontSize: "clamp(30px, 6.4cqw, 86px)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.045em"
  row-title:
    fontFamily: "Mona Sans (wdth 87.5), Arial, sans-serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Mona Sans, Arial, sans-serif"
    fontSize: "17–18px"
    fontWeight: 400
    lineHeight: 1.5
  utility:
    fontFamily: "\"PP Neue Montreal\", Geist, Arial, sans-serif"
    fontSize: "13–18px"
    fontWeight: 400
    lineHeight: 1.3
rounded:
  square: "0"
  full: "999px"
spacing:
  inset: "3%"
  inset-research: "4%"
  pill-height: "50px"
  control-min: "44px"
components:
  pill:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    rounded: "{rounded.full}"
    padding: "16px 20px"
    height: "{spacing.pill-height}"
  pill-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
  pill-ghost:
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    border: "1px {colors.hairline-strong}"
  disclose:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.full}"
    height: "{spacing.control-min}"
  tag:
    textColor: "{colors.muted}"
    rounded: "{rounded.full}"
    padding: "10px 14px"
    border: "1px var(--tag-line)"
  case-dialog:
    backgroundColor: "{colors.surface}"
    border: "1px {colors.hairline-strong}"
    rounded: "{rounded.square}"
---

# Design System: Shravani BS Bollapragada

`src/app/site.css` (layout and motion) and the tokens at the top of `src/app/globals.css` are the source of truth. This file describes the intent.

## Overview

**Creative North Star: "The research poster, at page scale."**

An editorial, type-led page adapted from an art-director portfolio brief, for an undergraduate life-sciences researcher. Huge semi-condensed type does the work a portrait would; generous negative space, fine rules and a handful of pill buttons do the rest. Most rectangles are square-edged; only buttons, tags and the cursor bubble are round.

There is **no portrait and no WebGL**: the brief's pointer ripple, chromatic distortion and face-hover zoom were deliberately left out, as were its floating cursor image and custom cursor dot. The hero backdrop is a static "field of view" (a microscope reticle with a few soft fluorescent spots, a nod to her molecular-imaging fellowship), moved only by scroll parallax.

## Colors

Theme: **Lagoon**. Dark is the default and is a deep teal, never neutral black. Light is a bright cyan-tinted white. Tokens live in `globals.css` and every component reads them, so both themes work everywhere.

| Token | Dark | Light | Used for |
|---|---|---|---|
| `--bg` | `#0f3038` | `#e8f8fa` | Page ground |
| `--surface` / `--surface-2` | `#163c45` / `#1e4953` | `#d9f1f4` / `#c7e8ec` | Case dialog, poster and article cards |
| `--fg` | `#ecfafc` | `#0b2a30` | Text, pill fill |
| `--muted` | `#aecdd2` | `#43656b` | Secondary text, labels |
| `--accent` | `#66e6f2` cyan | `#00737f` | Pill hover, focus ring, selection, second line of big headings, "Explore +" buttons, Fellowship dot, honors sub-lines |
| `--accent-2` | `#a8d0b0` sage | `#7fae8b` | Hero glow, internship dots, alternating poster strips, bullets |
| `--ok` / `--wip` | sage / cyan | `#426e4d` / `#00737f` | Completed / Ongoing project status |
| `--work-grad` | teal → `#1f8a9a` → `#a8d0b0` | cyan-white → `#8fdcea` → `#bcd9b4` | Selected Research background |

Overlays behind the menu and dialog are teal-black (`rgb(3 20 24 / .65–.85)`), not neutral black.

### Named rules

- **Accent marks emphasis, not decoration.** One accent per element; never cyan text on a cyan fill.
- **Status stays legible.** Completed vs Ongoing is a real distinction in the content and always has a text label, not just a colour.

## Typography

- **Display:** Mona Sans at width 87.5 (semi-condensed), loaded once through `next/font` with the `wdth` axis. Weight 500 for headings, 250 for the thin "Bio" monogram.
- **Body:** Mona Sans at normal width.
- **Utility:** `"PP Neue Montreal", Geist, Arial` for kickers (`// Section`), labels, dates and buttons. PP Neue Montreal is not loaded; Geist is the real face.
- Large headings size in `cqw` (container query units) with `vw` fallbacks, so they scale with their section, not the window, and hold up under zoom.

## Layout

Single page, sections in order: Hero → Research Approach (`#about`) → Featured Research (`#featured`) → Selected Research (`#work`) → Methods (`#methods`) → Record (`#record`) → Contact (`#contact`). Side inset 3% (4% for Selected Research). No horizontal page scroll at any width from 320px up; the Writing row is the only intentional sideways scroller.

- **Hero:** "Bio" (thin) left, "Shravani" (medium) right with a `[BSc]` marker, one line at every width. Visitor's local clock left, MENU centred, theme toggle and "Let's talk" right.
- **Selected Research:** a ruled index (number, project, field, year, arrow). Each row is a button that opens the full case study in a native `<dialog>`.
- **Methods:** ruled rows with an accent "Explore +" disclosure each.
- **Record:** deliberately varied: Experience as a timeline with big years; Honors as large type in a 2×2 grid; Presentations as poster-shaped cards; Education beside compact lists of certifications and memberships; Writing as a sideways row of article cards.

## Elevation & Depth

Flat. No shadows except the soft halo on the Fellowship dot. Depth comes from the two surface steps, fine rules and the teal-black overlays.

## Motion

- Hero letters rise and un-blur in sequence (0.9s each, 0.1s apart) once fonts are ready (max 1.8s wait), and replay when the hero leaves the viewport and comes back.
- Sections reveal once on scroll: line-by-line statement, letter-staggered headings, rows rising 34px with 85ms stagger.
- Featured card tilts with the pointer and shows a "View case study" bubble (fine pointers only).
- Index rows wipe to an inverted fill on hover; a figure thumbnail fades in (wide fine-pointer screens only).
- Menu link letters roll up to an accent copy.
- **Reduced motion:** everything is shown immediately; tilt, parallax, bounce, rolls and the bubble are off; scrolling is instant.

## Components

- **Pill** (`.pill`): ink fill, ground text, 50px tall, 999px radius. Hover: accent fill, scale 1.04. Press: scale 0.98. `.pill-ghost` is outlined.
- **Disclosure** (`.disclose`): accent fill, "Explore +" / "Close −", with `aria-expanded`, `aria-controls` and a hidden panel that leaves the tab order.
- **Tag** (`.tag`): outlined, round, muted.
- **Case dialog** (`.case`): native modal, sticky close bar, Escape and backdrop-click close, focus returns to the opener, page scroll locked. Content: status, title, tagline, figure viewer, meta, Question, Approach, Pipeline, Key figures, Findings, Methods & tools.
- **Figure viewer** (`FigureViewer.tsx`): tabbed figures on white or black plates; MD clips load only when selected and play only while on screen.

## Do's and Don'ts

### Do

- Keep every fact in `src/content/profile.ts` and traceable to her resume, repos, LinkedIn or her own words.
- Use the tokens; never hard-code a theme colour in a component.
- Check new layout at 320, 375, 560, 768, 900, 1200 and 1440px, both themes, keyboard only.

### Don't

- Don't add a portrait-dependent layout until there is a real headshot.
- Don't reintroduce pointer distortion, ripples or cursor-following imagery; they were explicitly declined.
- Don't use neutral black for the dark theme.
