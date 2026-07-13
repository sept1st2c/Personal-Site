"use client";

import { achievementPhotos } from "@/lib/data/achievementPhotos";

/**
 * A compact, continuously auto-scrolling strip of real event photos —
 * deliberately NOT a grid, so it adds almost no vertical space to the
 * page regardless of how many photos exist (11 today, more later).
 * Hovering (or focusing, for keyboard users) a photo pauses the scroll
 * and reveals its real caption as an overlay.
 *
 * The list is duplicated once so the CSS animation can loop seamlessly
 * (translateX(0) -> translateX(-50%), then jump back unnoticed since the
 * second half is an identical copy of the first).
 */
export default function AchievementsMarquee() {
  const photos = achievementPhotos;

  return (
    <div
      // .above-grain here matters, not just on each thumbnail: the mask
      // (mask-image) on .marquee-mask and the continuous scroll animation
      // on .marquee-track both make their own element a stacking-context
      // root, which traps each thumbnail's own .above-grain inside a
      // LOCAL context that never reaches the root-level .grain-layer at
      // all (same bug class as Hero.tsx's .fade-in wrapper). Elevating
      // this outermost boundary is what actually lets it escape.
      className="above-grain marquee-mask group relative mt-10 -mx-6 overflow-hidden px-6 sm:-mx-0 sm:px-0"
      aria-label="Photos from talks, hackathons, and community events"
    >
      <div className="marquee-track flex w-max gap-3 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
        {[...photos, ...photos].map((photo, i) => (
          <div
            key={`${photo.src}-${i}`}
            tabIndex={0}
            className="above-grain group/item relative h-28 w-40 shrink-0 overflow-hidden rounded-xl border focus-visible:outline focus-visible:outline-2"
            style={{ borderColor: "var(--color-hairline)", outlineColor: "var(--color-ink)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- pre-compressed local thumbnails, no next/image benefit for a decorative marquee */}
            <img
              src={photo.src}
              alt={photo.caption}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover/item:scale-110"
            />
            <div
              className="pointer-events-none absolute inset-0 flex items-end p-2.5 opacity-0 transition-opacity duration-200 group-hover/item:opacity-100 group-focus-visible/item:opacity-100"
              style={{
                background:
                  "linear-gradient(to top, color-mix(in srgb, var(--color-ink) 82%, transparent), transparent 65%)",
              }}
            >
              <p className="text-[12px] font-medium leading-snug" style={{ color: "var(--color-on-primary)" }}>
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
