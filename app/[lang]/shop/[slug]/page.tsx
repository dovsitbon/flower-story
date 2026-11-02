import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, isLocale, locales, type Locale } from "@/lib/i18n";
import { categoryName, getProduct, products } from "@/lib/catalog";
import { jsonLd, pageMeta, productJsonLd } from "@/lib/seo";
import { ProductView } from "@/components/ProductView";
import { ProductCard } from "@/components/ProductCard";
import { ArrowIcon } from "@/components/icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => products.map((p) => ({ lang, slug: p.id })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/shop/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = getProduct(slug);
  if (!p || !isLocale(lang)) return {};
  const d = getDict(lang);
  const title = `${p.name[lang]} | ${d.meta.productSuffix}`;
  return { ...pageMeta(lang, `/shop/${p.id}`, title, p.description[lang], p.images[0]), title: { absolute: title } };
}

export default async function ProductPage({ params }: PageProps<"/[lang]/shop/[slug]">) {
  const { lang: raw, slug } = await params;
  const lang = raw as Locale;
  const p = getProduct(slug);
  if (!p) notFound();
  const d = getDict(lang);
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 3);
  const fill = related.length < 3 ? products.filter((x) => x.id !== p.id && !related.includes(x) && x.occasions.some((o) => p.occasions.includes(o))).slice(0, 3 - related.length) : [];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(productJsonLd(p, lang))} />
      <div className="px-0 pt-[6.25rem] md:px-10 md:pt-36">
        <nav className="mx-auto mb-6 hidden max-w-7xl items-center gap-3 text-xs text-muted md:flex" aria-label="breadcrumb">
          <Link href={`/${lang}/shop`} className="flex items-center gap-2 hover:text-ink">
            <ArrowIcon className="h-3.5 w-3.5 rotate-180 rtl:rotate-0" />
            {d.product.back}
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={`/${lang}/shop?category=${p.category}`} className="hover:text-ink">
            {categoryName(p.category, lang)}
          </Link>
        </nav>
        <ProductView id={p.id} />
      </div>

      {[...related, ...fill].length > 0 && (
        <section className="mt-28 border-t border-line px-6 py-24 md:mt-40 md:px-10">
          <div className="mx-auto max-w-7xl">
            <h2 className="display mb-12 text-3xl md:text-4xl">{d.product.related}</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-8 lg:grid-cols-3">
              {[...related, ...fill].map((x) => (
                <ProductCard key={x.id} p={x} lang={lang} d={d} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
