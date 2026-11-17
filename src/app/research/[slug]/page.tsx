import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense, ViewTransition } from "react";
import { CaseArticle, CaseFrame } from "@/components/site/CasePage";
import { SLIDE } from "@/components/site/transitions";
import { flagships } from "@/content/profile";

export function generateStaticParams() {
  return flagships.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/research/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = flagships.find((x) => x.slug === slug);
  if (!p) return {};
  const url = `/research/${p.slug}`;
  return {
    title: p.short,
    description: p.tagline,
    alternates: { canonical: url },
    openGraph: { title: `${p.short} · Shravani BS Bollapragada`, description: p.tagline, url, siteName: "Shravani BS Bollapragada", type: "article" },
  };
}

/** Reads the URL's slug, so it sits inside Suspense; the frame around it is shared by every study. */
async function Study({ params }: Pick<PageProps<"/research/[slug]">, "params">) {
  const { slug } = await params;
  const p = flagships.find((x) => x.slug === slug);
  if (!p) notFound();
  return <CaseArticle p={p} />;
}

export default function ResearchPage({ params }: PageProps<"/research/[slug]">) {
  // Slides in and out when arriving from or leaving for another page; switching between studies is
  // handled by the keyed transition inside CaseArticle.
  return (
    <ViewTransition enter={SLIDE} exit={SLIDE} default="none">
      <CaseFrame>
        <Suspense fallback={<div className="cp-main" style={{ minHeight: "100vh" }} aria-busy="true" />}>
          <Study params={params} />
        </Suspense>
      </CaseFrame>
    </ViewTransition>
  );
}
