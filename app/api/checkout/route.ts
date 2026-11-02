import Stripe from "stripe";
import { getProduct, pricesConfirmed, unitPrice, zones } from "@/lib/catalog";
import { describeSelection } from "@/lib/catalog";
import { getDict } from "@/lib/i18n";
import { parseLang, parseOrder } from "@/lib/validate";

// Paiement par carte (Stripe Checkout). Désactivé tant que :
//   NEXT_PUBLIC_PAYMENT_MODE=stripe, STRIPE_SECRET_KEY et pricesConfirmed=true (data/products.json) ne sont pas réunis.
// Les prix sont toujours recalculés ici, côté serveur, à partir de products.json.
// Pour Cardcom / Tranzila / Grow : remplacer ce fichier par l'appel au prestataire choisi.

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (process.env.NEXT_PUBLIC_PAYMENT_MODE !== "stripe" || !secret || !pricesConfirmed) {
    return Response.json({ error: "payment-disabled" }, { status: 503 });
  }
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  const lang = parseLang(body?.lang);
  const order = parseOrder(body?.order);
  if (!order) return Response.json({ error: "invalid" }, { status: 400 });
  const d = getDict(lang);
  const origin = new URL(req.url).origin;

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = order.items.map((it) => {
    const p = getProduct(it.productId)!;
    return {
      quantity: it.qty,
      price_data: {
        currency: "ils",
        unit_amount: unitPrice(p, it.selection, it.addons) * 100,
        product_data: { name: p.name[lang], description: describeSelection(p, it.selection, d).join(" · ") || undefined },
      },
    };
  });
  const fee = order.mode === "pickup" ? 0 : zones.find((z) => z.id === order.zone)?.fee;
  if (fee) line_items.push({ quantity: 1, price_data: { currency: "ils", unit_amount: fee * 100, product_data: { name: d.checkout.fee } } });

  const stripe = new Stripe(secret);
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    customer_email: order.email || undefined,
    locale: lang === "he" ? "auto" : lang,
    metadata: { ref: String(body?.ref ?? "").slice(0, 20), date: order.date, slot: order.slot, phone: order.phone },
    success_url: `${origin}/${lang}?order=success`,
    cancel_url: `${origin}/${lang}/checkout`,
  });
  return Response.json({ url: session.url });
}
