// Absolute site origin for metadata, the sitemap and structured data.
// NEXT_PUBLIC_SITE_URL wins (set it once there's a custom domain). On Vercel, the production
// *.vercel.app URL is used automatically; locally it falls back to the dev server.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : `http://localhost:${process.env.PORT ?? 3000}`);
