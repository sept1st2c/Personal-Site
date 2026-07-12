"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import ProjectDetailPanel from "./ProjectDetailPanel";

const INITIAL_COUNT = 3;

/**
 * Straightforward project showcase: every project renders as a card in a
 * responsive grid, all the same shape — no dial/selector, no
 * single-focus state to page through, no "featured" wide bookend tiles
 * (that alternating stacked/split/stacked layout left noticeable plain
 * space next to shorter write-ups; see ProjectCard's note). Only the
 * first `INITIAL_COUNT` show by default (six full project write-ups made
 * the section feel very long); a "Show more" toggle reveals the rest.
 *
 * Clicking a card (or its "Explore project" button) opens that project's
 * full case study in a modal, tracked by `expandedSlug`.
 */
export default function ProjectShowcase() {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = !!prefersReducedMotion;
  const expandedProject = projects.find((p) => p.slug === expandedSlug) ?? null;

  const visible = showAll ? projects : projects.slice(0, INITIAL_COUNT);
  const hiddenCount = projects.length - INITIAL_COUNT;

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

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7">
        {visible.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={reduceMotion || i < INITIAL_COUNT ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            // .above-grain here, not just on ProjectCard's inner root: the
            // `animate={{ y: 0 }}` above leaves a persistent non-"none"
            // `transform` on this wrapper, which makes IT a stacking
            // context root — silently trapping ProjectCard's own
            // .above-grain inside a context that never reaches the
            // root-level .grain-layer at all (same bug class found in
            // Hero.tsx's .fade-in wrapper).
            className="above-grain"
          >
            <ProjectCard
              project={project}
              expanded={expandedSlug === project.slug}
              onExpand={() => setExpandedSlug(project.slug)}
            />
          </motion.div>
        ))}
      </div>

      {hiddenCount > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex h-11 items-center gap-2 rounded-full border px-6 text-[14px] font-medium transition-colors hover:bg-[var(--color-surface-strong)]"
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
