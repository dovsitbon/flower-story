import { Resend } from "resend";
import site from "@/data/site.json";
import { getDict } from "@/lib/i18n";
import { inquiryMessage, orderMessage } from "@/lib/order";
import { escapeHtml, parseInquiry, parseLang, parseOrder } from "@/lib/validate";

// E-mails envoyés seulement si RESEND_API_KEY et ORDER_NOTIFY_EMAIL sont configurés (Vercel → Environment Variables).
// RESEND_FROM doit utiliser un domaine vérifié dans Resend, ex. « Flower Story <commandes@flowerstory.co.il> ».

const html = (text: string) =>
  `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#2A2224;white-space:pre-wrap">${escapeHtml(text).replace(/\*(.+?)\*/g, "<strong>$1</strong>")}</div>`;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const lang = parseLang(body.lang);
  const d = getDict(lang);
  const ref = typeof body.ref === "string" ? body.ref.slice(0, 20) : undefined;

  let shopSubject: string, shopText: string;
  let clientEmail = "";
  let clientText = "";

  if (body.type === "order") {
    const order = parseOrder(body.order);
    if (!order) return Response.json({ ok: false }, { status: 400 });
    shopSubject = `${d.email.subjectShop}${ref ? ` · ${ref}` : ""}`;
    shopText = orderMessage(order, lang, d, ref);
    clientEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(order.email) ? order.email : "";
    clientText = `${d.email.intro}\n\n${shopText}\n\nWhatsApp: ${site.phoneDisplay}\n${site.instagram}`;
  } else if (body.type === "event") {
    const q = parseInquiry(body.inquiry);
    if (!q) return Response.json({ ok: false }, { status: 400 });
    shopSubject = d.email.eventSubject;
    shopText = inquiryMessage(q, d);
  } else {
    return Response.json({ ok: false }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFY_EMAIL;
  if (!key || !to) return Response.json({ ok: true, emailed: false });

  const resend = new Resend(key);
  const from = process.env.RESEND_FROM ?? "Flower Story <onboarding@resend.dev>";
  try {
    await resend.emails.send({ from, to, subject: shopSubject, html: html(shopText), text: shopText });
    if (clientEmail) await resend.emails.send({ from, to: clientEmail, replyTo: to, subject: d.email.subjectClient, html: html(clientText), text: clientText });
    return Response.json({ ok: true, emailed: true });
  } catch {
    return Response.json({ ok: true, emailed: false });
  }
}
