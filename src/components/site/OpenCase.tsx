import Link from "next/link";
import type { ReactNode } from "react";
import { caseHref } from "./links";
import { fwd } from "./transitions";

/** A link to a study's own page; `via` names the shared element that should morph into it. */
export function OpenCase({
  slug,
  className,
  via,
  children,
}: {
  slug: string;
  className?: string;
  via?: "via-row" | "via-figure" | "via-featured";
  children: ReactNode;
}) {
  return (
    <Link href={caseHref(slug)} className={className} prefetch transitionTypes={fwd(via)}>
      {children}
    </Link>
  );
}
