"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import site from "@/data/site.json";
import { Logo } from "@/components/Logo";
import { LangSwitch } from "@/components/LangSwitch";
import { Banner } from "@/components/Banner";
import { BagIcon, CloseIcon, InstagramIcon, MenuIcon } from "@/components/icons";
import { useCart, useLocale } from "@/components/providers";

export function Header() {
  const { lang, d } = useLocale();
  const overlay = usePathname() === `/${lang}`;
  const { count, ready, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (menu) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = menu ? "hidden" : "";
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  const light = overlay && !scrolled && !menu;
  const links = [
    { href: `/${lang}/shop`, label: d.nav.shop, short: d.nav.shop },
    { href: `/${lang}#collections`, label: d.nav.collections, short: d.nav.collections },
    { href: `/${lang}#events`, label: d.nav.events, short: d.nav.eventsShort },
    { href: `/${lang}#story`, label: d.nav.story, short: d.nav.storyShort },
    { href: `/${lang}#contact`, label: d.nav.contact, short: d.nav.contact },
  ];

  const cartButton = (
    <button type="button" onClick={() => setOpen(true)} className="relative -m-2 flex items-center gap-2 p-2" aria-label={`${d.cart.open}${ready && count ? ` (${count})` : ""}`}>
      <BagIcon />
      <span className="nav-link hidden xl:inline">{d.nav.cart}</span>
      {ready && count > 0 && (
        <span className="absolute -top-0.5 -end-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-wine px-1 text-[0.625rem] leading-none text-ivory">{count}</span>
      )}
    </button>
  );

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-700 ${light ? "text-ivory" : "bg-ivory/95 text-ink backdrop-blur-sm"}`}>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-12 focus:z-10 focus:bg-ivory focus:px-4 focus:py-2 focus:text-ink">
          {d.nav.skip}
        </a>
        <Banner />
        <div className={`grid h-16 grid-cols-[1fr_auto_1fr] items-center px-5 transition-[border-color] duration-700 md:h-20 md:px-10 ${light ? "border-b border-transparent" : "border-b border-line"}`}>
          <div className="flex items-center">
            <button type="button" className="-m-2 p-2 xl:hidden" onClick={() => setMenu(true)} aria-label={d.nav.menu} aria-expanded={menu}>
              <MenuIcon />
            </button>
            <nav className="hidden items-center gap-6 xl:flex 2xl:gap-9" aria-label={d.nav.menu}>
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="nav-link whitespace-nowrap transition-opacity hover:opacity-60">
                  {l.short}
                </Link>
              ))}
            </nav>
          </div>

          <Link href={`/${lang}`} className="text-[0.95rem] md:text-[1.05rem]">
            <Logo lang={lang} />
            <span className="sr-only"> – {d.nav.home}</span>
          </Link>

          <div className="flex items-center justify-end gap-5 md:gap-7">
            <LangSwitch lang={lang} label={d.nav.language} className="hidden xl:flex" />
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="-m-2 hidden p-2 transition-opacity hover:opacity-60 md:block" aria-label="Instagram">
              <InstagramIcon />
            </a>
            {cartButton}
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col overscroll-contain bg-ivory text-ink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            role="dialog"
            aria-modal="true"
            aria-label={d.nav.menu}
          >
            <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center px-5 mt-9">
              <button type="button" className="-m-2 justify-self-start p-2" onClick={() => setMenu(false)} aria-label={d.nav.close}>
                <CloseIcon />
              </button>
              <Logo lang={lang} className="text-[0.95rem]" />
              <span />
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-7">
              {links.map((l, i) => (
                <motion.div key={l.href} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i + 0.1, duration: 0.6 }}>
                  <Link href={l.href} onClick={() => setMenu(false)} className="display text-4xl">
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="flex items-center justify-between border-t border-line px-6 py-5">
              <LangSwitch lang={lang} label={d.nav.language} />
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm" aria-label="Instagram">
                <InstagramIcon />
                <span dir="ltr">{site.instagramHandle}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
