// LinkedIn "Latest on LinkedIn" section data.
//
// This used to embed LinkedIn's official iframe
// (linkedin.com/embed/feed/update/{urn}), then dropped that in favor of
// text-only excerpt cards (the iframe depends on LinkedIn's own tracking
// script, which strict browser tracking-protection / cookie blocking
// prevents, rendering blank for a real share of visitors). Then tried a
// screenshot of each post's header (avatar, name, opening lines) — but
// the site owner wanted the actual photo/diagram they'd attached to the
// post itself, not a screenshot of the post's UI chrome. Each entry now
// points at that real attached image (the actual diagram/screenshot they
// posted), downloaded once from LinkedIn's CDN and saved as a static
// asset — no dependency on anything LinkedIn-side rendering in a
// visitor's browser.
//
// How to add a post: copy its permalink, write a short (1-2 sentence)
// excerpt of the actual opening, and save whichever image was actually
// attached to the post into public/linkedin/.
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
    image: "/linkedin/redis.jpg",
  },
  {
    url: "https://www.linkedin.com/posts/shubh-gupta-27918428a_most-ai-code-preview-apps-and-web-ides-activity-7464983629526433792-IxoZ",
    topic: "AI code preview security",
    excerpt:
      "Most AI code-preview apps (and web IDEs) are running a massive security gamble. Building one isn't just about throwing a \"sandbox\" attribute on an iframe and calling it a day — the real engineering headache starts when product requirements clash with security.",
    image: "/linkedin/ai-code-preview.jpg",
  },
  {
    url: "https://www.linkedin.com/posts/shubh-gupta-27918428a_3-months-of-random-dsa-update-here-activity-7443244590595280896-ZONi",
    topic: "3 months of DSA",
    excerpt:
      "3 months of random DSA — an update. Not how I thought it would go, but at least I started, without grinding 8 hours a day. DSA patterns turned out to be far less tough than they're made out to be — we're just scared of starting.",
    image: "/linkedin/dsa-update.jpg",
  },
];
