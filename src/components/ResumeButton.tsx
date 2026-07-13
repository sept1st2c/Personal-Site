"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { LuDownload, LuExternalLink } from "react-icons/lu";
import { EASE_SMOOTH } from "@/lib/motion";

const RESUME_PATH = "/resume.pdf";

/**
 * Résumé CTA that opens an in-page preview modal instead of the plain
 * `<a href="/resume.pdf">` this used to be — that anchor had no
 * `target="_blank"`, so clicking it navigated the current tab away to the
 * raw PDF (which is what actually made "Download Résumé" read as a
 * download even though no `download` attribute was set). This keeps
 * visitors on the site and gives "view" and "download" as two distinct,
 * clearly labeled actions instead of one ambiguous link. Modal chrome
 * (fixed backdrop, motion.div panel, focus-on-open, scroll lock) matches
 * ProjectDetailPanel.tsx's established pattern.
 *
 * Two things made the first version feel "stuck, can't go back": (1) the
 * close button was a low-contrast surface-strong circle easy to miss next
 * to the bolder Download pill right beside it, and (2) once a visitor
 * clicks into the embedded PDF itself, focus moves into the iframe's own
 * document — a separate browsing context — so the parent page's
 * `window.addEventListener("keydown", ...)` Escape handler below silently
 * stops receiving that keypress; this is a real cross-iframe limitation,
 * not something fixable with more CSS. Escape still works right up until
 * the iframe is clicked, and the backdrop is still click-to-close, but
 * neither is discoverable enough on its own — so the fix that actually
 * matters is making the header's close button impossible to miss (same
 * bold ink-filled treatment as the primary Download action, not a quiet
 * secondary one) and giving mobile a full-bleed layout with more breathing
 * room around it, rather than relying on Escape/backdrop at all.
 *
 * The embedded `<iframe>` covers desktop/most mobile browsers fine, but
 * PDF-in-iframe support on mobile Safari has historically been
 * inconsistent — "Open in new tab" stays visible in the header (not
 * hidden behind any condition) as the reliable fallback to the device's
 * own native full-screen PDF viewer if the inline preview ever looks
 * broken. Note: the PDF viewport's own internal scroll/zoom chrome is
 * native browser UI rendered inside that separate iframe document — it
 * isn't reachable by this site's CSS (including the sitewide thin
 * scrollbar styling in globals.css), so it can't be restyled from here.
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

  const overlayTransition = reduceMotion ? { duration: 0.01 } : { duration: 0.3 };
  const panelTransition = reduceMotion ? { duration: 0.01 } : { duration: 0.5, ease: EASE_SMOOTH };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className} style={style}>
        {children}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[10000] flex items-center justify-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={overlayTransition}
            onClick={() => setOpen(false)}
            style={{ backgroundColor: "color-mix(in srgb, var(--color-canvas-deep) 55%, transparent)" }}
          >
            {/* Full-bleed on mobile (no rounded corners/margin eating into an
                already-small screen) instead of the same floating-card
                treatment desktop uses — a phone-sized "88vh floating panel
                with p-3 margins" left very little breathing room around a
                cramped 3-icon header row. sm+ restores the floating card. */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Résumé preview"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
              transition={panelTransition}
              onClick={(e) => e.stopPropagation()}
              // Height as responsive Tailwind classes, not a blanket inline
              // `style={{ height: ... }}` — an inline style always wins over
              // ANY class at every breakpoint (Tailwind's `sm:h-[88vh]`
              // included), so a single unconditional inline height here
              // silently forced the mobile 100dvh height on desktop too,
              // overflowing the panel ~45px past the viewport and pushing
              // its header (with the close button) off-screen above frame —
              // which is exactly what made the modal read as "broken, can't
              // get back": the one control that mattered was invisible.
              className="relative flex h-[100dvh] w-full flex-col overflow-hidden border-0 sm:h-[88vh] sm:max-w-[860px] sm:rounded-3xl sm:border"
              style={{
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
                    className="hover-lift inline-flex h-10 items-center gap-1.5 rounded-full border px-3 text-[13px] font-medium"
                    style={{ borderColor: "var(--color-hairline-strong)", color: "var(--color-ink)" }}
                  >
                    <LuExternalLink size={14} aria-hidden="true" />
                    <span className="hidden sm:inline">Open in new tab</span>
                  </a>
                  <a
                    href={RESUME_PATH}
                    download
                    aria-label="Download résumé"
                    className="hover-lift inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-[13px] font-medium sm:px-4"
                    style={{ backgroundColor: "var(--color-primary)", color: "var(--color-on-primary)" }}
                  >
                    <LuDownload size={14} aria-hidden="true" />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                  {/* Same bold ink-filled treatment as Download, not a quiet
                      surface-strong circle — this is the one control that
                      always has to work (Escape stops reaching this page
                      once focus is inside the PDF iframe; see the note
                      above), so it can't read as a secondary, skippable
                      action. */}
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close résumé preview"
                    className="hover-lift flex h-10 w-10 shrink-0 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2"
                    style={{
                      backgroundColor: "var(--color-ink)",
                      color: "var(--color-on-primary)",
                      outlineColor: "var(--color-ink)",
                    }}
                  >
                    <IoClose size={20} />
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
