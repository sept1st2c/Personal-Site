"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { LuFileText, LuGraduationCap } from "react-icons/lu";
import { education, heroTags, person } from "@/lib/data";
import HeroTags from "./HeroTags";
import SocialLinks from "./SocialLinks";
import ResumeButton from "./ResumeButton";
import { EASE_SMOOTH } from "@/lib/motion";

export default function Hero() {
  const reduceMotion = !!useReducedMotion();

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
          like an afterthought here; this gives the photo real presence.
          This is the first thing a visitor sees, so — unlike everywhere
          else on the site, which reveals as a single block — every piece
          here (photo, greeting, name, role, tags, CTAs, socials,
          education) now animates in as its own choreographed step instead
          of the whole column arriving as one flat block. */}
      <div className="flex flex-col gap-10 lg:flex-row-reverse lg:items-center lg:justify-between lg:gap-16">
        {/* Smaller on phones on purpose: the photo doesn't need to dominate
            the fold there — the info below it (name, role, tags, CTAs) is
            what a cold-outreach recipient actually came to scan, so it gets
            priority over a large portrait on narrow viewports. */}
        <div className="mx-auto w-full max-w-[180px] shrink-0 sm:max-w-[260px] lg:mx-0 lg:w-[360px] lg:max-w-none">
          <motion.div
            className="above-grain overflow-hidden rounded-[28px] border shadow-[0_24px_60px_-24px_rgba(12,10,9,0.28)]"
            style={{
              borderColor: "var(--color-hairline-strong)",
              backgroundColor: "var(--color-canvas-soft)",
              aspectRatio: "4 / 5",
            }}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE_SMOOTH, delay: reduceMotion ? 0 : 0.1 }}
          >
            <Image
              src="/shubh-gupta.jpg"
              alt="Shubh Gupta"
              width={720}
              height={900}
              className="h-full w-full object-cover"
              priority
            />
          </motion.div>
        </div>

        {/* flex flex-col + explicit order-* below: at <640px this column was
            measured (via Playwright getBoundingClientRect at 390px width)
            to push the social icon row to roughly y=898px — past a
            standard 844px-tall phone viewport's fold — because the photo,
            name, role line, all 15 wrapped heroTags badges, and the
            (also-wrapping-at-this-width) 3-button CTA row all sit above it
            first. Not a clipping/collapse bug: every ancestor computed
            `overflow: visible` and the row itself had a normal 342x40 rect
            — it was simply buried under too much content to reach on
            first paint. order-* reprioritizes it right after the role
            line on narrow screens only (default, unprefixed classes);
            `sm:` restores the original tags -> CTAs -> socials order once
            there's enough width that wrapping — and the height it adds —
            is no longer the problem. */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* A plain "Portfolio" label read as a dry section tag; a
              conversational opener suits the hero better. Bumped past
              caption size and off the tracked-uppercase treatment (which
              would've made "Hey, I'm" read like a stiff eyebrow label, not
              a greeting). */}
          <motion.p
            className="order-1 mb-4 text-[19px]"
            style={{ color: "var(--color-body)" }}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE_SMOOTH, delay: reduceMotion ? 0 : 0.05 }}
          >
            <span style={{ marginRight: "0.35em" }}>Hey,</span>
            I&rsquo;m
          </motion.p>

          {/* Hero H1 ~ display-mega: the largest, tightest-tracked type
              moment on the page — visibly a size class above section heads,
              and the single most prominent thing a visitor sees. Gets its
              own signature "curtain" reveal (an overflow-hidden mask with
              the text itself sliding up from below into view) rather than
              the plain fade+slide every other line uses, since this is the
              one piece of the page that should feel like a deliberate
              moment, not just another list item settling into place.
              `.above-grain` keeps it crisp where it overlaps the atmosphere
              gradient — without it, the soft-light grain blend directly on
              the dark text pixels reads as a faint, washed-out tint there.
              overflow-hidden on the wrapper doesn't itself create a new
              stacking context (no transform/opacity/filter of its own), so
              .above-grain staying directly on the h1 is still correct — the
              clipping box is just a mask, not an intervening context. */}
          <div className="order-2 overflow-hidden">
            <motion.h1
              className="above-grain font-display tracking-display-mega text-[36px] leading-[1.05] sm:text-[52px] lg:text-[60px]"
              style={{ color: "var(--color-ink)" }}
              initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.75, ease: EASE_SMOOTH, delay: reduceMotion ? 0 : 0.15 }}
            >
              {person.name}
            </motion.h1>
          </div>

          {/* Role subhead ~ title-sm: a real step down from the hero, and a
              step up from body copy — was a plain body paragraph before. */}
          <motion.p
            className="text-title-sm order-3 mt-6 max-w-[540px]"
            style={{ color: "var(--color-body)" }}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_SMOOTH, delay: reduceMotion ? 0 : 0.35 }}
          >
            {person.role}
          </motion.p>

          <HeroTags tags={heroTags} />

          {/* Résumé is the emphasized/primary action here — the site owner
              flagged the outline treatment as getting too little attention.
              "View Work" steps back to the outline slot. Opens an in-page
              preview (ResumeButton) rather than navigating away to the raw
              PDF, with "download" as its own explicit action inside that
              preview instead of being the only thing this button did. */}
          <motion.div
            className="order-6 mt-10 flex flex-wrap items-center gap-4 sm:order-5"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_SMOOTH, delay: reduceMotion ? 0 : 0.55 }}
          >
            <ResumeButton
              className="hover-lift inline-flex h-11 items-center gap-2 rounded-full px-6 text-[15px] font-semibold"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-on-primary)",
              }}
            >
              <LuFileText size={17} aria-hidden="true" />
              View Résumé
            </ResumeButton>
            <a
              href="#projects"
              className="hover-lift inline-flex h-11 items-center rounded-full border px-6 text-[15px] font-medium"
              style={{
                borderColor: "var(--color-hairline-strong)",
                color: "var(--color-ink)",
              }}
            >
              View Work
            </a>
            <a
              href="#experience"
              className="hover-lift inline-flex h-11 items-center rounded-full border px-6 text-[15px] font-medium"
              style={{
                borderColor: "var(--color-hairline-strong)",
                color: "var(--color-ink)",
              }}
            >
              Experience
            </a>
          </motion.div>

          <div className="order-4 mt-6 sm:order-6">
            <SocialLinks />
          </div>

          {/* Education: moved below the CTAs/socials per the site owner's
              request (it previously sat right under the role line). Same
              treatment as before — school name carries the emphasis, the
              degree/CGPA detail steps back to a lighter weight and muted
              color so it reads as supporting detail. */}
          <motion.div
            className="order-7 mt-6 flex items-center gap-2.5"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_SMOOTH, delay: reduceMotion ? 0 : 0.75 }}
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
