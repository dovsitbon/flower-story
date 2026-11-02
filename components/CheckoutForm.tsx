"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { describeSelection, formatPrice, getProduct, pricesConfirmed, zones } from "@/lib/catalog";
import { dateProblem, earliestDate, minLeadHours, slotsFor } from "@/lib/delivery";
import { fill } from "@/lib/i18n";
import { lineTotal, orderMessage, orderTotals, waLink, type Order } from "@/lib/order";
import { goTo, newOrderRef } from "@/lib/browser";
import { DELIVERY_KEY } from "@/components/ProductView";
import { useCart, useLocale } from "@/components/providers";

const PHONE = /^[+\d][\d\s-]{7,16}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cardEnabled = process.env.NEXT_PUBLIC_PAYMENT_MODE === "stripe" && pricesConfirmed;

type Errors = Partial<Record<keyof Order, string>>;

export function CheckoutForm() {
  const { lang, d } = useLocale();
  const c = d.checkout;
  const { items, ready, clear } = useCart();
  const [o, setO] = useState<Omit<Order, "items">>({
    name: "", phone: "", email: "", mode: "delivery", zone: zones[0].id, address: "", city: "", date: "", slot: "",
    gift: false, recipientName: "", recipientPhone: "", card: "", notes: "",
  });
  const [pay, setPay] = useState<"whatsapp" | "card">("whatsapp");
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [done, setDone] = useState(false);
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- dépend de l'heure locale et du stockage du visiteur
    setMinDate(earliestDate());
    try {
      const saved = JSON.parse(localStorage.getItem(DELIVERY_KEY) ?? "{}") as { date?: string; slot?: string };
      if (saved.date && !dateProblem(saved.date)) setO((v) => ({ ...v, date: saved.date!, slot: saved.slot ?? "" }));
    } catch {}
  }, []);

  const set = <K extends keyof typeof o>(k: K, v: (typeof o)[K]) => setO((x) => ({ ...x, [k]: v }));
  const order: Order = { ...o, items };
  const totals = orderTotals(order);
  const slots = useMemo(() => slotsFor(o.date), [o.date]);

  const validate = () => {
    const e: Errors = {};
    const req = c.errors.required;
    if (!o.name.trim()) e.name = req;
    if (!PHONE.test(o.phone.trim())) e.phone = c.errors.phone;
    if (o.email && !EMAIL.test(o.email.trim())) e.email = c.errors.email;
    if (o.mode === "delivery" && !o.address.trim()) e.address = req;
    if (!o.date) e.date = req;
    else {
      const pb = dateProblem(o.date);
      if (pb === "closed") e.date = c.errors.closed;
      if (pb === "lead") e.date = fill(c.errors.lead, { h: minLeadHours });
    }
    if (!o.slot) e.slot = req;
    if (o.gift) {
      if (!o.recipientName.trim()) e.recipientName = req;
      if (!PHONE.test(o.recipientPhone.trim())) e.recipientPhone = c.errors.phone;
    }
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) document.getElementById(`co-${first}`)?.focus();
    return !first;
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSending(true);
    setFailed(false);
    const ref = newOrderRef();
    try {
      if (pay === "card") {
        const res = await fetch("/api/checkout", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ lang, order, ref }) });
        const data = (await res.json()) as { url?: string };
        if (!res.ok || !data.url) throw new Error("checkout");
        goTo(data.url);
        return;
      }
      fetch("/api/notify", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ type: "order", lang, order, ref }), keepalive: true }).catch(() => {});
      const link = waLink(orderMessage(order, lang, d, ref));
      clear();
      setDone(true);
      goTo(link);
    } catch {
      setFailed(true);
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center">
        <h1 className="display text-5xl">{c.done}</h1>
        <p className="mt-6 leading-relaxed text-muted">{c.doneText}</p>
        <Link href={`/${lang}`} className="btn-line mt-10">{d.nav.home}</Link>
      </div>
    );
  }

  if (ready && items.length === 0) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center">
        <h1 className="display text-5xl">{c.title}</h1>
        <p className="mt-6 text-muted">{c.emptyCart}</p>
        <Link href={`/${lang}/shop`} className="btn-line mt-10">{d.cart.continue}</Link>
      </div>
    );
  }

  const field = (k: keyof typeof o, label: string, input: ReactNode, wide = false) => (
    <label className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <span className="label">{label}</span>
      {input}
      {errors[k] && <span id={`co-${k}-err`} className="mt-1 block text-xs text-wine">{errors[k]}</span>}
    </label>
  );
  const aria = (k: keyof typeof o) => ({ id: `co-${k}`, name: k, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `co-${k}-err` : undefined });

  return (
    <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.3fr_1fr] lg:gap-24">
      <form onSubmit={submit} noValidate className="flex flex-col gap-14">
        <h1 className="display text-5xl md:text-6xl">{c.title}</h1>

        <section className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
          <h2 className="eyebrow text-muted sm:col-span-2">{c.you}</h2>
          {field("name", c.name, <input className="field" autoComplete="name" value={o.name} onChange={(e) => set("name", e.target.value)} {...aria("name")} />)}
          {field("phone", c.phone, <input className="field" type="tel" dir="ltr" autoComplete="tel" value={o.phone} onChange={(e) => set("phone", e.target.value)} {...aria("phone")} />)}
          {field("email", c.email, <input className="field" type="email" dir="ltr" autoComplete="email" spellCheck={false} value={o.email} onChange={(e) => set("email", e.target.value)} {...aria("email")} />, true)}
        </section>

        <section className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
          <h2 className="eyebrow text-muted sm:col-span-2">{c.delivery}</h2>
          <div className="flex gap-2 sm:col-span-2" role="radiogroup" aria-label={c.delivery}>
            {(["delivery", "pickup"] as const).map((m) => (
              <button key={m} type="button" role="radio" aria-checked={o.mode === m} className="chip flex-1 py-3" onClick={() => set("mode", m)}>
                {m === "delivery" ? c.modeDelivery : c.modePickup}
              </button>
            ))}
          </div>
          {o.mode === "delivery" ? (
            <>
              {field("zone", c.zone,
                <select className="field" value={o.zone} onChange={(e) => set("zone", e.target.value)} {...aria("zone")}>
                  {zones.map((z) => (
                    <option key={z.id} value={z.id}>
                      {z.name[lang]}
                      {pricesConfirmed && z.fee !== null ? ` · ${formatPrice(z.fee, lang)}` : ""}
                    </option>
                  ))}
                </select>, true)}
              {field("address", c.address, <input className="field" autoComplete="street-address" value={o.address} onChange={(e) => set("address", e.target.value)} {...aria("address")} />)}
              {field("city", c.city, <input className="field" autoComplete="address-level2" value={o.city} onChange={(e) => set("city", e.target.value)} {...aria("city")} />)}
            </>
          ) : (
            <p className="text-sm text-muted sm:col-span-2">{c.pickupNote}</p>
          )}
          {field("date", c.date,
            <input className="field" type="date" min={minDate || undefined} value={o.date} onChange={(e) => setO((x) => ({ ...x, date: e.target.value, slot: "" }))} {...aria("date")} />)}
          {field("slot", c.slot,
            <select className="field" value={o.slot} onChange={(e) => set("slot", e.target.value)} {...aria("slot")}>
              <option value="">{d.product.chooseSlot}</option>
              {slots.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>)}
        </section>

        <section className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
          <label className="flex cursor-pointer items-center gap-3 sm:col-span-2">
            <input type="checkbox" className="h-4 w-4 accent-[var(--color-wine)]" checked={o.gift} onChange={(e) => set("gift", e.target.checked)} />
            <span>{c.gift}</span>
          </label>
          {o.gift && (
            <>
              {field("recipientName", c.recipientName, <input className="field" value={o.recipientName} onChange={(e) => set("recipientName", e.target.value)} {...aria("recipientName")} />)}
              {field("recipientPhone", c.recipientPhone, <input className="field" type="tel" dir="ltr" value={o.recipientPhone} onChange={(e) => set("recipientPhone", e.target.value)} {...aria("recipientPhone")} />)}
            </>
          )}
          {field("card", c.card, <textarea className="field resize-y" rows={2} maxLength={300} value={o.card} onChange={(e) => set("card", e.target.value)} {...aria("card")} />, true)}
          {field("notes", c.notes, <textarea className="field resize-y" rows={2} maxLength={500} value={o.notes} onChange={(e) => set("notes", e.target.value)} {...aria("notes")} />, true)}
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="eyebrow text-muted">{c.payment}</h2>
          {cardEnabled && (
            <div className="flex gap-2" role="radiogroup" aria-label={c.payment}>
              <button type="button" role="radio" aria-checked={pay === "whatsapp"} className="chip flex-1 py-3" onClick={() => setPay("whatsapp")}>{c.payWhatsapp}</button>
              <button type="button" role="radio" aria-checked={pay === "card"} className="chip flex-1 py-3" onClick={() => setPay("card")}>{c.payCard}</button>
            </div>
          )}
          {pay === "whatsapp" && <p className="text-sm leading-relaxed text-muted">{c.payWhatsappNote}</p>}
          <button type="submit" className="btn-fill mt-2 w-full" disabled={sending || !ready}>
            {sending ? c.sending : pay === "card" ? c.submitCard : c.submit}
          </button>
          {failed && <p className="text-sm text-wine" role="alert">{c.errors.generic}</p>}
        </section>
      </form>

      <aside className="h-fit border border-line p-6 md:p-8 lg:sticky lg:top-36">
        <h2 className="eyebrow mb-6 text-muted">{c.summary}</h2>
        <ul className="divide-y divide-line">
          {items.map((item) => {
            const p = getProduct(item.productId)!;
            return (
              <li key={item.key} className="flex gap-4 py-4 text-sm">
                <Image src={p.images[0]} alt={p.name[lang]} width={64} height={80} className="h-20 w-16 shrink-0 object-cover" />
                <div className="flex-1">
                  <p>{item.qty} × {p.name[lang]}</p>
                  {describeSelection(p, item.selection, d).map((s) => <p key={s} className="text-muted">{s}</p>)}
                  {item.word && <p className="text-muted">{d.cart.word}: &quot;{item.word}&quot;</p>}
                </div>
                {pricesConfirmed && <span className="tabular-nums">{formatPrice(lineTotal(item), lang)}</span>}
              </li>
            );
          })}
        </ul>
        <div className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
          {pricesConfirmed ? (
            <>
              <p className="flex justify-between"><span>{d.cart.subtotal}</span><span className="tabular-nums">{formatPrice(totals.subtotal, lang)}</span></p>
              <p className="flex justify-between"><span>{c.fee}</span><span>{totals.fee === null ? c.feeOnRequest : formatPrice(totals.fee, lang)}</span></p>
              {totals.total !== null && <p className="flex justify-between pt-2 text-base"><span>{c.total}</span><span className="tabular-nums">{formatPrice(totals.total, lang)}</span></p>}
            </>
          ) : (
            <p className="text-muted">{d.cart.pricesNote}</p>
          )}
        </div>
      </aside>
    </div>
  );
}
