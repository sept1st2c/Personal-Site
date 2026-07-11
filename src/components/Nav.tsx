import Link from "next/link";
import { nav } from "@/lib/data";

export default function Nav() {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b"
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-canvas) 92%, transparent)",
        borderColor: "var(--color-hairline)",
        backdropFilter: "blur(6px)",
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
      </div>
    </header>
  );
}
