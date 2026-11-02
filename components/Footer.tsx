import Link from "next/link";
import site from "@/data/site.json";
import { categories } from "@/lib/catalog";
import type { Dict, Locale } from "@/lib/i18n";
import { waLink } from "@/lib/order";
import { Logo } from "@/components/Logo";

export function Footer({ lang, d }: { lang: Locale; d: Dict }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-blush text-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-10">
        <div className="max-w-xs">
          <Logo lang={lang} className="text-[1rem]" />
          <p className="mt-6 text-sm leading-relaxed text-muted">{d.footer.tagline}</p>
        </div>
        <nav aria-label={d.footer.shop}>
          <h2 className="eyebrow mb-5 text-muted">{d.footer.shop}</h2>
          <ul className="space-y-3 text-sm">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/${lang}/shop?category=${c.id}`} className="hover:opacity-60">
                  {c.name[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={d.footer.info}>
          <h2 className="eyebrow mb-5 text-muted">{d.footer.info}</h2>
          <ul className="space-y-3 text-sm">
            <li><Link href={`/${lang}#events`} className="hover:opacity-60">{d.nav.events}</Link></li>
            <li><Link href={`/${lang}#story`} className="hover:opacity-60">{d.nav.story}</Link></li>
            <li><Link href={`/${lang}#info`} className="hover:opacity-60">{d.info.eyebrow}</Link></li>
            <li><Link href={`/${lang}#contact`} className="hover:opacity-60">{d.nav.contact}</Link></li>
          </ul>
        </nav>
        <div>
          <h2 className="eyebrow mb-5 text-muted">{d.footer.follow}</h2>
          <ul className="space-y-3 text-sm">
            <li><a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-60" dir="ltr">{site.instagramHandle}</a></li>
            <li><a href={waLink(d.whatsapp.hello)} target="_blank" rel="noopener noreferrer" className="hover:opacity-60" dir="ltr">{site.phoneDisplay}</a></li>
            <li className="text-muted">{d.contact.area}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-muted md:flex-row md:justify-between md:px-10">
          <p>© {year} Flower Story Boutique · {d.footer.rights}</p>
          <p>{d.footer.photos}</p>
        </div>
      </div>
    </footer>
  );
}
