import he from "@/locales/he.json";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import es from "@/locales/es.json";

export const locales = ["he", "en", "fr", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "he";
export type Dict = typeof he;

const dictionaries: Record<Locale, Dict> = { he, en, fr, es };

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);
export const getDict = (lang: Locale): Dict => dictionaries[lang];
export const dirOf = (lang: Locale) => (lang === "he" ? "rtl" : "ltr");

export const ogLocale: Record<Locale, string> = { he: "he_IL", en: "en_US", fr: "fr_FR", es: "es_ES" };

export function fill(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}

export type Localized = Record<Locale, string>;
