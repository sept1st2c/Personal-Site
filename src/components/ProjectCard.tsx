"use client";

import { SiGithub } from "react-icons/si";
import type { Project } from "@/lib/data";
import StackPill from "./StackPill";
import ProjectGlyph from "./ProjectGlyph";

/**
 * A single project tile in the grid showcase. Every card uses the same
 * layout — screenshot on top at a fixed `aspect-[16/10]`, copy below.
 *
 * An earlier version gave the first/last project a wider "featured"
 * two-column split (image left, copy right) to bookend the grid. Dropped
 * it: with no explicit height tying the two columns together, the image
 * side ended up sized by nothing but the (usually taller) copy side,
 * leaving a lot of plain empty space next to shorter write-ups — visibly
 * inconsistent going stacked -> split -> stacked down the grid. One
 * consistent layout for every tile reads cleaner and fixes that outright.
 *
 * `.above-grain` is applied directly to this component's root element
 * (the `<article>`): that class sets `position: relative; z-index: 2;
 * isolation: isolate`, which is enough on its own to form a new stacking
 * context above the fixed `.grain-layer`.
 */
export default function ProjectCard({
  project,
  expanded,
  onExpand,
}: {
  project: Project;
  expanded: boolean;
  onExpand: () => void;
}) {
  const hero = project.screenshots[0];
  const maxPills = 4;

  return (
    <article
      className="above-grain group relative flex h-full flex-col overflow-hidden rounded-3xl border transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-16px_rgba(12,10,9,0.22)]"
      style={{
        borderColor: "var(--color-hairline)",
        backgroundColor: "var(--color-surface-card)",
      }}
    >
      <button
        type="button"
        onClick={onExpand}
        aria-label={`Expand ${project.name} case study`}
        className="relative block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
        style={{ outlineColor: "var(--color-ink)" }}
      >
        <div
          className="relative aspect-[16/10] w-full overflow-hidden"
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
      </button>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-display text-[22px] sm:text-[24px]" style={{ color: "var(--color-ink)" }}>
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

        <div className="mt-auto flex flex-wrap items-center gap-4 pt-6">
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
      </div>
    </article>
  );
}
