"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TEXT_TRANSITION, TEXT_Y } from "@/lib/motion";

export default function Section({
  id,
  label,
  title,
  children,
  divider = true,
}: {
  id: string;
  label?: string;
  title?: string;
  children: ReactNode;
  divider?: boolean;
}) {
  const reduceMotion = !!useReducedMotion();

  return (
    <section
      id={id}
      className="mx-auto max-w-[1200px] px-6"
      style={{
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
        borderTop: divider ? "1px solid var(--color-hairline)" : undefined,
      }}
    >
      {(label || title) && (
        // Every section's eyebrow + heading reveals once as it scrolls
        // into view (whileInView, not animate, so it doesn't just fire
        // once on initial page load for whatever happens to be visible)
        // — the one central animation touch that reaches Experience,
        // Projects, Achievements, Activity, LinkedIn, and About all at
        // once without duplicating the same motion setup in each.
        //
        // .above-grain on THIS wrapper, not just the h2 inside it: once
        // whileInView resolves, this div is left with a persistent
        // non-"none" `transform` (translateY(0)), which makes it a
        // stacking-context root on its own and would otherwise trap the
        // h2's own .above-grain below .grain-layer (same bug class
        // documented on Hero's .fade-in wrapper and elsewhere).
        <motion.div
          className="above-grain mb-10"
          initial={reduceMotion ? false : { opacity: 0, y: TEXT_Y }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={TEXT_TRANSITION}
        >
          {label && (
            <p
              className="mb-3 text-[12px] font-semibold uppercase"
              style={{
                color: "var(--color-muted)",
                letterSpacing: "0.96px",
              }}
            >
              {label}
            </p>
          )}
          {title && (
            // .above-grain: without it, the grain layer's soft-light blend
            // sits directly on this dark text and reads as a faint,
            // washed-out tint wherever the atmosphere gradient underneath
            // is strong — the "titles getting low opacity" complaint.
            <h2
              className="above-grain font-display text-[32px] sm:text-[36px]"
              style={{ color: "var(--color-ink)" }}
            >
              {title}
            </h2>
          )}
        </motion.div>
      )}
      {children}
    </section>
  );
}
