"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { categories, occasions, products } from "@/lib/catalog";
import { fill } from "@/lib/i18n";
import { ProductCard } from "@/components/ProductCard";
import { useLocale } from "@/components/providers";

export function ShopGrid() {
  const { lang, d } = useLocale();
  const router = useRouter();
  const params = useSearchParams();
  const category = params.get("category") ?? "";
  const occasion = params.get("occasion") ?? "";
  const collection = params.get("collection") ?? "";

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== "collection") next.delete("collection");
    const qs = next.toString();
    router.replace(`/${lang}/shop${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  const list = products.filter(
    (p) => (!category || p.category === category) && (!occasion || p.occasions.includes(occasion)) && (!collection || p.collection === collection),
  );

  const filter = (label: string, value: string, items: { id: string; name: Record<string, string> }[], k: string) => (
    <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:gap-6">
      <p className="label shrink-0 md:w-28">{label}</p>
      <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0" role="group" aria-label={label}>
        <button type="button" className="chip shrink-0" aria-pressed={!value} onClick={() => set(k, "")}>
          {d.shop.all}
        </button>
        {items.map((it) => (
          <button key={it.id} type="button" className="chip shrink-0 whitespace-nowrap" aria-pressed={value === it.id} onClick={() => set(k, value === it.id ? "" : it.id)}>
            {it.name[lang]}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="sr-only">{d.shop.eyebrow}</h2>
      <div className="flex flex-col gap-5 border-y border-line py-6">
        {filter(d.shop.categories, category, categories, "category")}
        {filter(d.shop.occasions, occasion, occasions, "occasion")}
      </div>
      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {fill(d.shop.count, { n: list.length })}
      </p>
      {list.length === 0 ? (
        <p className="py-24 text-center text-muted">{d.shop.empty}</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-8 lg:grid-cols-3 lg:gap-y-16">
          {list.map((p, i) => (
            <ProductCard key={p.id} p={p} lang={lang} d={d} eager={i < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
