"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import type { CartItem } from "@/lib/order";
import { getProduct } from "@/lib/catalog";

type LocaleCtx = { lang: Locale; d: Dict };
const LocaleContext = createContext<LocaleCtx | null>(null);

export function useLocale() {
  const v = useContext(LocaleContext);
  if (!v) throw new Error("useLocale hors de LocaleProvider");
  return v;
}

type CartCtx = {
  items: CartItem[];
  count: number;
  ready: boolean;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (item: Omit<CartItem, "key">) => void;
  update: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};
const CartContext = createContext<CartCtx | null>(null);

export function useCart() {
  const v = useContext(CartContext);
  if (!v) throw new Error("useCart hors de CartProvider");
  return v;
}

const STORAGE = "flowerstory-cart";

export function Providers({ lang, d, children }: { lang: Locale; d: Dict; children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE) ?? "[]") as CartItem[];
      // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture unique du panier sauvegardé
      setItems(saved.filter((i) => getProduct(i.productId)));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  const add = useCallback((item: Omit<CartItem, "key">) => {
    const key = JSON.stringify([item.productId, item.selection, item.word.trim(), [...item.addons].sort()]);
    setItems((prev) => {
      const found = prev.find((i) => i.key === key);
      if (found) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + item.qty } : i));
      return [...prev, { ...item, word: item.word.trim(), key }];
    });
  }, []);

  const update = useCallback((key: string, qty: number) => {
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, qty: Math.max(1, Math.min(20, qty)) } : i)));
  }, []);
  const remove = useCallback((key: string) => setItems((prev) => prev.filter((i) => i.key !== key)), []);
  const clear = useCallback(() => setItems([]), []);

  const cart = useMemo<CartCtx>(
    () => ({ items, count: items.reduce((s, i) => s + i.qty, 0), ready, open, setOpen, add, update, remove, clear }),
    [items, ready, open, add, update, remove, clear],
  );

  return (
    <LocaleContext.Provider value={{ lang, d }}>
      <CartContext.Provider value={cart}>{children}</CartContext.Provider>
    </LocaleContext.Provider>
  );
}
