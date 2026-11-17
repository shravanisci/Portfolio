import type { ReactNode } from "react";

/** Line icons for the Methods areas, drawn on a 32×32 box in currentColor. Decorative only. */
const ICONS: Record<string, ReactNode> = {
  Laboratory: (
    <>
      <path d="M12 4h8M13 4v8L6.5 24.5A2.4 2.4 0 0 0 8.6 28h14.8a2.4 2.4 0 0 0 2.1-3.5L19 12V4" />
      <path d="M9.5 19h13" opacity=".6" />
      <circle className="mi-fill" cx="14" cy="23.5" r="1.4" />
      <circle className="mi-fill" cx="18.5" cy="22" r="1" />
    </>
  ),
  Transcriptomics: (
    <>
      <path d="M5 9c4 0 4 6 8 6s4-6 8-6 4 6 6 6" />
      <path d="M5 21c4 0 4-6 8-6" opacity=".55" />
      <path d="M8 9.4v3.2M12 13.6v1.4M17 10v3.6M21 9v3" opacity=".6" />
      <circle className="mi-fill" cx="24" cy="23" r="3" />
      <path d="M21 23H15" opacity=".6" />
    </>
  ),
  "Structural biology": (
    <>
      <path d="M6 22c3-8 6 4 9-4s5 3 7-5 4-2 4-2" />
      <path d="M6 22c2 2 4 3 7 2M22 13c1.5-1 3-1 4.5 0" opacity=".55" />
      <circle className="mi-fill" cx="15" cy="18" r="2.2" />
      <path d="M13 26h6" opacity=".5" />
    </>
  ),
  "Sequence analysis": (
    <>
      <path d="M5 10h22M5 16h22M5 22h22" opacity=".35" />
      <path d="M7 10h5M14 10h3M19 10h6M7 16h8M17 16h8M7 22h3M12 22h7M21 22h4" strokeWidth="2.4" />
      <rect className="mi-fill" x="16.5" y="7.5" width="3" height="17" rx="1" opacity=".45" />
    </>
  ),
  Software: (
    <>
      <rect x="4" y="6" width="24" height="20" rx="2.5" />
      <path d="M4 11h24" opacity=".5" />
      <path d="M9 16l3 2.5L9 21M15 21h7" />
      <circle className="mi-fill" cx="7.5" cy="8.5" r=".9" />
    </>
  ),
};

export function MethodIcon({ name }: { name: string }) {
  const icon = ICONS[name];
  if (!icon) return null;
  return (
    <svg className="mi" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {icon}
    </svg>
  );
}
