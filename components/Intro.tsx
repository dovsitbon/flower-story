"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LEAF_PATH, PETAL_PATH, PETALS, STEM_PATH } from "@/components/Logo";

const KEY = "flowerstory-intro";
const WORD = "FLOWER STORY".split("");
const FALLING = [
  { x: "-18vw", delay: 0.85, rot: 120 },
  { x: "12vw", delay: 1.0, rot: -90 },
  { x: "-4vw", delay: 1.12, rot: 200 },
  { x: "22vw", delay: 0.95, rot: 60 },
];

export function Intro({ skipLabel }: { skipLabel: string }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- décision unique au montage
      setShow(false);
      return;
    }
    const t = setTimeout(() => setShow(false), 1650);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (show) return;
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
  }, [show]);

  return (
    <AnimatePresence onExitComplete={() => document.documentElement.classList.add("intro-seen")}>
      {show && (
        <motion.div
          key="intro"
          className="intro-curtain flex items-center justify-center overflow-hidden text-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeOut" } }}
        >
          <div className="flex flex-col items-center" aria-hidden="true">
            <svg
              viewBox="0 0 48 48"
              className="intro-bloom h-20 w-20 md:h-24 md:w-24"
              fill="none"
              stroke="currentColor"
              strokeWidth={0.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={1}
              strokeDashoffset={1}
            >
              {PETALS.map((r, i) => (
                <path key={r} d={PETAL_PATH} transform={`rotate(${r} 24 20)`} pathLength={1} className="intro-draw" style={{ animationDelay: `${0.05 + i * 0.07}s` }} />
              ))}
              <path d={STEM_PATH} pathLength={1} className="intro-draw" style={{ animationDelay: "0.1s" }} />
              <path d={LEAF_PATH} pathLength={1} className="intro-draw" style={{ animationDelay: "0.4s", animationDuration: "0.45s" }} />
            </svg>
            <p className="mt-7 flex font-[family-name:var(--font-jost)] text-lg font-light tracking-[0.42em] md:text-2xl" dir="ltr">
              {WORD.map((ch, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.5 + i * 0.035 }}>
                  {ch === " " ? " " : ch}
                </motion.span>
              ))}
            </p>
            <motion.p
              className="mt-3 font-[family-name:var(--font-jost)] text-[0.6rem] tracking-[0.62em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.0 }}
              dir="ltr"
            >
              BOUTIQUE
            </motion.p>
          </div>
          {FALLING.map((p, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="absolute top-[38%] left-1/2 block h-3 w-2 rounded-[50%_50%_50%_0] bg-powder"
              initial={{ opacity: 0, x: p.x, y: 0, rotate: 0 }}
              animate={{ opacity: [0, 1, 0], y: "36vh", rotate: p.rot }}
              transition={{ duration: 0.9, delay: p.delay, ease: "easeIn" }}
            />
          ))}
          <button
            type="button"
            onClick={() => setShow(false)}
            className="eyebrow-latin absolute end-6 bottom-6 p-2 text-muted transition-colors hover:text-ink"
          >
            {skipLabel}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
