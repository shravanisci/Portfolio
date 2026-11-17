# shravani.bollapragada

Personal portfolio of Shravani BS Bollapragada, undergraduate researcher in computational biology at JAIN (Deemed-to-be University), Bengaluru.

Built with Next.js, Tailwind CSS and Mona Sans. Every fact on the page is traceable to her resume, repositories, LinkedIn or her own words.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
```

## Edit content

All text, projects, skills, timeline, certifications and articles live in `src/content/profile.ts`.
Components in `src/components/site/` only render that data; page styles are in `src/app/site.css` and the
theme tokens at the top of `src/app/globals.css`. Project figures live in `public/figures/`.

## Legal pages

`/privacy`, `/terms` and `/accessibility` live in `src/app/<name>/page.tsx`. Update their text and the
`LEGAL_UPDATED` date in `src/components/site/Legal.tsx` if the site starts collecting anything.

## Deploy

Push to GitHub and import the repository in Vercel. No environment variables are needed: the site uses
Vercel's production `*.vercel.app` URL for metadata automatically. Once there is a custom domain, set
`NEXT_PUBLIC_SITE_URL` (for example `https://example.com`) in the Vercel project settings.

## License

The code is under the [MIT License](LICENSE).

The personal content is not: the text in `src/content/profile.ts`, the resume PDF, the figures in
`public/figures/` and the share image. Those are all rights reserved.
