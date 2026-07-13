"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LuMenu, LuX } from "react-icons/lu";
import { nav } from "@/lib/data";
import MobileNav from "./MobileNav";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  // Only listen for Escape / outside clicks while the mobile drawer is
  // actually open — same attach-while-relevant pattern as the modal in
  // ProjectShowcase.tsx / ProjectDetailPanel.tsx.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    }
    function onPointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  return (
    <header
      ref={rootRef}
      className="nav-glass sticky top-0 z-50 w-full border-b"
      style={{
        borderColor: "var(--color-hairline)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <Link
          href="#top"
          className="font-display text-[15px]"
          style={{ color: "var(--color-ink)" }}
        >
          Shubh Gupta
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[15px] font-medium"
              style={{ color: "var(--color-body)" }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            className="inline-flex h-10 items-center rounded-full px-5 text-[15px] font-medium"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-on-primary)",
            }}
          >
            Résumé
          </a>

          {/* Mobile-only hamburger toggle — the `nav` list above vanishes
              entirely below `sm` with nothing replacing it; this plus
              MobileNav.tsx is that replacement. */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-[var(--color-surface-strong)] sm:hidden"
            style={{ borderColor: "var(--color-hairline-strong)", color: "var(--color-ink)" }}
          >
            {open ? (
              <LuX size={20} aria-hidden="true" />
            ) : (
              <LuMenu size={20} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <MobileNav open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
