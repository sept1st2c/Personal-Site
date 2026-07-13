"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import TechBadge from "./TechBadge";

const EASE = [0.16, 1, 0.3, 1] as const;

// Kept as its own small client component (rather than making all of
// Hero.tsx client) purely to stagger-reveal the tag row on mount — same
// pattern as extracting SocialLinks.tsx for its own pop-in animation.
export default function HeroTags({ tags }: { tags: string[] }) {
  const reduceMotion = !!useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.025, delayChildren: reduceMotion ? 0 : 0.5 },
    },
  };
  const item: Variants = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 8, scale: 0.92 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: EASE } },
  };

  return (
    <motion.div
      className="order-5 mt-8 flex flex-wrap gap-2 sm:order-4"
      initial="hidden"
      animate="visible"
      variants={container}
    >
      {tags.map((tag) => (
        <motion.span key={tag} variants={item} className="inline-flex transition-transform hover:scale-105">
          <TechBadge label={tag} />
        </motion.span>
      ))}
    </motion.div>
  );
}
