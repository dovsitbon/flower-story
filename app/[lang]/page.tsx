import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import site from "@/data/site.json";
import reviewsData from "@/data/reviews.json";
import { getDict, isLocale, type Locale } from "@/lib/i18n";
import { getProduct } from "@/lib/catalog";
import { waLink } from "@/lib/order";
import { floristJsonLd, jsonLd, pageMeta } from "@/lib/seo";
import { FlowerMark } from "@/components/Logo";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { EventForm } from "@/components/EventForm";
import { ArrowIcon, InstagramIcon, WhatsAppIcon } from "@/components/icons";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const d = getDict(lang);
  return { ...pageMeta(lang, "", d.meta.homeTitle, d.meta.homeDescription), title: { absolute: d.meta.homeTitle } };
}

const FEATURED = ["red-roses-signature", "dream-balloon-bouquet", "dessert-hearts", "powder-roses-pearls", "hatbox-heart-balloon", "white-orchid-heart"];
const UPCLOSE = ["/media/hero/hero-063.jpg", "/media/roses/roses-073.jpg", "/media/roses/roses-056.jpg", "/media/roses/roses-059.jpg", "/media/roses/roses-054.jpg"];

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang: raw } = await params;
  const lang = raw as Locale;
  const d = getDict(lang);
  const featured = FEATURED.map((id) => getProduct(id)!).filter(Boolean);
  const reviews = reviewsData.reviews.filter((r) => r.published);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(floristJsonLd(lang))} />

      {/* HERO */}
      <section className="relative flex h-svh min-h-[620px] items-end justify-center overflow-hidden bg-ink text-ivory">
        <Image src="/media/hero/hero-027.jpg" alt={d.hero.alt} fill preload sizes="100vw" quality={80} className="object-cover object-[50%_45%]" />
        <div className="absolute inset-0 bg-ink/35" aria-hidden="true" />
        <div className="relative z-10 flex flex-col items-center px-6 pb-[14vh] text-center">
          <p className="eyebrow-latin mb-7 text-[0.625rem] md:text-[0.6875rem]" dir="ltr">
            {d.hero.eyebrow.split(" · ").map((part, i) => (
              <span key={part} className="block sm:inline">
                {i > 0 && <span className="mx-3 hidden sm:inline" aria-hidden="true">·</span>}
                {part}
              </span>
            ))}
          </p>
          <h1 className="display max-w-5xl text-[clamp(2.9rem,8.5vw,7.5rem)]">{d.hero.title}</h1>
          <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
            <Link href={`/${lang}/shop`} className="btn-line on-dark min-w-48">
              {d.hero.cta}
            </Link>
            <a href={waLink(d.whatsapp.hello)} target="_blank" rel="noopener noreferrer" className="link-line text-sm tracking-[0.08em]">
              {d.hero.whatsapp}
            </a>
          </div>
        </div>
        <span className="absolute bottom-0 left-1/2 h-12 w-px -translate-x-1/2 bg-ivory/60" aria-hidden="true" />
      </section>

      {/* MANIFESTE */}
      <section className="px-6 py-28 md:py-44">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <FlowerMark className="mb-10 h-9 w-9 text-wine" />
          <p className="eyebrow mb-8 text-muted">{d.manifesto.eyebrow}</p>
          <h2 className="display text-[clamp(2rem,4.4vw,3.5rem)]">{d.manifesto.title}</h2>
          <p className="mt-10 max-w-xl text-[1.0625rem] leading-[1.9] text-muted">{d.manifesto.body}</p>
          {d.abroad && <p className="display mt-10 text-xl text-wine italic">{d.abroad}</p>}
        </Reveal>
      </section>

      {/* COLLECTIONS SIGNATURES */}
      <section id="collections" className="scroll-mt-28 px-6 pb-28 md:px-10 md:pb-44">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-14 flex items-end justify-between gap-6 border-b border-line pb-6 md:mb-20">
            <div>
              <p className="eyebrow mb-4 text-muted">{d.signature.eyebrow}</p>
              <h2 className="display text-4xl md:text-6xl">{d.signature.title}</h2>
            </div>
            <Link href={`/${lang}/shop`} className="nav-link hidden items-center gap-3 hover:opacity-60 sm:flex">
              {d.signature.viewAll}
              <ArrowIcon />
            </Link>
          </Reveal>
          <div className="grid gap-16 md:grid-cols-3 md:gap-8">
            {d.signature.items.map((it, i) => (
              <Reveal key={it.title} delay={i * 0.12}>
                <Link href={`/${lang}/shop?category=${it.category}`} className="group block">
                  <p className="mb-5 font-[family-name:var(--font-jost)] text-sm tracking-[0.3em] text-wine">{String(i + 1).padStart(3, "0")}</p>
                  <div className="relative aspect-[3/4] overflow-hidden bg-blush">
                    <Image src={it.image} alt={it.title} fill sizes="(min-width: 768px) 32vw, 100vw" quality={70} className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-soft)] group-hover:scale-[1.04]" />
                  </div>
                  <h3 className="display mt-7 text-3xl">{it.title}</h3>
                  <p className="mt-3 max-w-sm leading-relaxed text-muted">{it.text}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BOUTIQUE */}
      <section className="bg-blush px-6 py-28 md:px-10 md:py-40">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto mb-16 max-w-2xl text-center md:mb-24">
            <p className="eyebrow mb-5 text-muted">{d.shop.eyebrow}</p>
            <h2 className="display text-4xl md:text-6xl">{d.shop.title}</h2>
            <p className="mt-6 leading-relaxed text-muted">{d.shop.intro}</p>
          </Reveal>
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-8 lg:grid-cols-3 lg:gap-y-16">
            {featured.map((p) => (
              <ProductCard key={p.id} p={p} lang={lang} d={d} />
            ))}
          </div>
          <div className="mt-20 text-center">
            <Link href={`/${lang}/shop`} className="btn-line">
              {d.shop.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* PLEINE LARGEUR */}
      <section className="relative flex min-h-[88svh] items-center justify-center overflow-hidden text-ivory">
        <Image src="/media/coeurs-compositions/coeurs-compositions-082.jpg" alt={d.statement.alt} fill sizes="100vw" quality={70} className="object-cover object-[50%_40%]" />
        <div className="absolute inset-0 bg-ink/30" aria-hidden="true" />
        <Reveal className="relative z-10 px-6 text-center">
          <h2 className="display text-[clamp(3.4rem,12vw,10rem)]">{d.statement.title}</h2>
          <p className="mx-auto mt-6 max-w-md text-[1.0625rem] leading-relaxed">{d.statement.text}</p>
          <Link href={`/${lang}/shop?category=hearts`} className="btn-line on-dark mt-10">
            {d.statement.cta}
          </Link>
        </Reveal>
      </section>

      {/* HISTOIRE */}
      <section id="story" className="scroll-mt-28 px-6 py-28 md:px-10 md:py-44">
        <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2 md:gap-24">
          <Reveal>
            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden bg-blush">
              <Image src="/media/hero/shir-portrait.jpg" alt={d.story.alt} fill sizes="(min-width: 768px) 40vw, 100vw" quality={70} className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="eyebrow mb-5 text-muted">{d.story.eyebrow}</p>
            <h2 className="display text-4xl md:text-5xl">{d.story.title}</h2>
            <p className="mt-8 text-[1.0625rem] leading-[1.9] text-muted">{d.story.body}</p>
            <p className="display mt-8 text-3xl text-wine">{lang === "he" ? "שיר" : "Shir"}</p>
          </Reveal>
        </div>
      </section>

      {/* ÉVÉNEMENTS ET ATELIERS */}
      <section id="events" className="scroll-mt-28 border-t border-line px-6 py-28 md:px-10 md:py-40">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1fr_1.2fr] md:gap-24">
          <Reveal>
            <p className="eyebrow mb-5 text-muted">{d.events.eyebrow}</p>
            <h2 className="display text-4xl md:text-5xl">{d.events.title}</h2>
            <p className="mt-8 leading-[1.9] text-muted">{d.events.text}</p>
            <ul className="mt-10 divide-y divide-line border-y border-line">
              {d.events.items.map((it, i) => (
                <li key={it} className="flex items-baseline gap-5 py-4">
                  <span className="font-[family-name:var(--font-jost)] text-xs tracking-[0.3em] text-wine">{String(i + 1).padStart(3, "0")}</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">{d.events.form.quote}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <EventForm />
          </Reveal>
        </div>
      </section>

      {/* DE PRÈS */}
      <section className="bg-blush px-6 py-28 md:px-10 md:py-40">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-14 max-w-xl md:mb-20">
            <p className="eyebrow mb-5 text-muted">{d.upclose.eyebrow}</p>
            <h2 className="display text-4xl md:text-6xl">{d.upclose.title}</h2>
            <p className="mt-6 leading-relaxed text-muted">{d.upclose.text}</p>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {UPCLOSE.map((src, i) => (
              <Reveal key={src} delay={i * 0.08} className={i === 0 ? "col-span-2 md:row-span-2" : ""}>
                <div className={`relative overflow-hidden bg-ivory ${i === 0 ? "aspect-[4/5] md:aspect-auto md:h-full" : "aspect-[4/5]"}`}>
                  <Image src={src} alt={`${d.upclose.alt} ${i + 1}`} fill sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"} quality={70} className="object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AVIS : affichés seulement quand data/reviews.json contient de vrais avis publiés */}
      {reviews.length > 0 && (
        <section className="px-6 py-28 md:py-40">
          <div className="mx-auto max-w-5xl text-center">
            <p className="eyebrow mb-5 text-muted">{d.reviews.eyebrow}</p>
            <h2 className="display text-4xl md:text-5xl">{d.reviews.title}</h2>
            <div className="mt-16 grid gap-12 md:grid-cols-3">
              {reviews.map((r, i) => (
                <figure key={i}>
                  <blockquote className="display text-xl leading-relaxed">{r.text[lang]}</blockquote>
                  <figcaption className="eyebrow mt-5 text-muted">{r.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LIVRAISON ET INFOS */}
      <section id="info" className="scroll-mt-28 px-6 py-28 md:px-10 md:py-40">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-14 md:mb-20">
            <p className="eyebrow mb-5 text-muted">{d.info.eyebrow}</p>
            <h2 className="display text-4xl md:text-6xl">{d.info.title}</h2>
          </Reveal>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {d.info.items.map((it, i) => (
              <Reveal key={it.title} delay={i * 0.08} className="border-t border-line pt-6">
                <p className="mb-4 font-[family-name:var(--font-jost)] text-xs tracking-[0.3em] text-wine">{String(i + 1).padStart(3, "0")}</p>
                <h3 className="display text-2xl">{it.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{it.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-28 border-t border-line px-6 py-28 md:py-44">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="eyebrow mb-6 text-muted">{d.contact.eyebrow}</p>
          <h2 className="display text-[clamp(2.6rem,7vw,5.5rem)]">{d.contact.title}</h2>
          <p className="mt-8 max-w-md leading-relaxed text-muted">{d.contact.text}</p>
          <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
            <a href={waLink(d.whatsapp.hello)} target="_blank" rel="noopener noreferrer" className="btn-line">
              <WhatsAppIcon className="h-4 w-4" />
              <span dir="ltr">{site.phoneDisplay}</span>
            </a>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:opacity-60">
              <InstagramIcon />
              <span dir="ltr">{site.instagramHandle}</span>
            </a>
          </div>
          <p className="mt-10 text-sm text-muted">{d.contact.area}</p>
        </Reveal>
      </section>
    </>
  );
}
