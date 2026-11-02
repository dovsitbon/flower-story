"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { activeCollection, type Collection } from "@/lib/catalog";
import { useLocale } from "@/components/providers";

export function Banner() {
  const { lang, d } = useLocale();
  const [col, setCol] = useState<Collection | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- dépend de la date du visiteur
    setCol(activeCollection());
  }, []);

  const texts = col ? (d.banner.collections as Record<string, { name: string; line: string }>)[col.id] : null;

  return (
    <div className="flex h-9 items-center justify-center bg-blush px-4 text-center text-[0.75rem] tracking-[0.06em] text-ink">
      {texts ? (
        <Link href={`/${lang}/shop?collection=${col!.id}`} className="truncate">
          <span className="font-normal">{texts.name}</span>
          <span className="mx-2 opacity-50" aria-hidden="true">·</span>
          <span className="hidden sm:inline">{texts.line}</span>
          <span className="link-line ms-2 sm:ms-3">{d.banner.cta}</span>
        </Link>
      ) : (
        <p className="truncate">
          {d.banner.default.split(" · ").map((part, i) => (
            <span key={part} className={i > 0 ? "hidden sm:inline" : undefined}>
              {i > 0 && <span className="mx-2 opacity-50" aria-hidden="true">·</span>}
              {part}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
