export type ExperienceItem = {
  company: string;
  url: string;
  role: string;
  period: string;
  bullets: string[];
  /** Explicit logo override — used when the auto-fetched site favicon
   * isn't the actual recognizable mark for the org (e.g. GDG chapter
   * sites don't favicon their own community logo). Falls back to the
   * auto-fetched favicon (then the text monogram) when omitted. */
  logo?: string;
};

export const experience: ExperienceItem[] = [
  {
    company: "Tago",
    url: "https://mytago.tech",
    role: "Founding Engineer",
    period: "May 2025",
    bullets: [
      "Led 0→1 full-stack product development, scaling the platform to 100+ users using Next.js and AWS infrastructure.",
      "Optimized deployment architecture and hosting strategy, reducing operational costs to near-zero while maintaining scalability and performance.",
    ],
  },
  {
    company: "Vitalis Capital",
    url: "https://www.vitaliscapital.in/",
    role: "Contract",
    period: "Feb 2025",
    bullets: [
      "Built and deployed a production-grade platform for a financial services startup which invests into local firms, using Next.js, Tailwind CSS, Docker and AWS.",
    ],
  },
  {
    company: "Google Developer Groups",
    url: "https://www.gdgcloudnd.in/",
    logo: "/logos/gdg.png",
    role: "Tech Head",
    period: "Sept 2024 – May 2025",
    bullets: [
      "Developed and deployed full-stack platforms using React, Supabase, Firebase for GDG BU and FS club.",
    ],
  },
];
