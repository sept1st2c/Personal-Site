"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

// The one canonical scroll-entrance animation for the site — same easing
// curve and duration Section.tsx/Experience.tsx/ProjectCard.tsx already
// used independently before this existed. Reused everywhere instead of
// each component re-declaring its own slightly different numbers, so the
// whole page reads as one consistent motion language rather than a
// collection of unrelated effects.
const EASE = [0.16, 1, 0.3, 1] as const;

export default function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduceMotion = !!useReducedMotion();

  return (
    <motion.div
      // .above-grain: whileInView leaves a persistent non-"none" transform
      // once resolved, which makes this div its own stacking context and
      // would otherwise trap any .above-grain content inside it below
      // .grain-layer (the same bug class documented in globals.css).
      className={`above-grain ${className ?? ""}`}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: EASE, delay: reduceMotion ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}
