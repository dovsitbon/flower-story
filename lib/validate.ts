import { getProduct, isValidChoice } from "@/lib/catalog";
import { isLocale, type Locale } from "@/lib/i18n";
import { isValidAddon, type CartItem, type Inquiry, type Order } from "@/lib/order";

const str = (v: unknown, max = 300) => (typeof v === "string" ? v.slice(0, max).trim() : "");

export function parseLang(v: unknown): Locale {
  return typeof v === "string" && isLocale(v) ? v : "he";
}

export function parseOrder(raw: unknown): Order | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  if (!Array.isArray(r.items) || r.items.length === 0 || r.items.length > 30) return null;
  const items: CartItem[] = [];
  for (const it of r.items as Record<string, unknown>[]) {
    const p = getProduct(str(it?.productId, 80));
    if (!p) return null;
    const selection: Record<string, string> = {};
    const sel = (it.selection ?? {}) as Record<string, unknown>;
    for (const [k, v] of Object.entries(sel)) if (isValidChoice(p, k, str(v, 20))) selection[k] = str(v, 20);
    const addons = Array.isArray(it.addons) ? (it.addons as unknown[]).map((a) => str(a, 40)).filter(isValidAddon) : [];
    const qty = Math.max(1, Math.min(20, Number(it.qty) || 1));
    items.push({ key: "", productId: p.id, qty, selection, word: p.personalWord ? str(it.word, 40) : "", addons });
  }
  const order: Order = {
    items,
    name: str(r.name, 120),
    phone: str(r.phone, 30),
    email: str(r.email, 160),
    mode: r.mode === "pickup" ? "pickup" : "delivery",
    zone: str(r.zone, 40),
    address: str(r.address, 200),
    city: str(r.city, 80),
    date: str(r.date, 10),
    slot: str(r.slot, 20),
    gift: r.gift === true,
    recipientName: str(r.recipientName, 120),
    recipientPhone: str(r.recipientPhone, 30),
    card: str(r.card, 300),
    notes: str(r.notes, 500),
  };
  if (!order.name || !order.phone) return null;
  return order;
}

export function parseInquiry(raw: unknown): Inquiry | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const q = { name: str(r.name, 120), phone: str(r.phone, 30), type: str(r.type, 60), date: str(r.date, 10), guests: str(r.guests, 10), message: str(r.message, 1000) };
  return q.name && q.phone ? q : null;
}

export const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
