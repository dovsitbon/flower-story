import data from "@/data/products.json";
import type { Dict, Locale, Localized } from "@/lib/i18n";
import { fill } from "@/lib/i18n";

export type Choice = { id: string; delta?: number };
export type Option = { id: string; type: "choice" | "color"; choices: Choice[] };
type RawOption = { id: string; set?: string; type?: string; choices?: Choice[] };

export type Product = {
  id: string;
  category: string;
  occasions: string[];
  collection?: string;
  images: string[];
  name: Localized;
  description: Localized;
  priceFrom: number;
  options: RawOption[];
  personalWord: boolean;
  stock: number | null;
};

export type Addon = { id: string; price: number; image: string; name: Localized };
export type Zone = { id: string; fee: number | null; name: Localized };
export type Named = { id: string; name: Localized };
export type Collection = { id: string; from: string; to: string; image: string };

export const catalog = data;
export const products = data.products as Product[];
export const categories = data.categories as Named[];
export const occasions = data.occasions as Named[];
export const addons = data.addons as Addon[];
export const zones = data.delivery.zones as Zone[];
export const pricesConfirmed = data.pricesConfirmed as boolean;

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getAddon = (id: string) => addons.find((a) => a.id === id);

export function optionsOf(p: Product): Option[] {
  const sets = data.optionSets as Record<string, { type: string; choices: Choice[] }>;
  return p.options.map((o) => {
    const set = o.set ? sets[o.set] : undefined;
    return { id: o.id, type: (set?.type ?? o.type ?? "choice") as Option["type"], choices: set?.choices ?? o.choices ?? [] };
  });
}

export type Selection = Record<string, string>;

export const isValidChoice = (p: Product, optionId: string, choiceId: string) =>
  optionsOf(p).some((o) => o.id === optionId && o.choices.some((c) => c.id === choiceId));

export function defaultSelection(p: Product): Selection {
  return Object.fromEntries(optionsOf(p).map((o) => [o.id, o.choices[0]?.id ?? ""]));
}

export function unitPrice(p: Product, sel: Selection, addonIds: string[] = []) {
  let price = p.priceFrom;
  for (const o of optionsOf(p)) {
    const c = o.choices.find((x) => x.id === sel[o.id]);
    price += c?.delta ?? 0;
  }
  for (const id of addonIds) price += getAddon(id)?.price ?? 0;
  return price;
}

export function formatPrice(n: number, lang: Locale) {
  return new Intl.NumberFormat(lang === "he" ? "he-IL" : lang, { style: "currency", currency: "ILS", maximumFractionDigits: 0 }).format(n);
}

export function choiceLabel(optionId: string, choiceId: string, d: Dict) {
  const colors = d.colors as Record<string, string>;
  if (optionId === "roses") return fill(d.choices.roses, { n: choiceId });
  if (optionId === "hearts") return (d.choices.hearts as Record<string, string>)[choiceId] ?? choiceId;
  return colors[choiceId] ?? choiceId;
}

export function optionLabel(optionId: string, d: Dict) {
  return (d.options as Record<string, string>)[optionId] ?? optionId;
}

export function describeSelection(p: Product, sel: Selection, d: Dict) {
  return optionsOf(p)
    .filter((o) => sel[o.id])
    .map((o) => `${optionLabel(o.id, d)}: ${choiceLabel(o.id, sel[o.id], d)}`);
}

export const categoryName = (id: string, lang: Locale) => categories.find((c) => c.id === id)?.name[lang] ?? id;
export const occasionName = (id: string, lang: Locale) => occasions.find((c) => c.id === id)?.name[lang] ?? id;

export function activeCollection(today = new Date()): Collection | null {
  const { active, list } = data.collections as { active: string; list: Collection[] };
  if (active === "none") return null;
  if (active !== "auto") return list.find((c) => c.id === active) ?? null;
  const iso = today.toISOString().slice(0, 10);
  return list.find((c) => c.from <= iso && iso <= c.to) ?? null;
}
