// Single source of truth for portfolio content. Keep arrays extensible —
// more projects/achievements are expected to be appended later.

export const person = {
  name: "Shubh Gupta",
  role: "Founding Engineer — full-stack products & AI agent systems",
  email: "3shubh17@gmail.com",
  linkedin: "https://www.linkedin.com/in/shubh-gupta-27918428a/",
  github: "https://github.com/sept1st2c",
  leetcode: "https://leetcode.com/u/sept1c/",
  githubUsername: "sept1st2c",
};

export const heroTags = [
  "Next.js",
  "AI Agents",
  "LangGraph",
  "AWS",
  "PostgreSQL",
  "Docker",
];

export type ExperienceItem = {
  company: string;
  url: string;
  role: string;
  period: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Tago",
    url: "https://mytago.tech",
    role: "Founding Engineer",
    period: "May 2025 – Present",
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
    role: "Tech Head",
    period: "Sept 2024 – May 2025",
    bullets: [
      "Developed and deployed full-stack platforms using React, Supabase, Firebase for GDG BU and FS club.",
    ],
  },
];

export type ProjectEmbedKind = "iframe" | "iframe-fallback" | "link" | "repo";

export type Project = {
  name: string;
  description: string;
  live?: string;
  repo?: string;
  embed: ProjectEmbedKind;
  bullets: string[];
  stack: string[];
};

export const projects: Project[] = [
  {
    name: "Sash",
    description: "Auth-as-a-Service platform",
    live: "https://sash-web.vercel.app/",
    repo: "https://github.com/sept1st2c/sash",
    embed: "iframe",
    bullets: [
      "Multi-tenant Auth-as-a-Service with 2FA, scalable auth, SDK integration, API-key access.",
      "Redis for session management, rate limiting, and OTP.",
      "Webhook-driven sync architecture.",
    ],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Redis (Upstash)", "Vercel"],
  },
  {
    name: "Volna Code",
    description: "Real-time voice AI DSA tutor",
    live: "https://volna-code.vercel.app/",
    repo: "https://github.com/sept1st2c/Volna-Code",
    embed: "iframe",
    bullets: [
      "LiveKit + GPT (STT+LLM) + Deepgram (TTS), sub-2s latency.",
      "Stateful LangGraph agent with Socratic hint system.",
      "Monaco editor + sandboxed Python execution (Piston API).",
      "Bidirectional browser↔agent layer over LiveKit WebRTC.",
    ],
    stack: ["LiveKit", "LangGraph", "Groq", "Deepgram", "Monaco", "Next.js", "Python"],
  },
  {
    name: "Cognitive Brand Layer (LOCI)",
    description: "Brand cognition / memory-engine concept",
    live: "https://frontend-react-ruby.vercel.app/",
    embed: "iframe-fallback",
    bullets: [
      "A brand cognition / memory-engine concept, explored as a heavy client-rendered SPA.",
    ],
    stack: ["React"],
  },
  {
    name: "Pictured Photos",
    description: "Computer vision / photo differentiation",
    live: "https://photo-differentiation-qtnich7zi-sept1st2cs-projects.vercel.app/",
    embed: "iframe-fallback",
    bullets: [
      "Computer vision project differentiating and grouping visually similar photos.",
    ],
    stack: ["Python", "Computer Vision"],
  },
  {
    name: "Dark Pattern Detector",
    description: "Browser extension",
    repo: "https://github.com/sept1st2c/SakV",
    embed: "repo",
    bullets: [
      "Browser extension to detect and highlight manipulative UI patterns on e-commerce sites.",
    ],
    stack: ["JavaScript", "Flask", "Naïve Bayes", "Next.js"],
  },
];

export const skillGroups: { label: string; skills: string[] }[] = [
  { label: "Languages", skills: ["JavaScript", "Python", "Java", "C++"] },
  {
    label: "Backend & Web",
    skills: ["Next.js", "React", "Express", "Flask", "Django", "REST APIs"],
  },
  {
    label: "AI & Agents",
    skills: ["LangGraph", "LiveKit", "RAG", "LLMs", "N8N", "Mastra"],
  },
  {
    label: "Databases & Cache",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
  },
  {
    label: "Tools & Cloud",
    skills: ["AWS", "Azure", "Docker", "Git", "Prisma", "Terraform", "Upstash", "Postman"],
  },
];

export type Achievement = {
  category: string;
  items: string[];
};

export const achievements: Achievement[] = [
  {
    category: "LeetCode",
    items: ["1830+ rating, 400+ problems solved"],
  },
  {
    category: "Hackathons",
    items: [
      "Winner — Hackacino (2025)",
      "2nd place — Code Dust (2025)",
      "4th place — Smart India Hackathon, BU (2024)",
    ],
  },
  {
    category: "Leadership",
    items: [
      "Tech Head @ Google Developer Groups, BU",
      "Full Stack Club, BU",
    ],
  },
];

export const education = {
  school: "Bennett University",
  degree: "B.Tech CSE",
  cgpa: "CGPA 8.5/10",
  period: "Sept 2023 – June 2027",
};

export const nav = [
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#footer" },
];
