export type ExperienceItem = {
  company: string;
  url: string;
  role: string;
  period: string;
  bullets: string[];
  /** Explicit logo override — used when the auto-fetched site favicon
   * isn't the actual recognizable mark for the org. Falls back to the
   * auto-fetched favicon (then the text monogram) when omitted. */
  logo?: string;
  /** Flips an auto-fetched favicon's colors via CSS filter — for
   * favicons that are a near-white glyph on transparent, invisible
   * against this component's own light circular background otherwise
   * (confirmed by zooming into the rendered RecMaf badge). No-op when
   * `logo` is set. */
  invertFavicon?: boolean;
};

export const experience: ExperienceItem[] = [
  {
    company: "RecMaf",
    url: "https://www.recmaf.com/",
    invertFavicon: true,
    role: "SDE Intern",
    period: "July 2026 – Present",
    bullets: [
      "Own the candidate sourcing service on an AI hiring platform with 2K+ profiles and 10+ expert reviewers, serving clients like Tata 1mg and Asian Paints.",
      "Wrote one adapter contract every source implements, so adding a new source is just a new file with no downstream change — 3 sources live today.",
      "Screening runs on BullMQ workers backed by Redis, cached per profile so retries never repeat an LLM call, cutting LLM calls by roughly 20%.",
    ],
  },
  {
    company: "Tago",
    url: "https://mytago.tech",
    role: "Founding Engineer",
    period: "May 2025 – August 2025",
    bullets: [
      "Led 0→1 full-stack product development, scaling the platform to 100+ users using Next.js and AWS infrastructure.",
      "Optimized deployment architecture and hosting strategy, reducing operational costs to near-zero while maintaining scalability and performance.",
    ],
  },
  {
    company: "Vitalis Capital",
    url: "https://www.vitaliscapital.in/",
    role: "Contract",
    period: "Feb 2025 – April 2025",
    bullets: [
      "Built and deployed a production-grade platform for a financial services startup which invests into local firms, using Next.js, Tailwind CSS, Docker and AWS.",
    ],
  },
];
