"use client";

import { motion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import type { Project } from "@/lib/data";
import StackPill from "./StackPill";
import ProjectGlyph from "./ProjectGlyph";

/**
 * A single project tile in the grid showcase. Two layout variants:
 *
 * - Default: stacked — screenshot on top (fixed `aspect-[16/10]`), copy
 *   below.
 * - `featured`: a wider two-column split at `sm+` (image left, copy
 *   right) spanning both grid columns — used only for the one card that
 *   would otherwise be left alone in its row (an odd visible count in a
 *   2-up grid), so it fills the row instead of leaving the other half
 *   blank. An earlier version of this stretched the image to `h-full` of
 *   an undefined parent height, which resolved to near-zero and left a
 *   lot of empty space next to the copy column. Fixed by giving the
 *   image a real intrinsic height via `aspect-[4/3]` on its own width
 *   instead, and vertically centering the copy column so any leftover
 *   height reads as intentional breathing room, not a bug.
 *
 * `layout` (from framer-motion) on the root and on the image/copy
 * containers lets ProjectShowcase animate a card smoothly between the
 * featured and stacked shapes when "Show more" changes which card (if
 * any) is the odd one out, instead of it snapping between two very
 * different box shapes.
 *
 * `.above-grain` is applied directly to this component's root element:
 * that class sets `position: relative; z-index: 2; isolation: isolate`,
 * which is enough on its own to form a new stacking context above the
 * fixed `.grain-layer`.
 */
export default function ProjectCard({
  project,
  featured = false,
  expanded,
  onExpand,
}: {
  project: Project;
  featured?: boolean;
  expanded: boolean;
  onExpand: () => void;
}) {
  const hero = project.screenshots[0];
  const maxPills = featured ? 6 : 4;

  return (
    <motion.article
      layout
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`above-grain group relative flex h-full flex-col overflow-hidden rounded-3xl border transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-16px_rgba(12,10,9,0.22)] ${
        featured ? "sm:flex-row" : ""
      }`}
      style={{
        borderColor: "var(--color-hairline)",
        backgroundColor: "var(--color-surface-card)",
      }}
    >
      <motion.button
        layout
        type="button"
        onClick={onExpand}
        aria-label={`Expand ${project.name} case study`}
        className={`relative block text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] ${
          featured ? "sm:w-[42%] sm:shrink-0" : "w-full"
        }`}
        style={{ outlineColor: "var(--color-ink)" }}
      >
        <div
          className={`relative w-full overflow-hidden ${featured ? "aspect-[16/10] sm:aspect-[4/3]" : "aspect-[16/10]"}`}
          style={{ backgroundColor: "var(--color-canvas-soft)" }}
        >
          {hero && !expanded && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={hero}
              alt={`${project.name} screenshot`}
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
            />
          )}
          {!hero && <ProjectGlyph className="absolute inset-0" />}

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-5 py-3 text-[13px] font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(to top, color-mix(in srgb, var(--color-ink) 70%, transparent), transparent)",
              color: "var(--color-on-primary)",
            }}
          >
            <span>View full case study</span>
            <span aria-hidden="true">↗</span>
          </div>
        </div>
      </motion.button>

      <motion.div
        layout
        className={`flex flex-1 flex-col p-6 sm:p-7 ${featured ? "justify-center" : ""}`}
      >
        <h3
          className={`font-display ${featured ? "text-[26px] sm:text-[30px]" : "text-[22px] sm:text-[24px]"}`}
          style={{ color: "var(--color-ink)" }}
        >
          {project.name}
        </h3>
        <p className="mt-2 text-[14px] leading-relaxed" style={{ color: "var(--color-muted)" }}>
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.slice(0, maxPills).map((s) => (
            <StackPill key={s} label={s} size="sm" />
          ))}
          {project.stack.length > maxPills && (
            <span
              className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium"
              style={{ color: "var(--color-muted-soft)" }}
            >
              +{project.stack.length - maxPills} more
            </span>
          )}
        </div>

        <div className={`flex flex-wrap items-center gap-4 ${featured ? "mt-6" : "mt-auto pt-6"}`}>
          <button
            type="button"
            onClick={onExpand}
            className="inline-flex h-9 items-center rounded-full px-4 text-[13px] font-medium"
            style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
          >
            Explore project
          </button>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[13px] font-medium"
              style={{ color: "var(--color-ink)" }}
            >
              Live ↗
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-[13px] font-medium"
              style={{ color: "var(--color-ink)" }}
            >
              <SiGithub size={14} aria-hidden="true" />
              View on GitHub ↗
            </a>
          )}
        </div>
      </motion.div>
    </motion.article>
  );
}
