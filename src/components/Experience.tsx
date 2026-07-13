"use client";

import { motion, useReducedMotion } from "framer-motion";
import { experience } from "@/lib/data";
import Section from "./Section";
import CompanyFavicon from "./CompanyFavicon";

// Stagger increment between consecutive rows' scroll-reveal delay.
const ROW_STAGGER_S = 0.07;

// Two-letter monogram from a company name — e.g. "Vitalis Capital" -> "VC",
// "Tago" -> "TA". No logo image assets exist for any employer, so a clean
// typographic monogram stands in rather than a fabricated logo.
function monogram(name: string) {
  const words = name.split(" ").filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export default function Experience() {
  const reduceMotion = !!useReducedMotion();

  return (
    <Section id="experience" label="Experience" title="Where I've worked">
        <div>
          {experience.map((item, i) => {
            const isLast = i === experience.length - 1;
            return (
              // Each row cascades in as the section scrolls into view —
              // whileInView (not animate) so it triggers on scroll rather
              // than firing once for whatever happens to already be on
              // screen at load, matching the pattern in Section.tsx and
              // ProjectShowcase.tsx. Staggered per-row via `delay: i *
              // ROW_STAGGER_S` so rows cascade rather than popping in at
              // once. This is the row div itself (not an extra wrapper
              // around it) so the marker/line flex column inside is
              // untouched — a wrapping element here would risk offsetting
              // the rail line, which spans from this row's marker down to
              // the next row's marker via plain document flow.
              <motion.div
                key={item.company}
                className="relative flex gap-5 sm:gap-6"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: reduceMotion ? 0 : i * ROW_STAGGER_S,
                }}
              >
                {/* rail + monogram marker */}
                <div className="relative flex w-10 flex-none flex-col items-center">
                  <CompanyFavicon url={item.url} monogram={monogram(item.company)} logo={item.logo} />
                  {!isLast && (
                    <div
                      className="mt-2 w-px flex-1"
                      // var(--color-hairline-strong) (#d6d3d1) is still an
                      // opaque near-white gray — measured too faint against
                      // the canvas/atmosphere-gradient background to read as
                      // a connecting line (see Playwright screenshot
                      // comparison). An ink-based rgba reads noticeably
                      // darker/clearer at both 1440px and 390px without
                      // going as heavy as a solid dark line.
                      style={{ backgroundColor: "rgba(12, 10, 9, 0.28)" }}
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* content */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group -mx-4 -mt-3 mb-6 flex-1 rounded-xl px-4 pb-8 pt-3 transition-colors hover:bg-[var(--color-surface-strong)]"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3
                        className="text-title-md"
                        style={{ color: "var(--color-ink)", fontWeight: 700 }}
                      >
                        {item.company}
                        <span
                          className="ml-1 inline-block transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        >
                          ↗
                        </span>
                      </h3>
                      <span
                        className="text-title-sm"
                        style={{ color: "var(--color-muted)" }}
                      >
                        {item.role}
                      </span>
                    </div>
                    <span
                      className="text-caption tabular-nums sm:text-right"
                      style={{ color: "var(--color-muted-soft)" }}
                    >
                      {item.period}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="max-w-[720px] text-[16px] leading-[1.5]"
                        style={{ color: "var(--color-body)" }}
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </a>
              </motion.div>
            );
          })}
        </div>
      </Section>
  );
}
