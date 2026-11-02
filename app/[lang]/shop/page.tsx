import type { Metadata } from "next";
import { Suspense } from "react";
import { getDict, isLocale, type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";
import { ShopGrid } from "@/components/ShopGrid";

export async function generateMetadata({ params }: PageProps<"/[lang]/shop">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const d = getDict(lang);
  return { ...pageMeta(lang, "/shop", d.meta.shopTitle, d.meta.shopDescription), title: { absolute: d.meta.shopTitle } };
}

export default async function ShopPage({ params }: PageProps<"/[lang]/shop">) {
  const { lang } = await params;
  const d = getDict(lang as Locale);
  return (
    <div className="px-6 pt-40 pb-28 md:px-10 md:pt-48 md:pb-40">
      <div className="mx-auto max-w-7xl">
        <header className="mb-14 max-w-2xl md:mb-20">
          <p className="eyebrow mb-5 text-muted">{d.shop.eyebrow}</p>
          <h1 className="display text-5xl md:text-7xl">{d.shop.title}</h1>
          <p className="mt-6 leading-relaxed text-muted">{d.shop.intro}</p>
          {d.abroad && <p className="display mt-6 text-xl text-wine italic">{d.abroad}</p>}
        </header>
        <Suspense fallback={<div className="h-96" />}>
          <ShopGrid />
        </Suspense>
      </div>
    </div>
  );
}
