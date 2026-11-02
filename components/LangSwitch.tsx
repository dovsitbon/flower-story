"use client";

import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

const LABELS: Record<Locale, string> = { he: "עב", en: "EN", fr: "FR", es: "ES" };

export function LangSwitch({ lang, label, className = "" }: { lang: Locale; label: string; className?: string }) {
  const pathname = usePathname() || `/${lang}`;
  const rest = pathname.replace(/^\/(he|en|fr|es)(?=\/|$)/, "");

  return (
    <nav aria-label={label} className={`flex items-center gap-2 text-[0.75rem] tracking-[0.18em] ${className}`} dir="ltr">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden="true" className="opacity-40">·</span>}
          <a
            href={`/${l}${rest}`}
            hrefLang={l}
            lang={l}
            aria-current={l === lang ? "true" : undefined}
            onClick={() => {
              document.cookie = `NEXT_LOCALE=${l};path=/;max-age=31536000;samesite=lax`;
            }}
            className={`py-2 transition-opacity ${l === lang ? "opacity-100" : "opacity-55 hover:opacity-100"}`}
          >
            {LABELS[l]}
          </a>
        </span>
      ))}
    </nav>
  );
}
