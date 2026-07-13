"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { nav } from "@/lib/data";
import { EASE_SMOOTH } from "@/lib/motion";

/**
 * Mobile-only dropdown drawer for the nav links (Nav.tsx hides the desktop
 * `sm:flex` list below `sm` with nothing replacing it — this is that
 * replacement). Rendered as a sibling of the h-16 bar inside Nav's
 * `<header>`, which is itself `position: sticky` — that makes it a valid
 * containing block, so `absolute inset-x-0 top-full` here lands the panel
 * flush under the bar without any extra wrapper.
 *
 * No `.above-grain` needed: the `animate={{ y: 0, scale: 1 }}` below does
 * leave a persistent (non-"none") `transform` on this motion.div, which
 * makes it a stacking-context root the same way the wrappers in
 * ProjectShowcase.tsx and Hero.tsx are — but that only matters for escaping
 * .grain-layer when the element's *ancestor* stacking context isn't already
 * above it. Here every ancestor up to <header> is inside `header`'s own
 * z-50 stacking context, which already outranks .grain-layer's z-index: 1
 * at the root, so this whole subtree paints above the grain regardless of
 * its own internal transform-induced nesting.
 */
export default function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = !!prefersReducedMotion;

  const transition = reduceMotion ? { duration: 0.01 } : { duration: 0.4, ease: EASE_SMOOTH };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-nav-panel"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
          transition={transition}
          // Fully opaque here (not .nav-glass's 96%) on purpose: this panel
          // can land directly over the hero photo on first paint, and even
          // 4% transparency + blur was enough to show a faint hazy outline
          // of a high-contrast dark photo bleeding through underneath the
          // menu text. A dropdown overlay reads fine fully solid; it's only
          // the persistent top bar that benefits from the glass treatment.
          style={{
            transformOrigin: "top center",
            borderColor: "var(--color-hairline)",
            backgroundColor: "var(--color-canvas)",
            boxShadow: "0 16px 32px -20px color-mix(in srgb, var(--color-ink) 24%, transparent)",
          }}
          className="absolute inset-x-0 top-full z-50 border-b sm:hidden"
        >
          <nav className="mx-auto flex max-w-[1200px] flex-col gap-1 px-6 py-4">
            {nav.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={onClose}
                initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.08 + i * 0.06, ease: EASE_SMOOTH }}
                className="rounded-xl px-3 py-3 text-[15px] font-medium transition-colors hover:bg-[var(--color-surface-strong)]"
                style={{ color: "var(--color-body)" }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
