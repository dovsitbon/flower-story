import Image from "next/image";
import Link from "next/link";
import { categoryName, formatPrice, pricesConfirmed, type Product } from "@/lib/catalog";
import { fill, type Dict, type Locale } from "@/lib/i18n";

export function ProductCard({ p, lang, d, eager = false }: { p: Product; lang: Locale; d: Dict; eager?: boolean }) {
  const soldOut = p.stock === 0;
  const second = p.images[1];
  return (
    <Link href={`/${lang}/shop/${p.id}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-blush">
        <Image
          src={p.images[0]}
          alt={p.name[lang]}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 50vw"
          quality={70}
          loading={eager ? "eager" : "lazy"}
          className={`object-cover transition-[transform,opacity] duration-[1.4s] ease-[var(--ease-soft)] group-hover:scale-[1.03] ${second ? "group-hover:opacity-0" : ""}`}
        />
        {second && (
          <Image src={second} alt="" fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 50vw" quality={70} className="object-cover opacity-0 transition-opacity duration-[1.2s] ease-[var(--ease-soft)] group-hover:opacity-100" />
        )}
        {(soldOut || p.stock !== null) && (
          <span className="absolute start-3 top-3 bg-ivory/90 px-2.5 py-1 text-[0.6875rem] tracking-[0.08em] text-wine">
            {soldOut ? d.shop.soldOut : `${d.shop.limited} · ${fill(d.shop.left, { n: p.stock! })}`}
          </span>
        )}
      </div>
      <div className="mt-4 flex flex-col gap-1.5">
        <p className="text-[0.6875rem] tracking-[0.14em] text-muted uppercase rtl:tracking-normal rtl:normal-case">{categoryName(p.category, lang)}</p>
        <h3 className="display text-[1.35rem] leading-tight md:text-2xl">{p.name[lang]}</h3>
        <p className="text-sm text-wine">{pricesConfirmed ? `${d.shop.from}${formatPrice(p.priceFrom, lang)}` : d.shop.onRequest}</p>
      </div>
    </Link>
  );
}
