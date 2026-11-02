import type { Metadata } from "next";
import site from "@/data/site.json";
import { getDict, locales, ogLocale, type Locale } from "@/lib/i18n";
import { formatPrice, pricesConfirmed, type Product } from "@/lib/catalog";

export function pageMeta(lang: Locale, path: string, title: string, description: string, image = "/og.jpg"): Metadata {
  const languages = Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])) as Record<string, string>;
  languages["x-default"] = `/he${path}`;
  return {
    title,
    description,
    alternates: { canonical: `/${lang}${path}`, languages },
    openGraph: {
      type: "website",
      siteName: "Flower Story Boutique",
      title,
      description,
      url: `/${lang}${path}`,
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export function floristJsonLd(lang: Locale) {
  const d = getDict(lang);
  return {
    "@context": "https://schema.org",
    "@type": "Florist",
    "@id": `${site.url}/#florist`,
    name: lang === "he" ? site.nameHe : site.name,
    alternateName: lang === "he" ? site.name : site.nameHe,
    description: d.meta.homeDescription,
    url: `${site.url}/${lang}`,
    image: `${site.url}/og.jpg`,
    logo: `${site.url}/logo.svg`,
    telephone: `+${site.whatsapp}`,
    sameAs: [site.instagram],
    priceRange: "₪₪₪",
    address: { "@type": "PostalAddress", addressLocality: site.city[lang], addressCountry: "IL", ...(site.address ? { streetAddress: site.address } : {}) },
    areaServed: [{ "@type": "City", name: site.city[lang] }, { "@type": "Country", name: "Israel" }],
    contactPoint: { "@type": "ContactPoint", telephone: `+${site.whatsapp}`, contactType: "customer service", availableLanguage: ["Hebrew", "English", "French", "Spanish"] },
  };
}

export function productJsonLd(p: Product, lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name[lang],
    description: p.description[lang],
    image: p.images.map((i) => `${site.url}${i}`),
    brand: { "@type": "Brand", name: site.name },
    url: `${site.url}/${lang}/shop/${p.id}`,
    ...(pricesConfirmed
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "ILS",
            price: p.priceFrom,
            availability: p.stock === 0 ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
            seller: { "@id": `${site.url}/#florist` },
            description: formatPrice(p.priceFrom, lang),
          },
        }
      : {}),
  };
}

export const jsonLd = (data: object) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") });
