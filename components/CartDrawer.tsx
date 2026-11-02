"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { describeSelection, formatPrice, getAddon, getProduct, pricesConfirmed } from "@/lib/catalog";
import { lineTotal } from "@/lib/order";
import { CloseIcon } from "@/components/icons";
import { useCart, useLocale } from "@/components/providers";

export function CartDrawer() {
  const { lang, d } = useLocale();
  const { items, open, setOpen, update, remove } = useCart();
  const rtl = lang === "he";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [open, setOpen]);

  const subtotal = items.reduce((s, i) => s + lineTotal(i), 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 z-[70] bg-ink/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={d.cart.title}
            className="fixed inset-y-0 end-0 z-[71] flex w-full max-w-md flex-col bg-ivory text-ink"
            initial={{ x: rtl ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: rtl ? "-100%" : "100%" }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            data-lenis-prevent
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="eyebrow">{d.cart.title}</h2>
              <button type="button" onClick={() => setOpen(false)} className="-m-2 p-2" aria-label={d.nav.close} autoFocus>
                <CloseIcon />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-8 px-8 text-center">
                <p className="display text-2xl">{d.cart.empty}</p>
                <Link href={`/${lang}/shop`} onClick={() => setOpen(false)} className="btn-line">
                  {d.cart.continue}
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-line overflow-y-auto overscroll-contain px-6">
                  {items.map((item) => {
                    const p = getProduct(item.productId)!;
                    return (
                      <li key={item.key} className="flex gap-4 py-5">
                        <Image src={p.images[0]} alt={p.name[lang]} width={88} height={110} className="h-[110px] w-[88px] shrink-0 object-cover" />
                        <div className="flex min-w-0 flex-1 flex-col gap-1 text-sm">
                          <p className="font-normal">{p.name[lang]}</p>
                          {describeSelection(p, item.selection, d).map((s) => (
                            <p key={s} className="text-muted">{s}</p>
                          ))}
                          {item.word && <p className="text-muted">{d.cart.word}: &quot;{item.word}&quot;</p>}
                          {item.addons.length > 0 && (
                            <p className="text-muted">
                              {d.cart.addons}: {item.addons.map((a) => getAddon(a)?.name[lang]).join(", ")}
                            </p>
                          )}
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <div className="flex items-center border border-line" role="group" aria-label={d.cart.qty}>
                              <button type="button" className="h-8 w-8" onClick={() => update(item.key, item.qty - 1)} aria-label={`${d.cart.qty} −1`}>−</button>
                              <span className="w-6 text-center tabular-nums" aria-live="polite">{item.qty}</span>
                              <button type="button" className="h-8 w-8" onClick={() => update(item.key, item.qty + 1)} aria-label={`${d.cart.qty} +1`}>+</button>
                            </div>
                            {pricesConfirmed && <span className="tabular-nums">{formatPrice(lineTotal(item), lang)}</span>}
                          </div>
                          <button type="button" onClick={() => remove(item.key)} className="self-start text-xs text-muted underline-offset-4 hover:underline">
                            {d.cart.remove}
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="border-t border-line px-6 py-6">
                  {pricesConfirmed ? (
                    <p className="mb-4 flex justify-between text-sm">
                      <span>{d.cart.subtotal}</span>
                      <span className="tabular-nums">{formatPrice(subtotal, lang)}</span>
                    </p>
                  ) : (
                    <p className="mb-4 text-sm text-muted">{d.cart.pricesNote}</p>
                  )}
                  <Link href={`/${lang}/checkout`} onClick={() => setOpen(false)} className="btn-fill w-full">
                    {d.cart.checkout}
                  </Link>
                  <button type="button" onClick={() => setOpen(false)} className="mt-3 w-full py-2 text-sm text-muted hover:text-ink">
                    {d.cart.continue}
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
