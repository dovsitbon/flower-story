import site from "@/data/site.json";
import type { Dict, Locale } from "@/lib/i18n";
import { addons as allAddons, describeSelection, formatPrice, getAddon, getProduct, pricesConfirmed, unitPrice, zones, type Selection } from "@/lib/catalog";

export type CartItem = { key: string; productId: string; qty: number; selection: Selection; word: string; addons: string[] };

export type Order = {
  items: CartItem[];
  name: string;
  phone: string;
  email: string;
  mode: "delivery" | "pickup";
  zone: string;
  address: string;
  city: string;
  date: string;
  slot: string;
  gift: boolean;
  recipientName: string;
  recipientPhone: string;
  card: string;
  notes: string;
};

export type Inquiry = { name: string; phone: string; type: string; date: string; guests: string; message: string };

export const waLink = (text: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export function lineTotal(item: CartItem) {
  const p = getProduct(item.productId);
  return p ? unitPrice(p, item.selection, item.addons) * item.qty : 0;
}

export function orderTotals(order: Pick<Order, "items" | "mode" | "zone">) {
  const subtotal = order.items.reduce((s, i) => s + lineTotal(i), 0);
  const fee = order.mode === "pickup" ? 0 : zones.find((z) => z.id === order.zone)?.fee ?? null;
  return { subtotal, fee, total: fee === null ? null : subtotal + fee };
}

export function itemLines(item: CartItem, lang: Locale, d: Dict) {
  const p = getProduct(item.productId);
  if (!p) return [];
  const lines = [`${item.qty} × ${p.name[lang]}`];
  for (const s of describeSelection(p, item.selection, d)) lines.push(`   ${s}`);
  if (item.word) lines.push(`   ${d.cart.word}: "${item.word}"`);
  const extras = item.addons.map((id) => getAddon(id)?.name[lang]).filter(Boolean);
  if (extras.length) lines.push(`   ${d.cart.addons}: ${extras.join(", ")}`);
  if (pricesConfirmed) lines.push(`   ${formatPrice(lineTotal(item), lang)}`);
  return lines;
}

export function orderMessage(order: Order, lang: Locale, d: Dict, ref?: string) {
  const c = d.checkout;
  const out: string[] = [`*${d.whatsapp.orderTitle}*${ref ? ` · ${ref}` : ""}`, ""];
  for (const item of order.items) out.push(...itemLines(item, lang, d), "");

  out.push(`*${c.delivery}*: ${order.mode === "pickup" ? c.modePickup : c.modeDelivery}`);
  if (order.mode === "delivery") {
    const zone = zones.find((z) => z.id === order.zone);
    if (zone) out.push(`${c.zone}: ${zone.name[lang]}`);
    out.push(`${c.address}: ${order.address}${order.city ? `, ${order.city}` : ""}`);
  }
  out.push(`${c.date}: ${order.date} · ${order.slot}`);

  if (order.gift) {
    out.push("", `*${c.gift}*`, `${c.recipientName}: ${order.recipientName}`, `${c.recipientPhone}: ${order.recipientPhone}`);
  }
  if (order.card) out.push("", `${c.card}: "${order.card}"`);
  if (order.notes) out.push(`${c.notes}: ${order.notes}`);

  out.push("", `*${c.you}*`, `${c.name}: ${order.name}`, `${c.phone}: ${order.phone}`);
  if (order.email) out.push(`Email: ${order.email}`);

  if (pricesConfirmed) {
    const t = orderTotals(order);
    out.push("", `${d.cart.subtotal}:${formatPrice(t.subtotal, lang)}`);
    out.push(`${c.fee}: ${t.fee === null ? c.feeOnRequest : formatPrice(t.fee, lang)}`);
    if (t.total !== null) out.push(`*${c.total}: ${formatPrice(t.total, lang)}*`);
  }
  return out.join("\n");
}

export function inquiryMessage(q: Inquiry, d: Dict) {
  const f = d.events.form;
  return [
    `*${d.whatsapp.eventTitle}*`,
    "",
    `${f.name}: ${q.name}`,
    `${f.phone}: ${q.phone}`,
    `${f.type}: ${q.type}`,
    q.date && `${f.date}: ${q.date}`,
    q.guests && `${f.guests}: ${q.guests}`,
    q.message && `${f.message}: ${q.message}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export const isValidAddon = (id: string) => allAddons.some((a) => a.id === id);
