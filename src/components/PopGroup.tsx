"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { POP_TRANSITION, POP_SCALE_FROM } from "@/lib/motion";

const TAGS = {
  span: motion.span,
  li: motion.li,
  div: motion.div,
  ul: motion.ul,
  nav: motion.nav,
} as const;

/**
 * The stagger-scale-in HeroTags/SocialLinks originally used, generalized
 * into a shared pair so the same pop-in reads consistently on every
 * small-item list sitewide (stack pills, achievement list items, nav
 * links) instead of being reinvented per component or left as a single
 * plain fade like the larger section-level Reveal. PopGroup drives the
 * stagger; each direct child goes in a PopItem. Timing/scale come from
 * src/lib/motion.ts's POP_* constants — tuned to a gentle emergence
 * (small scale delta, smoother easing) rather than the more dramatic
 * "zoom pop" the first version used, which read as harsh once several
 * items popped in back-to-back.
 */
export function PopGroup({
  children,
  className,
  stagger = 0.07,
  delayChildren = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  /** Renders as this element instead of a div — e.g. "ul" when the group
   * itself is a real list wrapping PopItem `as="li"` children. */
  as?: keyof typeof TAGS;
}) {
  const reduceMotion = !!useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : stagger,
        delayChildren: reduceMotion ? 0 : delayChildren,
      },
    },
  };

  const Component = TAGS[as];

  return (
    <Component
      className={`above-grain ${className ?? ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={container}
    >
      {children}
    </Component>
  );
}

export function PopItem({
  children,
  className,
  style,
  as = "span",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Renders as this element instead of a span — e.g. "li" to keep real
   * list semantics when the item is one row of a <ul>. */
  as?: keyof typeof TAGS;
}) {
  const reduceMotion = !!useReducedMotion();

  const item: Variants = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 10, scale: POP_SCALE_FROM },
    visible: { opacity: 1, y: 0, scale: 1, transition: POP_TRANSITION },
  };

  const Component = TAGS[as];

  return (
    <Component className={className} style={style} variants={item}>
      {children}
    </Component>
  );
}
