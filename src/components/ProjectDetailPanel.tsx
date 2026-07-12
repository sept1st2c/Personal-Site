"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { SiGithub } from "react-icons/si";
import type { Project } from "@/lib/data";
import StackPill from "./StackPill";
import ProjectGlyph from "./ProjectGlyph";

/**
 * Full case-study modal, opened from a grid card in ProjectShowcase.
 *
 * This used to share a `layoutId` with the card's hero image so opening
 * the modal read as that image growing in place. The grid redesign gives
 * the first/last "featured" cards a wider, non-16/10 image slot at `sm+`
 * (see ProjectCard), so the shared element could no longer assume one
 * consistent aspect ratio between card and modal without warping
 * mid-transition. Simple fade/scale-in (below) reads just as clean in a
 * grid of independent tiles, so the shared-element transition was
 * dropped rather than fought.
 */
export default function ProjectDetailPanel({
  project,
  onClose,
  reduceMotion,
}: {
  project: Project;
  onClose: () => void;
  reduceMotion: boolean;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [hero, ...rest] = project.screenshots;

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  const overlayTransition = reduceMotion ? { duration: 0.01 } : { duration: 0.25 };
  const panelTransition = reduceMotion
    ? { duration: 0.01 }
    : { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={overlayTransition}
      onClick={onClose}
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-canvas-deep) 55%, transparent)",
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`project-detail-${project.slug}`}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
        transition={panelTransition}
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-full max-w-[900px] flex-col overflow-hidden rounded-3xl border"
        style={{
          maxHeight: "88vh",
          borderColor: "var(--color-hairline)",
          backgroundColor: "var(--color-surface-card)",
        }}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close project detail"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2"
          style={{ backgroundColor: "var(--color-surface-card)", color: "var(--color-ink)", outlineColor: "var(--color-ink)" }}
        >
          <IoClose size={18} />
        </button>

        <div className="overflow-y-auto">
          <div
            className="relative aspect-[16/10] w-full overflow-hidden"
            style={{ backgroundColor: "var(--color-canvas-soft)" }}
          >
            {hero ? (
              <div className="absolute inset-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={hero}
                  alt={`${project.name} landing screenshot`}
                  className="h-full w-full object-cover object-top"
                />
              </div>
            ) : (
              <ProjectGlyph className="absolute inset-0" />
            )}
          </div>

          <div className="p-6 sm:p-9">
            <p
              className="text-[12px] font-semibold uppercase"
              style={{ color: "var(--color-muted)", letterSpacing: "0.96px" }}
            >
              {project.description}
            </p>
            <h3
              id={`project-detail-${project.slug}`}
              className="font-display mt-2 text-[32px] sm:text-[40px]"
              style={{ color: "var(--color-ink)" }}
            >
              {project.name}
            </h3>

            {project.note && (
              <p
                className="mt-4 rounded-xl border px-4 py-3 text-[13px] leading-relaxed"
                style={{
                  borderColor: "var(--color-hairline)",
                  backgroundColor: "var(--color-canvas-soft)",
                  color: "var(--color-muted)",
                }}
              >
                {project.note}
              </p>
            )}

            <ul className="mt-6 space-y-2.5">
              {project.bullets.map((b) => (
                <li
                  key={b}
                  className="text-[15px] leading-relaxed"
                  style={{ color: "var(--color-body)" }}
                >
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <StackPill key={s} label={s} />
              ))}
            </div>

            {rest.length > 0 && (
              <div className="mt-8">
                <p
                  className="mb-3 text-[12px] font-semibold uppercase"
                  style={{ color: "var(--color-muted)", letterSpacing: "0.96px" }}
                >
                  More from the product
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {rest.map((src) => (
                    <div
                      key={src}
                      className="overflow-hidden rounded-xl border"
                      style={{ borderColor: "var(--color-hairline)" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={`${project.name} additional screenshot`}
                        className="h-full w-full object-cover object-top"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3 border-t pt-6" style={{ borderColor: "var(--color-hairline)" }}>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center rounded-full px-5 text-[14px] font-medium"
                  style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
                >
                  Open live project ↗
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-full border px-5 text-[14px] font-medium"
                  style={{ borderColor: "var(--color-hairline-strong)", color: "var(--color-ink)" }}
                >
                  <SiGithub size={15} aria-hidden="true" />
                  View on GitHub ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
