"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { EASE_SMOOTH } from "@/lib/motion";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, textarea, select, summary, label";

/**
 * Replaces the native pointer with an ink dot + trailing ring on
 * fine-pointer (mouse/trackpad) devices. The dot tracks the raw cursor
 * position every frame; the ring is spring-smoothed a step behind it,
 * which is what produces the trailing feel. Hovering any interactive
 * element (detected via `closest(INTERACTIVE_SELECTOR)`, so links,
 * buttons, dial markers, etc. are all covered without per-component
 * wiring) shrinks the dot into the ring and fills it, so it doubles as a
 * click affordance.
 *
 * Whether this is actually shown (vs. leaving the native cursor alone) is
 * decided entirely by CSS — `.cursor-layer` in globals.css is
 * `display: none` except under
 * `(pointer: fine) and (prefers-reduced-motion: no-preference)`, and the
 * matching rule there is what hides the native cursor. That keeps this
 * component's own mount/render identical on server and client (no
 * SSR/client mismatch from a JS media-query check gating what renders)
 * and means there's no "enable" state to synchronize in an effect — the
 * effect below only ever calls setState from inside its event-listener
 * callbacks, not synchronously in the effect body itself.
 */
export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      setHovering(!!target?.closest(INTERACTIVE_SELECTOR));
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
  }, [x, y]);

  if (prefersReducedMotion) return null;

  return (
    <div className="cursor-layer">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[10001] rounded-full"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: 8,
          height: 8,
          backgroundColor: "var(--color-ink)",
        }}
        animate={{ scale: hovering ? 0 : 1, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2, ease: EASE_SMOOTH }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[10001] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: 34,
          height: 34,
          borderColor: "var(--color-ink)",
        }}
        animate={{
          scale: hovering ? 1.6 : 1,
          opacity: visible ? 1 : 0,
          backgroundColor: hovering
            ? "color-mix(in srgb, var(--color-ink) 8%, transparent)"
            : "color-mix(in srgb, var(--color-ink) 0%, transparent)",
        }}
        transition={{ duration: 0.25, ease: EASE_SMOOTH }}
      />
    </div>
  );
}
