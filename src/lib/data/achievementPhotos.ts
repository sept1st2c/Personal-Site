// Real event photos for the Achievements marquee. Captions are
// English-corrected versions of the owner's own reference notes
// (public/achievements/ach1 - Hosted Hacktober fest sessio.txt) — kept
// factual, not embellished. Thumbnails are pre-generated, compressed
// 640x640 crops (see scripts/resize-achievement-photos.js) — the raw
// source photos are camera originals up to ~10MB each, far too large to
// ship as-is for a small hover-scrubbing strip.
export type AchievementPhoto = {
  src: string;
  caption: string;
};

export const achievementPhotos: AchievementPhoto[] = [
  { src: "/achievements/thumbs/ach1.jpg", caption: "Hosted a Hacktoberfest session" },
  { src: "/achievements/thumbs/ach2.jpg", caption: "Project Showcase nominee" },
  { src: "/achievements/thumbs/ach3.jpg", caption: "Hosting team, GDG WoW — IIT Delhi" },
  { src: "/achievements/thumbs/ach4.jpg", caption: "1st place — Hackaccino Hackathon" },
  { src: "/achievements/thumbs/ach5.jpg", caption: "Winner, Project Showcase — Bennett University" },
  { src: "/achievements/thumbs/ach6.jpg", caption: "GDG New Delhi meetup" },
  { src: "/achievements/thumbs/dsc_0430.jpg", caption: "Hosted a GDG BU info session" },
  { src: "/achievements/thumbs/dsc_0664.jpg", caption: "GDG BU team" },
  { src: "/achievements/thumbs/dsc_0653.jpg", caption: "GDG BU media team" },
  { src: "/achievements/thumbs/dsc_0609.jpg", caption: "Hosting team, GDG CareerCon" },
  { src: "/achievements/thumbs/dsc_0618.jpg", caption: "GDG BU CareerCon" },
];
