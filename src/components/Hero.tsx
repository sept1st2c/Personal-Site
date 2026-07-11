import { heroTags, person } from "@/lib/data";
import GradientOrb from "./GradientOrb";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto max-w-[1200px] overflow-hidden px-6"
      style={{
        paddingTop: "calc(var(--space-section) * 1.1)",
        paddingBottom: "var(--space-section)",
      }}
    >
      <GradientOrb />

      <div className="fade-in relative max-w-[760px]">
        <p
          className="mb-5 text-[12px] font-semibold uppercase"
          style={{ color: "var(--color-muted)", letterSpacing: "0.96px" }}
        >
          Portfolio
        </p>

        <h1
          className="font-display text-[44px] leading-[1.05] sm:text-[64px]"
          style={{ color: "var(--color-ink)" }}
        >
          {person.name}
        </h1>

        <p
          className="mt-6 max-w-[540px] text-[18px] leading-relaxed"
          style={{ color: "var(--color-body)" }}
        >
          {person.role}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {heroTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3 py-1 text-[12px] font-semibold uppercase"
              style={{
                backgroundColor: "var(--color-surface-strong)",
                color: "var(--color-ink)",
                letterSpacing: "0.96px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="inline-flex h-10 items-center rounded-full px-5 text-[15px] font-medium"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-on-primary)",
            }}
          >
            View Work
          </a>
          <a
            href="/resume.pdf"
            className="inline-flex h-10 items-center rounded-full border px-5 text-[15px] font-medium"
            style={{
              borderColor: "var(--color-hairline-strong)",
              color: "var(--color-ink)",
            }}
          >
            Download Résumé
          </a>
        </div>
      </div>
    </section>
  );
}
