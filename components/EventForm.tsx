"use client";

import { useState, type FormEvent } from "react";
import { inquiryMessage, waLink, type Inquiry } from "@/lib/order";
import { goTo } from "@/lib/browser";
import { useLocale } from "@/components/providers";

const PHONE = /^[+\d][\d\s-]{7,16}$/;

export function EventForm() {
  const { lang, d } = useLocale();
  const f = d.events.form;
  const [q, setQ] = useState<Inquiry>({ name: "", phone: "", type: f.types[0], date: "", guests: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Inquiry, string>>>({});
  const set = (k: keyof Inquiry) => (e: { target: { value: string } }) => setQ((v) => ({ ...v, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!q.name.trim()) errs.name = d.checkout.errors.required;
    if (!PHONE.test(q.phone.trim())) errs.phone = d.checkout.errors.phone;
    setErrors(errs);
    if (Object.keys(errs).length) return;
    fetch("/api/notify", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ type: "event", lang, inquiry: q }), keepalive: true }).catch(() => {});
    goTo(waLink(inquiryMessage(q, d)));
  };

  const err = (k: keyof Inquiry) =>
    errors[k] ? (
      <p id={`ev-${k}-err`} className="mt-1 text-xs text-wine">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={submit} noValidate className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
      <label className="block">
        <span className="label">{f.name}</span>
        <input className="field" value={q.name} onChange={set("name")} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "ev-name-err" : undefined} />
        {err("name")}
      </label>
      <label className="block">
        <span className="label">{f.phone}</span>
        <input className="field" type="tel" dir="ltr" value={q.phone} onChange={set("phone")} autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "ev-phone-err" : undefined} />
        {err("phone")}
      </label>
      <label className="block">
        <span className="label">{f.type}</span>
        <select className="field" value={q.type} onChange={set("type")}>
          {f.types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="label">{f.date}</span>
        <input className="field" type="date" value={q.date} onChange={set("date")} />
      </label>
      <label className="block">
        <span className="label">{f.guests}</span>
        <input className="field" inputMode="numeric" value={q.guests} onChange={set("guests")} />
      </label>
      <label className="block sm:col-span-2">
        <span className="label">{f.message}</span>
        <textarea className="field min-h-24 resize-y" rows={3} value={q.message} onChange={set("message")} />
      </label>
      <div className="sm:col-span-2">
        <button type="submit" className="btn-line">
          {f.submit}
        </button>
      </div>
    </form>
  );
}
