import type { MetadataRoute } from "next";
import { flagships } from "@/content/profile";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/cv`, changeFrequency: "monthly", priority: 0.8 },
    ...flagships.map((p) => ({ url: `${siteUrl}/research/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: `${siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/accessibility`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
