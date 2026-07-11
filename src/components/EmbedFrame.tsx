"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders a live project inside an iframe with a graceful degrade path.
 *
 * Honest limitation: cross-origin iframes are opaque to JS — we cannot
 * inspect what actually rendered inside them (blank page, error page, a
 * third-party SSO login screen, etc). The `onLoad`/timeout combo below
 * catches the case where the frame never finishes loading at all (verified:
 * this correctly fires for a real X-Frame-Options: DENY response). It
 * cannot detect "loaded successfully, but shows the wrong thing" (e.g. a
 * Vercel deployment-protection redirect, which *does* finish loading) — for
 * projects where that's a known current condition, pass `startFailed` to
 * skip straight to the fallback card.
 *
 * The iframe is only mounted once it scrolls near the viewport (via
 * IntersectionObserver) and the fail-timer only starts at that point too —
 * decoupling them (e.g. via the browser's native `loading="lazy"`, whose
 * fetch can be deferred well past mount) would let the timer expire before
 * the browser had even started loading the frame.
 */
export default function EmbedFrame({
  src,
  title,
  timeoutMs = 9000,
  startFailed = false,
  fallbackLabel = "View live project",
  fallbackHref,
}: {
  src: string;
  title: string;
  timeoutMs?: number;
  startFailed?: boolean;
  fallbackLabel?: string;
  fallbackHref?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [status, setStatus] = useState<"loading" | "loaded" | "failed">(
    startFailed ? "failed" : "loading"
  );

  useEffect(() => {
    if (startFailed || !containerRef.current) return;
    const el = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [startFailed]);

  useEffect(() => {
    if (startFailed || !inView) return;
    const timer = window.setTimeout(() => {
      setStatus((s) => (s === "loading" ? "failed" : s));
    }, timeoutMs);
    return () => window.clearTimeout(timer);
  }, [startFailed, inView, timeoutMs]);

  if (status === "failed") {
    return (
      <a
        href={fallbackHref ?? src}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full min-h-[220px] w-full flex-col items-center justify-center gap-2 text-center transition-colors"
        style={{ backgroundColor: "var(--color-canvas-soft)" }}
      >
        <span
          className="text-[15px] font-medium"
          style={{ color: "var(--color-ink)" }}
        >
          {fallbackLabel} ↗
        </span>
        <span className="text-[13px]" style={{ color: "var(--color-muted)" }}>
          Live preview unavailable to embed right now
        </span>
      </a>
    );
  }

  return (
    <div ref={containerRef} className="h-full w-full">
      {inView && (
        <iframe
          src={src}
          title={title}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("failed")}
          className="h-full w-full"
          style={{ border: "none", display: "block" }}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          allow="camera; microphone; autoplay; clipboard-write; fullscreen"
        />
      )}
    </div>
  );
}
