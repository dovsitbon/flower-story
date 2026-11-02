import type { Locale } from "@/lib/i18n";

export const PETALS = [0, 72, 144, 216, 288];
export const PETAL_PATH = "M24 20 C20.4 15.6 20.6 10 24 6.5 C27.4 10 27.6 15.6 24 20 Z";
export const STEM_PATH = "M24 21 C24.4 29 23.4 36 24 44";
export const LEAF_PATH = "M24 33.5 C27.2 30.6 31.2 30.4 33.6 32.4 C30.6 35.4 27 35.6 24 33.5 Z";

/** Petite fleur au trait fin, utilisée dans le logo, le favicon et l'ouverture. */
export function FlowerMark({ className = "", strokeWidth = 1 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {PETALS.map((r) => (
        <path key={r} d={PETAL_PATH} transform={`rotate(${r} 24 20)`} />
      ))}
      <circle cx="24" cy="20" r="1.4" />
      <path d={STEM_PATH} />
      <path d={LEAF_PATH} />
    </svg>
  );
}

/** Logo typographique : FLOWER STORY (ou פלאוור סטורי) + BOUTIQUE. Remplaçable par public/logo.svg. */
export function Logo({ lang, className = "" }: { lang: Locale; className?: string }) {
  const he = lang === "he";
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`} translate="no">
      <span className="inline-flex items-center gap-2">
        <FlowerMark className="h-[1.15em] w-[1.15em] -translate-y-px" />
        {he ? (
          <span className="font-[family-name:var(--font-frank)] text-[1.35em] font-light tracking-[0.08em]">פלאוור סטורי</span>
        ) : (
          <span className="font-[family-name:var(--font-jost)] text-[1em] font-light tracking-[0.42em] [margin-inline-end:-0.42em]">FLOWER STORY</span>
        )}
      </span>
      <span className="mt-[0.45em] font-[family-name:var(--font-jost)] text-[0.42em] font-normal tracking-[0.62em] [margin-inline-end:-0.62em]">BOUTIQUE</span>
    </span>
  );
}
