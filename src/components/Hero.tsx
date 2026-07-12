import Image from "next/image";
import { LuDownload, LuGraduationCap } from "react-icons/lu";
import { education, heroTags, person } from "@/lib/data";
import TechBadge from "./TechBadge";

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
      {/* Two-column on desktop (text left, portrait right) via
          lg:flex-row-reverse — the photo is first in markup so it stacks
          on top on mobile/tablet, then flips to the right on lg+ without
          needing separate mobile/desktop markup. A small 96px avatar felt
          like an afterthought here; this gives the photo real presence. */}
      {/* .above-grain here (not just on the photo/H1 individually) matters:
          .fade-in's entrance animation ends on `transform: translateY(0)` —
          a non-"none" transform value, which per spec makes this div a
          stacking-context root on its own regardless of z-index. That
          silently trapped the photo's and H1's own .above-grain (z-index:2)
          inside a LOCAL context that never gets compared against the
          root-level .grain-layer at all, so grain still rendered on top of
          the photo despite it. Elevating this outer boundary is what
          actually lets everything inside escape grain. */}
      <div className="above-grain fade-in flex flex-col gap-10 lg:flex-row-reverse lg:items-center lg:justify-between lg:gap-16">
        <div className="mx-auto w-full max-w-[280px] shrink-0 sm:max-w-[320px] lg:mx-0 lg:w-[360px] lg:max-w-none">
          <div
            className="above-grain overflow-hidden rounded-[28px] border shadow-[0_24px_60px_-24px_rgba(12,10,9,0.28)]"
            style={{
              borderColor: "var(--color-hairline-strong)",
              backgroundColor: "var(--color-canvas-soft)",
              aspectRatio: "4 / 5",
            }}
          >
            <Image
              src="/shubh-gupta.jpg"
              alt="Shubh Gupta"
              width={720}
              height={900}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          {/* A plain "Portfolio" label read as a dry section tag; a
              conversational opener suits the hero better. Bumped past
              caption size and off the tracked-uppercase treatment (which
              would've made "Hey, I'm" read like a stiff eyebrow label, not
              a greeting), with "Hey" carrying the ink color as the one bit
              of emphasis in the line. */}
          <p className="mb-4 text-[19px]" style={{ color: "var(--color-body)" }}>
            <span style={{ color: "var(--color-ink)", fontWeight: 600 }}>Hey,</span> I&rsquo;m
          </p>

          {/* Hero H1 ~ display-mega: the largest, tightest-tracked type
              moment on the page — visibly a size class above section heads.
              `.above-grain` keeps it crisp where it overlaps the atmosphere
              gradient — without it, the soft-light grain blend directly on
              the dark text pixels reads as a faint, washed-out tint there. */}
          <h1
            className="above-grain font-display tracking-display-mega text-[36px] leading-[1.05] sm:text-[52px] lg:text-[60px]"
            style={{ color: "var(--color-ink)" }}
          >
            {person.name}
          </h1>

          {/* Role subhead ~ title-sm: a real step down from the hero, and a
              step up from body copy — was a plain body paragraph before. */}
          <p
            className="text-title-sm mt-6 max-w-[540px]"
            style={{ color: "var(--color-body)" }}
          >
            {person.role}
          </p>

          {/* Education: set high (right under the role line, not buried at
              the bottom) and styled with real weight instead of a tiny
              muted caption, per the site owner's request. The school name
              carries the emphasis; the degree/CGPA detail steps back to a
              lighter weight and muted color so it reads as supporting
              detail, not competing with "Bennett University" for
              attention. */}
          <div className="mt-5 flex items-center gap-2.5">
            <LuGraduationCap
              size={20}
              aria-hidden="true"
              style={{ color: "var(--color-ink)", flexShrink: 0 }}
            />
            <p className="text-title-sm">
              <span style={{ color: "var(--color-body-strong)", fontWeight: 600 }}>
                {education.school}
              </span>
              <span style={{ color: "var(--color-muted)", fontWeight: 400 }}>
                {" "}
                — {education.degree} · {education.cgpa}
              </span>
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {heroTags.map((tag) => (
              <TechBadge key={tag} label={tag} />
            ))}
          </div>

          {/* Download Résumé is the emphasized/primary action here — the
              site owner flagged the outline treatment as getting too little
              attention. "View Work" steps back to the outline slot. */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="/resume.pdf"
              className="inline-flex h-11 items-center gap-2 rounded-full px-6 text-[15px] font-semibold"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-on-primary)",
              }}
            >
              <LuDownload size={17} aria-hidden="true" />
              Download Résumé
            </a>
            <a
              href="#projects"
              className="inline-flex h-11 items-center rounded-full border px-6 text-[15px] font-medium"
              style={{
                borderColor: "var(--color-hairline-strong)",
                color: "var(--color-ink)",
              }}
            >
              View Work
            </a>
            <a
              href="#experience"
              className="inline-flex h-11 items-center rounded-full border px-6 text-[15px] font-medium"
              style={{
                borderColor: "var(--color-hairline-strong)",
                color: "var(--color-ink)",
              }}
            >
              Experience
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
