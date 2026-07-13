"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import ProjectDetailPanel from "./ProjectDetailPanel";
import { EASE_SMOOTH } from "@/lib/motion";

const INITIAL_COUNT = 3;

/**
 * Straightforward project showcase: every project renders as a card in a
 * responsive 2-up grid — no dial/selector, no single-focus state to page
 * through. Only the first `INITIAL_COUNT` show by default (six full
 * project write-ups made the section feel very long); a "Show more"
 * toggle reveals the rest.
 *
 * Whenever the *visible* count is odd, the last visible card would be
 * left alone in its row with an empty gap next to it — so that one card
 * (and only that one) renders as a wider "featured" split (see
 * ProjectCard) spanning both columns instead. With `INITIAL_COUNT = 3`
 * this means the 3rd card starts featured; once "Show more" reveals all
 * 6 (an even count), nobody needs to be featured and it animates back to
 * a plain stacked card via ProjectCard's `layout` animation rather than
 * snapping between the two shapes.
 *
 * Clicking a card (or its "Explore project" button) opens that project's
 * full case study in a modal, tracked by `expandedSlug`.
 *
 * While collapsed, a bottom-fade scrim over the last visible row plus a
 * small pulsing "+N" badge on the button (both gated by `isTruncated`)
 * signal that the grid is deliberately cut off rather than complete —
 * without either, a quick skim of the page could read 3 cards as "that's
 * everything" and miss the toggle entirely.
 */
export default function ProjectShowcase() {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = !!prefersReducedMotion;
  const expandedProject = projects.find((p) => p.slug === expandedSlug) ?? null;

  const visible = showAll ? projects : projects.slice(0, INITIAL_COUNT);
  const hiddenCount = projects.length - INITIAL_COUNT;
  const oddOneOutIndex = visible.length % 2 === 1 ? visible.length - 1 : -1;

  useEffect(() => {
    if (!expandedSlug) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setExpandedSlug(null);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expandedSlug]);

  // Lock background scroll while the detail modal is open.
  useEffect(() => {
    if (!expandedSlug) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [expandedSlug]);

  // Only the collapsed state should ever read as "cut off" — once every
  // project is showing there's nothing left to hint at.
  const isTruncated = !showAll && hiddenCount > 0;

  return (
    <>
      <div className="relative">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7">
          {visible.map((project, i) => {
            const featured = i === oddOneOutIndex;
            return (
              <motion.div
                key={project.slug}
                layout
                // Previously `initial` was `false` for i < INITIAL_COUNT (the
                // cards visible by default, i.e. what almost every visitor
                // actually sees) and the rest only animated once, on mount —
                // so the default 3-card view never animated at all, and cards
                // revealed via "Show more" wouldn't replay on scroll either.
                // whileInView (matching the Reveal component's pattern used
                // everywhere else on the site) fixes both: every card
                // animates in the first time it actually enters the
                // viewport, whether that's on initial scroll or right after
                // "Show more" mounts new ones already in view.
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  layout: { duration: 0.5, ease: EASE_SMOOTH },
                  default: { duration: 0.6, ease: EASE_SMOOTH, delay: reduceMotion ? 0 : i * 0.1 },
                }}
                // .above-grain here, not just on ProjectCard's inner root: the
                // `whileInView={{ y: 0 }}` above leaves a persistent non-"none"
                // `transform` on this wrapper, which makes IT a stacking
                // context root — silently trapping ProjectCard's own
                // .above-grain inside a context that never reaches the
                // root-level .grain-layer at all (same bug class found in
                // Hero.tsx's .fade-in wrapper).
                className={`above-grain ${featured ? "sm:col-span-2" : ""}`}
              >
                <ProjectCard
                  project={project}
                  featured={featured}
                  expanded={expandedSlug === project.slug}
                  onExpand={() => setExpandedSlug(project.slug)}
                />
              </motion.div>
            );
          })}
        </div>

        {isTruncated && (
          // Bottom-fade scrim over the last visible row (the featured Tapi
          // card, since an odd visible count spans it across both
          // columns) — reads as "this content is cut off, keep going"
          // instead of a clean, complete-looking grid with an unrelated
          // button below it. A gradient mask/scrim from transparent to the
          // page's own canvas color, like a "read more" block that fades
          // out mid-line.
          //
          // Deliberately NOT using the `.above-grain` utility class here,
          // even though this needs the same "sit above an isolated
          // sibling" effect it's normally used for. `.above-grain` sets
          // `position: relative`, and Tailwind's `absolute` utility also
          // targets `position` — both are single-class selectors (equal
          // specificity), and because `.above-grain` is declared *after*
          // Tailwind's own utilities in globals.css (`@import
          // "tailwindcss"` is the file's first line), `.above-grain`
          // always wins the cascade. Combining the two classes silently
          // downgrades this element to `position: relative`, which takes
          // it out of `absolute` positioning entirely — confirmed by
          // inspecting computed layout: the wrapper ended up exactly this
          // element's own height taller than the grid, i.e. it was
          // pushed into normal document flow *below* the grid instead of
          // overlaying its bottom edge. Inline styles beat any class
          // (including `.above-grain`), so `position`/`zIndex`/`isolation`
          // are set here directly instead — same stacking effect, no
          // cascade collision.
          <div
            aria-hidden="true"
            className="pointer-events-none inset-x-0 bottom-0 h-36 sm:h-52"
            style={{
              position: "absolute",
              zIndex: 2,
              isolation: "isolate",
              // Three stops, not a plain transparent->canvas ramp: a
              // simple two-stop linear alpha fade reads as almost nothing
              // over the featured card's dark screenshot half — most of
              // a linear alpha gradient's *perceived* change compresses
              // into roughly its last third against a high-contrast dark
              // backdrop, so the transition looked like a faint edge
              // vignette rather than a legible fade (confirmed visually:
              // a plain 2-stop version over this exact card was barely
              // there). Front-loading with a 45%-opacity midpoint spreads
              // the visible change across the whole band instead.
              background:
                "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--color-canvas) 55%, transparent) 55%, var(--color-canvas) 92%)",
            }}
          />
        )}
      </div>

      {hiddenCount > 0 && (
        <div className="relative mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="hover-lift relative inline-flex h-11 items-center gap-2 rounded-full border px-6 text-[14px] font-medium transition-colors hover:bg-[var(--color-surface-strong)]"
            style={{ borderColor: "var(--color-hairline-strong)", color: "var(--color-ink)" }}
          >
            {showAll ? (
              <>
                Show less
                <LuChevronUp size={16} aria-hidden="true" />
              </>
            ) : (
              <>
                Show {hiddenCount} more project{hiddenCount === 1 ? "" : "s"}
                <LuChevronDown size={16} aria-hidden="true" />
              </>
            )}

            {isTruncated && (
              // Small pulsing "+N" badge — a second, more explicit cue
              // alongside the bottom fade above, in case the fade alone
              // reads as too subtle (or as a rendering artifact rather
              // than an intentional affordance) at a glance. A soft,
              // continuously-repeating "ping" ring behind a static count
              // pill, same visual language notification badges use for
              // "there's something here you haven't seen yet".
              <span className="pointer-events-none absolute -right-2 -top-2 flex h-5 w-5">
                {!reduceMotion && (
                  // Peak opacity bumped well past the first attempt (0.55
                  // -> 0.85): sampled the running animation's *computed*
                  // opacity frame-by-frame and at a scale of ~1.4 (about a
                  // third into the cycle) it had already decayed to ~0.3,
                  // which is barely perceptible at only 20px — the ring
                  // was technically animating the whole time but too
                  // faint at any given instant to actually read as a
                  // pulse. Starting darker keeps a visible ring further
                  // into the cycle instead of it vanishing almost
                  // immediately.
                  <motion.span
                    aria-hidden="true"
                    className="absolute inline-flex h-full w-full rounded-full"
                    style={{ backgroundColor: "var(--color-primary)" }}
                    animate={{ scale: [1, 2], opacity: [0.85, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <span
                  className="relative inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-semibold leading-none"
                  style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
                >
                  {hiddenCount}
                </span>
              </span>
            )}
          </button>
        </div>
      )}

      <AnimatePresence>
        {expandedProject && (
          <ProjectDetailPanel
            key="detail"
            project={expandedProject}
            onClose={() => setExpandedSlug(null)}
            reduceMotion={reduceMotion}
          />
        )}
      </AnimatePresence>
    </>
  );
}
