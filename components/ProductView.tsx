"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { addons, categoryName, choiceLabel, defaultSelection, formatPrice, getProduct, optionLabel, optionsOf, pricesConfirmed, unitPrice, type Selection } from "@/lib/catalog";
import { dateProblem, earliestDate, minLeadHours, slotsFor } from "@/lib/delivery";
import { fill } from "@/lib/i18n";
import { waLink } from "@/lib/order";
import { useCart, useLocale } from "@/components/providers";

export const DELIVERY_KEY = "flowerstory-delivery";
const WORD_MAX = 40;

export function ProductView({ id }: { id: string }) {
  const { lang, d } = useLocale();
  const { add, setOpen } = useCart();
  const p = getProduct(id)!;
  const options = optionsOf(p);
  const [sel, setSel] = useState<Selection>(() => defaultSelection(p));
  const [word, setWord] = useState("");
  const [extras, setExtras] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [minDate, setMinDate] = useState("");
  const [added, setAdded] = useState(false);
  const [active, setActive] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);
  const soldOut = p.stock === 0;

  useEffect(() => {
    const min = earliestDate();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- dépend de l'heure locale et du stockage du visiteur
    setMinDate(min);
    try {
      const saved = JSON.parse(localStorage.getItem(DELIVERY_KEY) ?? "{}") as { date?: string; slot?: string };
      if (saved.date && !dateProblem(saved.date)) {
        setDate(saved.date);
        setSlot(saved.slot ?? "");
      }
    } catch {}
  }, []);

  const problem = date ? dateProblem(date) : null;
  const slots = useMemo(() => slotsFor(date), [date]);
  const price = unitPrice(p, sel, extras);

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    setActive(Math.round(Math.abs(el.scrollLeft) / el.clientWidth));
  };

  const addToCart = () => {
    add({ productId: p.id, qty: 1, selection: sel, word: p.personalWord ? word.slice(0, WORD_MAX) : "", addons: extras });
    try {
      if (date && !problem) localStorage.setItem(DELIVERY_KEY, JSON.stringify({ date, slot }));
    } catch {}
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
    setOpen(true);
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.25fr_1fr] md:gap-16 lg:gap-24">
      {/* Galerie : carrousel sur mobile, photos empilées sur ordinateur */}
      <div>
        <div
          ref={scroller}
          onScroll={onScroll}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] md:grid md:snap-none md:grid-cols-2 md:gap-4 md:overflow-visible"
          aria-label={p.name[lang]}
        >
          {p.images.map((src, i) => (
            <div key={src} className={`relative aspect-[4/5] w-full shrink-0 snap-center bg-blush ${i === 0 ? "md:col-span-2" : ""}`}>
              <Image
                src={src}
                alt={`${p.name[lang]} – ${fill(d.product.gallery, { n: i + 1, total: p.images.length })}`}
                fill
                sizes={i === 0 ? "(min-width: 768px) 55vw, 100vw" : "(min-width: 768px) 28vw, 100vw"}
                quality={70}
                preload={i === 0}
                loading={i === 0 ? undefined : "lazy"}
                className="object-cover"
              />
            </div>
          ))}
        </div>
        {p.images.length > 1 && (
          <div className="mt-4 flex justify-center gap-2 md:hidden" aria-hidden="true">
            {p.images.map((src, i) => (
              <span key={src} className={`h-px w-6 transition-colors ${i === active ? "bg-ink" : "bg-line"}`} />
            ))}
          </div>
        )}
      </div>

      {/* Informations et personnalisation */}
      <div className="px-6 md:px-0">
        <div className="md:sticky md:top-36">
          <p className="text-[0.6875rem] tracking-[0.14em] text-muted uppercase rtl:tracking-normal rtl:normal-case">{categoryName(p.category, lang)}</p>
          <h1 className="display mt-3 text-4xl md:text-5xl">{p.name[lang]}</h1>
          <p className="mt-4 text-wine">{pricesConfirmed ? (options.length || extras.length ? formatPrice(price, lang) : `${d.shop.from}${formatPrice(p.priceFrom, lang)}`) : d.shop.onRequest}</p>
          {p.stock !== null && (
            <p className="mt-2 text-sm text-wine">{soldOut ? d.shop.soldOut : `${d.shop.limited} · ${fill(d.shop.left, { n: p.stock })}`}</p>
          )}
          <p className="mt-6 leading-[1.85] text-muted">{p.description[lang]}</p>

          <div className="mt-10 flex flex-col gap-8 border-t border-line pt-8">
            {options.map((o) => (
              <fieldset key={o.id}>
                <legend className="label mb-3">
                  {optionLabel(o.id, d)}
                  {sel[o.id] && <span className="ms-2 normal-case tracking-normal text-ink">{choiceLabel(o.id, sel[o.id], d)}</span>}
                </legend>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={optionLabel(o.id, d)}>
                  {o.choices.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      role="radio"
                      aria-checked={sel[o.id] === c.id}
                      onClick={() => setSel((s) => ({ ...s, [o.id]: c.id }))}
                      className="chip min-w-12"
                    >
                      {o.id === "size" ? c.id : choiceLabel(o.id, c.id, d)}
                    </button>
                  ))}
                </div>
              </fieldset>
            ))}

            {p.personalWord && (
              <label className="block">
                <span className="label">{d.product.word}</span>
                <input className="field" value={word} maxLength={WORD_MAX} onChange={(e) => setWord(e.target.value)} placeholder={d.product.wordPlaceholder} aria-describedby="word-hint" />
                <span id="word-hint" className="mt-2 flex justify-between text-xs text-muted">
                  <span>{d.product.wordHint}</span>
                  <span className="tabular-nums">{word.length}/{WORD_MAX}</span>
                </span>
              </label>
            )}

            <div className="grid grid-cols-2 gap-6">
              <label className="block">
                <span className="label">{d.product.date}</span>
                <input
                  type="date"
                  className="field"
                  min={minDate || undefined}
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setSlot("");
                  }}
                  aria-invalid={!!problem}
                  aria-describedby={problem ? "date-err" : undefined}
                />
              </label>
              <label className="block">
                <span className="label">{d.product.slot}</span>
                <select className="field" value={slot} onChange={(e) => setSlot(e.target.value)} disabled={!date || !!problem}>
                  <option value="">{d.product.chooseSlot}</option>
                  {slots.map((s) => (
                    <option key={s} value={s} dir="ltr">
                      {s}
                    </option>
                  ))}
                </select>
              </label>
              {problem && (
                <p id="date-err" className="col-span-2 -mt-3 text-xs text-wine">
                  {problem === "closed" ? d.checkout.errors.closed : fill(d.checkout.errors.lead, { h: minLeadHours })}
                </p>
              )}
            </div>

            <div>
              <p className="label mb-4">{d.product.suggestions}</p>
              <ul className="grid gap-3">
                {addons.map((a) => {
                  const on = extras.includes(a.id);
                  return (
                    <li key={a.id}>
                      <label className={`flex cursor-pointer items-center gap-4 border p-2 pe-4 transition-colors ${on ? "border-ink" : "border-line hover:border-ink/40"}`}>
                        <input type="checkbox" className="sr-only" checked={on} onChange={() => setExtras((x) => (on ? x.filter((i) => i !== a.id) : [...x, a.id]))} />
                        <Image src={a.image} alt="" width={56} height={56} className="h-14 w-14 object-cover" />
                        <span className="flex-1 text-sm">{a.name[lang]}</span>
                        {pricesConfirmed && <span className="text-sm text-muted">+{formatPrice(a.price, lang)}</span>}
                        <span aria-hidden="true" className={`flex h-5 w-5 items-center justify-center border text-xs ${on ? "border-ink bg-ink text-ivory" : "border-line"}`}>
                          {on ? "✓" : ""}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <button type="button" className="btn-fill w-full" onClick={addToCart} disabled={soldOut}>
                {soldOut ? d.shop.soldOut : added ? d.product.added : d.product.addToCart}
              </button>
              <a href={waLink(fill(d.whatsapp.product, { name: p.name[lang] }))} target="_blank" rel="noopener noreferrer" className="py-2 text-center text-sm text-muted underline-offset-4 hover:text-ink hover:underline">
                {d.product.orderWhatsapp}
              </a>
              <p className="text-xs leading-relaxed text-muted">{d.product.freshNote}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
