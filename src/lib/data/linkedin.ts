// LinkedIn "Latest on LinkedIn" section data.
//
// This used to embed LinkedIn's official iframe
// (linkedin.com/embed/feed/update/{urn}) for each post. Dropped that
// entirely: the embed depends on LinkedIn's own tracking script running
// inside the frame, which strict browser tracking-protection / cookie
// blocking (Firefox, Brave, Safari, many privacy extensions) prevents —
// for a real share of visitors it renders as a totally blank box with
// nothing to look at. There's no way to detect that failure from the
// parent page (cross-origin), so rather than gamble on it working, each
// post is now a small hand-written excerpt (a sentence or two, not the
// full post) plus a link to read the whole thing on LinkedIn. Always
// renders something worth looking at, for every visitor, every time.
//
// How to add a post: copy its permalink, and write a short (1-2
// sentence) excerpt of the actual opening of the post.
export type LinkedInPost = {
  url: string;
  topic: string;
  excerpt: string;
};

export const linkedinPosts: LinkedInPost[] = [
  {
    url: "https://www.linkedin.com/posts/shubh-gupta-27918428a_redis-backenddevelopment-systemdesign-activity-7452328413551345665-UneO",
    topic: "Redis internals",
    excerpt:
      "Redis is way faster than we actually think. Most people assume it's fast just because it's in RAM — but a SQL database dumped into RAM still wouldn't hit 100k+ ops/sec. The real reason comes down to a few fundamental trade-offs.",
  },
  {
    url: "https://www.linkedin.com/posts/shubh-gupta-27918428a_most-ai-code-preview-apps-and-web-ides-activity-7464983629526433792-IxoZ",
    topic: "AI code preview security",
    excerpt:
      "Most AI code-preview apps (and web IDEs) are running a massive security gamble. Building one isn't just about throwing a \"sandbox\" attribute on an iframe and calling it a day — the real engineering headache starts when product requirements clash with security.",
  },
  {
    url: "https://www.linkedin.com/posts/shubh-gupta-27918428a_3-months-of-random-dsa-update-here-activity-7443244590595280896-ZONi",
    topic: "3 months of DSA",
    excerpt:
      "3 months of random DSA — an update. Not how I thought it would go, but at least I started, without grinding 8 hours a day. DSA patterns turned out to be far less tough than they're made out to be — we're just scared of starting.",
  },
];
