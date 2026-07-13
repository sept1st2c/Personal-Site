"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { LuDownload, LuExternalLink } from "react-icons/lu";

const RESUME_PATH = "/resume.pdf";

/**
 * Résumé CTA that opens an in-page preview modal instead of the plain
 * `<a href="/resume.pdf">` this used to be — that anchor had no
 * `target="_blank"`, so clicking it navigated the current tab away to the
 * raw PDF (which is what actually made "Download Résumé" read as a
 * download even though no `download` attribute was set). This keeps
 * visitors on the site and gives "view" and "download" as two distinct,
 * clearly labeled actions instead of one ambiguous link. Modal chrome
 * (fixed backdrop, motion.div panel, Escape-to-close, focus-on-open,
 * scroll lock) matches ProjectDetailPanel.tsx's established pattern.
 *
 * The embedded `<iframe>` covers desktop/most mobile browsers fine, but
 * PDF-in-iframe support on mobile Safari has historically been
 * inconsistent — "Open in new tab" stays visible in the header (not
 * hidden behind any condition) as the reliable fallback to the device's
 * own native full-screen PDF viewer if the inline preview ever looks
 * broken.
 */
export default function ResumeButton({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = !!prefersReducedMotion;

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (open) closeButtonRef.current?.focus();
  }, [open]);

  const overlayTransition = reduceMotion ? { duration: 0.01 } : { duration: 0.25 };
  const panelTransition = reduceMotion
    ? { duration: 0.01 }
    : { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className} style={style}>
        {children}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={overlayTransition}
            onClick={() => setOpen(false)}
            style={{ backgroundColor: "color-mix(in srgb, var(--color-canvas-deep) 55%, transparent)" }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Résumé preview"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
              transition={panelTransition}
              onClick={(e) => e.stopPropagation()}
              className="relative flex w-full max-w-[860px] flex-col overflow-hidden rounded-3xl border"
              style={{
                height: "88vh",
                borderColor: "var(--color-hairline)",
                backgroundColor: "var(--color-surface-card)",
              }}
            >
              <div
                className="flex items-center justify-between gap-2 border-b px-4 py-3 sm:px-5"
                style={{ borderColor: "var(--color-hairline)" }}
              >
                <p className="text-[14px] font-medium" style={{ color: "var(--color-ink)" }}>
                  Résumé
                </p>
                <div className="flex items-center gap-2">
                  <a
                    href={RESUME_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open résumé in a new tab"
                    className="hover-lift inline-flex h-9 items-center gap-1.5 rounded-full border px-3 text-[13px] font-medium"
                    style={{ borderColor: "var(--color-hairline-strong)", color: "var(--color-ink)" }}
                  >
                    <LuExternalLink size={14} aria-hidden="true" />
                    <span className="hidden sm:inline">Open in new tab</span>
                  </a>
                  <a
                    href={RESUME_PATH}
                    download
                    aria-label="Download résumé"
                    className="hover-lift inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-[13px] font-medium sm:px-4"
                    style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
                  >
                    <LuDownload size={14} aria-hidden="true" />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close résumé preview"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2"
                    style={{
                      backgroundColor: "var(--color-surface-strong)",
                      color: "var(--color-ink)",
                      outlineColor: "var(--color-ink)",
                    }}
                  >
                    <IoClose size={16} />
                  </button>
                </div>
              </div>

              <iframe
                src={`${RESUME_PATH}#toolbar=0`}
                title="Shubh Gupta's résumé"
                className="flex-1"
                style={{ backgroundColor: "var(--color-canvas-soft)", border: "none" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
