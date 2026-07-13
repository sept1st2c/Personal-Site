"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { SiGithub, SiLeetcode } from "react-icons/si";
import { person } from "@/lib/data";
import { POP_TRANSITION, POP_SCALE_FROM, EASE_SMOOTH } from "@/lib/motion";

const iconLinks = [
  { label: "LinkedIn", href: person.linkedin, Icon: FaLinkedin },
  { label: "X", href: person.twitter, Icon: FaXTwitter },
  { label: "GitHub", href: person.github, Icon: SiGithub },
  { label: "LeetCode", href: person.leetcode, Icon: SiLeetcode },
].filter((link) => link.href);

/**
 * These used to be small (40px) outline-only circles — border, transparent
 * fill, ink-colored icon — which the site owner flagged as easy to skip
 * past next to the bold filled "Download Résumé" pill right above them.
 * Now filled with the same dark primary + on-primary icon color as that
 * button (real, matching visual weight, not just a border), plus a
 * one-time staggered pop-in on mount and a hover/tap lift so the row reads
 * as a deliberate, tappable button group rather than quiet decoration.
 *
 * `.above-grain` here follows the same rule documented in globals.css and
 * used by Hero.tsx's photo/H1 and ProjectShowcase's motion.div cards: the
 * `animate={{ scale: 1, y: 0 }}` rest state still leaves a non-"none"
 * `transform` on each motion.a, which makes it a stacking-context root in
 * its own right. Hero's outer `.above-grain.fade-in` wrapper already sits
 * above the grain layer as a whole, so these would likely inherit that —
 * but matching the rest of the codebase's belt-and-suspenders convention
 * (rather than relying on that implicitly) keeps this correct even if
 * SocialLinks is ever reused somewhere without that elevated ancestor.
 */
export default function SocialLinks() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex items-center gap-3">
      {iconLinks.map(({ label, href, Icon }, i) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10, scale: POP_SCALE_FROM }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            ...POP_TRANSITION,
            delay: prefersReducedMotion ? 0 : 0.3 + i * 0.1,
          }}
          whileHover={
            prefersReducedMotion
              ? undefined
              : {
                  scale: 1.08,
                  y: -3,
                  boxShadow: "0 14px 28px -10px rgba(12,10,9,0.5)",
                  transition: { duration: 0.25, ease: EASE_SMOOTH },
                }
          }
          whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
          className="above-grain inline-flex h-11 w-11 items-center justify-center rounded-full"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-on-primary)",
            boxShadow: "0 8px 20px -10px rgba(12,10,9,0.4)",
          }}
        >
          <Icon size={18} aria-hidden="true" />
        </motion.a>
      ))}
    </div>
  );
}
