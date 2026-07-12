// LinkedIn "Latest on LinkedIn" section data.
//
// This used to embed LinkedIn's official iframe
// (linkedin.com/embed/feed/update/{urn}), then dropped that in favor of
// text-only excerpt cards (the iframe depends on LinkedIn's own tracking
// script, which strict browser tracking-protection / cookie blocking
// prevents, rendering blank for a real share of visitors). Since a real
// browser CAN load a post's public permalink directly (unlike a plain
// fetch, which LinkedIn bot-blocks) — the sign-in wall only appears as a
// dismissible overlay, not a hard block — each post now also has a real
// screenshot of its header (avatar, name, opening lines), captured once
// at build time via scripts/capture-linkedin-posts.js and saved as a
// static image. No dependency on the embed working in a visitor's
// browser at all; it's just a picture.
//
// How to add a post: copy its permalink, write a short (1-2 sentence)
// excerpt of the actual opening, and add its slug + URL to
// scripts/capture-linkedin-posts.js to generate the screenshot.
export type LinkedInPost = {
  url: string;
  topic: string;
  excerpt: string;
  image: string;
};

export const linkedinPosts: LinkedInPost[] = [
  {
    url: "https://www.linkedin.com/posts/shubh-gupta-27918428a_redis-backenddevelopment-systemdesign-activity-7452328413551345665-UneO",
    topic: "Redis internals",
    excerpt:
      "Redis is way faster than we actually think. Most people assume it's fast just because it's in RAM — but a SQL database dumped into RAM still wouldn't hit 100k+ ops/sec. The real reason comes down to a few fundamental trade-offs.",
    image: "/linkedin/redis.png",
  },
  {
    url: "https://www.linkedin.com/posts/shubh-gupta-27918428a_most-ai-code-preview-apps-and-web-ides-activity-7464983629526433792-IxoZ",
    topic: "AI code preview security",
    excerpt:
      "Most AI code-preview apps (and web IDEs) are running a massive security gamble. Building one isn't just about throwing a \"sandbox\" attribute on an iframe and calling it a day — the real engineering headache starts when product requirements clash with security.",
    image: "/linkedin/ai-code-preview.png",
  },
  {
    url: "https://www.linkedin.com/posts/shubh-gupta-27918428a_3-months-of-random-dsa-update-here-activity-7443244590595280896-ZONi",
    topic: "3 months of DSA",
    excerpt:
      "3 months of random DSA — an update. Not how I thought it would go, but at least I started, without grinding 8 hours a day. DSA patterns turned out to be far less tough than they're made out to be — we're just scared of starting.",
    image: "/linkedin/dsa-update.png",
  },
];
