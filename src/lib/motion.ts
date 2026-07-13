// Shared animation tuning for the whole site — one place to calibrate feel
// instead of each component hardcoding its own slightly different numbers
// (which is how "harsh"/"too subtle" crept in unevenly across the site).
//
// EASE_SMOOTH replaces the old [0.16, 1, 0.3, 1] curve (a near-exact match
// for the "easeOutExpo" preset — a very fast initial burst, then a long
// slow settle). That burst reads as a snap/jolt when paired with the short
// 0.35-0.5s durations most components used, especially stacked across a
// fast stagger. This curve decelerates more evenly across the whole
// duration instead of front-loading almost all of the motion into the
// first instant.
export const EASE_SMOOTH = [0.25, 1, 0.5, 1] as const;

// Text (headings, paragraphs — Reveal.tsx, Section.tsx): a noticeably
// longer duration and larger travel distance than the old 0.5s/16px, since
// "the text animations are very subtle" was the direct complaint — small
// UI chrome can get away with a quick, small move, but a heading or
// paragraph needs to actually read as motion, not a barely-there flicker.
export const TEXT_TRANSITION = { duration: 0.7, ease: EASE_SMOOTH };
export const TEXT_Y = 26;

// Small objects (icons, pills, badges — PopGroup/PopItem, SocialLinks):
// slower than before (was 0.35-0.45s) and a gentler scale delta (was
// 0.75-0.92 -> 1, a sharp little "zoom" especially at 0.75; now 0.9 -> 1 —
// still a perceptible pop, just eased in over more time instead of
// snapping) so multiple items popping in back-to-back reads as a soft
// cascade instead of a flurry of jolts.
export const POP_TRANSITION = { duration: 0.55, ease: EASE_SMOOTH };
export const POP_SCALE_FROM = 0.9;
