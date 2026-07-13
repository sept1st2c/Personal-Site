"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { TEXT_TRANSITION, TEXT_Y } from "@/lib/motion";

// The one canonical scroll-entrance animation for the site — same easing
// curve and duration Section.tsx/Experience.tsx/ProjectCard.tsx already
// used independently before this existed. Reused everywhere instead of
// each component re-declaring its own slightly different numbers, so the
// whole page reads as one consistent motion language rather than a
// collection of unrelated effects. Timing/easing/travel distance now come
// from src/lib/motion.ts's shared TEXT_* constants, tuned specifically to
// read clearly for headings/paragraphs (longer duration, more travel)
// rather than the snappier, smaller-scale POP_* constants small UI chrome
// (icons, pills) uses via PopGroup/PopItem.
export default function Reveal({
  children,
  delay = 0,
  y = TEXT_Y,
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
      transition={{ ...TEXT_TRANSITION, delay: reduceMotion ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}
