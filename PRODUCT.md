# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Everyone who looks up Shravani BS Bollapragada, an undergraduate researcher in the life sciences at JAIN (Deemed-to-be University), Bengaluru (B.Sc. (Hons.) Biochemistry, Genetics & Biotechnology, 2024 to 2028):

- Principal investigators, lab managers and research program coordinators reviewing internship, fellowship and summer research applications.
- Graduate admissions readers, who read for depth.
- Researchers, students and professionals in bioinformatics and AI for healthcare arriving from LinkedIn or GitHub.

## Product Purpose

A one-page academic site with an editorial, type-led design (hero, research approach and interests, featured project, research index with full case studies, methods, the record of experience, honors, presentations, education and writing, then contact), so that a visitor leaves able to do any of: email her, download the resume, or open a project (a GitHub repo or its figures). All three actions matter equally.

## Positioning

Research first, not projects: transcriptomics of colorectal cancer liver metastasis, a breast cancer diagnostic biomarker panel, structure-based design against resistant EGFR mutations, and an exploratory systems-immunology framework (ABC, lowest priority). Every claim on the site can be traced to the resume, a repo, LinkedIn, or Shravani's own words.

## Constraints

- All facts live in `src/content/profile.ts`; never invent metrics, outcomes or achievements. Ask before adding any new claim.
- Content order follows life-science academic sites: who she is and her interests first, research by question, then the record. Visual treatment is editorial (see DESIGN.md), but it must not hide facts: case studies keep the full question, approach, findings and sources.
- Complete vs in-progress status is a real distinction in the content and must stay legible.
- Public contact: email, GitHub, LinkedIn, resume PDF. No phone number.
- Existing stack: Next.js 16 (App Router), React 19, Tailwind CSS 4, Motion, Mona Sans via next/font. Avoid new dependencies unless they earn their place.
- Accessibility: keyboard reachable, reduced-motion respected, WCAG AA contrast.

## Brand commitments

- Lagoon theme: deep teal dark mode (default, never neutral black), cyan-tinted light mode, cyan accent, sage secondary.
- Big semi-condensed type carries the identity; no portrait until a real headshot exists.
- No pointer distortion, ripples or cursor-following imagery (explicitly declined). Motion is finite and respects reduced motion.
- Keep both themes polished behind the toggle.

## Voice

Plain, specific, first person, no hype. Concrete numbers only when sourced.
