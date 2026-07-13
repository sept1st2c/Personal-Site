"use client";

import { motion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import type { Project } from "@/lib/data";
import StackPill from "./StackPill";
import ProjectGlyph from "./ProjectGlyph";
import { PopGroup, PopItem } from "./PopGroup";
import { EASE_SMOOTH } from "@/lib/motion";

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
 * The hover lift (`whileHover={{ y: -4 }}`) intentionally lives on the
 * SAME root element as `layout`, driven entirely by framer-motion (not a
 * CSS `hover:-translate-y-*` class). Both used to fight over the
 * `transform` property: a CSS transition and framer-motion's per-frame
 * layout-projection transform each think they own it, and if the cursor
 * ends up sitting over this card while it's mid-reflow (e.g. right after
 * clicking "Show more" — the mouse doesn't move, but the card slides
 * underneath it), the CSS transition restarts every frame against
 * framer-motion's continuously-updating value, producing a visible
 * stutter/jump (reproduced and confirmed via rapid-fire screenshots
 * during the Tapi featured<->stacked transition). Keep any future hover/
 * tap affordance here as a framer-motion gesture prop, not a Tailwind
 * `transition`/`hover:` class, so there is only ever one engine driving
 * `transform` on this element. box-shadow is unaffected by this and can
 * stay a plain CSS transition since framer-motion never touches it.
 *
 * `.above-grain` is applied directly to this component's root element:
 * that class sets `position: relative; z-index: 2; isolation: isolate`,
 * which is enough on its own to form a new stacking context above the
 * fixed `.grain-layer`.
 *
 * `whileTap` on the root and the image button gives touch devices their
 * own press-down feedback — `whileHover`'s lift never fires on a tap, so
 * without this, tapping a card (most visitors' actual path to it, since
 * this is a phone-first audience) produced no visual response at all
 * until the modal finished opening. Framer-motion-only for the same
 * reason as `whileHover` above: one engine driving `transform` here.
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
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        // Scoped per-property: the layout FLIP animation (position/size
        // change between featured and stacked) keeps its slower, eased
        // duration, while the hover lift gets its own snappier default.
        // Previously the hover lift was a *CSS* transition
        // (`transition-[transform] hover:-translate-y-1`) living on this
        // same element as framer-motion's `layout` transform — both
        // engines fought for ownership of the `transform` property. If
        // the cursor happened to end up over this card mid-reflow (e.g.
        // right after clicking "Show more", the mouse doesn't move, but
        // Tapi's card slides underneath it), the CSS transition would
        // restart every animation frame against framer-motion's
        // continuously-updating inline transform, producing the
        // stutter/jump. Moving the hover lift into `whileHover` puts
        // both animations under framer-motion's single authority, so
        // they compose instead of racing.
        layout: { duration: 0.5, ease: EASE_SMOOTH },
        default: { duration: 0.25, ease: EASE_SMOOTH },
      }}
      className={`above-grain group relative flex h-full flex-col overflow-hidden rounded-3xl border transition-[box-shadow,border-color] duration-300 hover:border-[var(--color-hairline-strong)] hover:shadow-[0_20px_45px_-16px_rgba(12,10,9,0.22)] ${
        featured ? "sm:flex-row" : ""
      }`}
      style={{
        borderColor: "var(--color-hairline)",
        backgroundColor: "var(--color-surface-card)",
      }}
    >
      <motion.button
        layout
        whileTap={{ scale: 0.98 }}
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
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.07]"
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

        <PopGroup className="mt-4 flex flex-wrap gap-2" stagger={0.04}>
          {project.stack.slice(0, maxPills).map((s) => (
            <PopItem key={s}>
              <StackPill label={s} size="sm" />
            </PopItem>
          ))}
          {project.stack.length > maxPills && (
            <PopItem
              className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium"
              style={{ color: "var(--color-muted-soft)" }}
            >
              +{project.stack.length - maxPills} more
            </PopItem>
          )}
        </PopGroup>

        <div className={`flex flex-wrap items-center gap-4 ${featured ? "mt-6" : "mt-auto pt-6"}`}>
          <button
            type="button"
            onClick={onExpand}
            className="hover-lift inline-flex h-9 items-center rounded-full px-4 text-[13px] font-medium"
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
              className="link-underline text-[13px] font-medium"
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
              className="link-underline inline-flex items-center gap-1.5 text-[13px] font-medium"
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
