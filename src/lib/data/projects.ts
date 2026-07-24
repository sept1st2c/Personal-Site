export type Project = {
  /** URL-safe id, also the folder name under public/projects/<slug>/. */
  slug: string;
  name: string;
  description: string;
  live?: string;
  repo?: string;
  /** Screenshot paths under /public, in display order (landing first). */
  screenshots: string[];
  bullets: string[];
  stack: string[];
  /** Shown when a screenshot exists but doesn't reflect the live product
   * (e.g. a deployment-protection wall) — surfaced honestly in the UI
   * instead of silently showing a stale/irrelevant image. */
  note?: string;
};

export const projects: Project[] = [
  {
    slug: "sash",
    name: "Sash",
    description: "Auth-as-a-Service platform",
    live: "https://sash-web.vercel.app/",
    repo: "https://github.com/sept1st2c/sash",
    screenshots: [
      "/projects/sash/1-landing.png",
      "/projects/sash/2-detail.png",
      "/projects/sash/3-detail.png",
    ],
    bullets: [
      "Multi-tenant Auth-as-a-Service with 2FA, API-key access and a published SDK, so a tenant ships login without writing auth logic.",
      "Redis holds sessions, OTPs and rate limits, which makes revocation instant and brute force expensive.",
      "Webhook-driven sync pushes auth state to tenant systems with retries, so an outage delays delivery instead of dropping it.",
    ],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Redis (Upstash)", "SDK Development", "Vercel"],
  },
  {
    slug: "volna-code",
    name: "Volna Code",
    description: "Real-time voice AI DSA tutor",
    live: "https://volna-code.vercel.app/",
    repo: "https://github.com/sept1st2c/Volna-Code",
    screenshots: [
      "/projects/volna-code/1-landing.png",
      "/projects/volna-code/2-detail.png",
      "/projects/volna-code/3-detail.png",
    ],
    bullets: [
      "Real-time voice AI DSA tutor on LiveKit (WebRTC), holding sub-2s speech-to-speech latency across a streaming STT → LLM → TTS pipeline.",
      "Stateful LangGraph agent runs a Socratic hint system that tracks where each student is stuck instead of resetting every turn.",
      "Monaco editor wired to a sandboxed Piston runtime, so the agent reads and runs live code mid-session over LiveKit's data channel.",
    ],
    stack: ["LiveKit", "LangGraph", "Groq", "Deepgram", "Monaco", "Next.js", "Python"],
  },
  {
    slug: "tapi",
    name: "Tapi",
    description: "Link-in-bio pages connected through NFC cards",
    live: "https://taap-saas.vercel.app/",
    screenshots: [
      "/projects/tapi/1-landing.png",
      "/projects/tapi/2-detail.png",
      "/projects/tapi/3-detail.png",
    ],
    bullets: [
      "Link-in-bio / digital-identity platform with 16 content block types (links, images, PDFs, catalogs, Spotify/YouTube embeds, contact buttons).",
      "9 pre-built themes plus custom color options, with a per-block visual editor.",
      "Real-time analytics: views, clicks, devices, countries.",
      "Branded short URLs (tapi.link/@username); NFC cards act as the physical tap-to-share layer.",
    ],
    stack: ["Next.js", "Clerk", "S3"],
  },
  {
    slug: "cognitive-brand-layer",
    name: "Cognitive Brand Layer (LOCI)",
    description: "Brand cognition / memory-engine concept",
    live: "https://frontend-react-ruby.vercel.app/",
    screenshots: [
      "/projects/cognitive-brand-layer/1-landing.png",
      "/projects/cognitive-brand-layer/2-detail.png",
    ],
    bullets: [
      "A brand cognition / memory-engine concept, explored as a heavy client-rendered SPA.",
    ],
    stack: ["React"],
  },
  {
    slug: "pictured-photos",
    name: "Pictured Photos",
    description: "Computer vision / photo differentiation",
    live: "https://photo-differentiation-qtnich7zi-sept1st2cs-projects.vercel.app/",
    screenshots: [
      "/projects/pictured-photos/1-landing.png",
      "/projects/pictured-photos/2-detail.png",
    ],
    note: "Deployment sits behind Vercel access protection. The owner needs to disable it for the public demo to load directly.",
    bullets: [
      "Computer vision project differentiating and grouping visually similar photos.",
      "Handcrafted feature vector (FFT, LBP, wavelet H/V ratio, color stats) feeding a HistGradientBoosting classifier, chosen over a CNN so the model can't just memorize device fingerprints across only 8 device pairings.",
      "Full-stack demo: Flask API on Render wrapping predict.py, Next.js + Tailwind front end for live upload/batch testing.",
    ],
    stack: ["Python", "scikit-learn", "OpenCV", "Flask", "Docker", "Next.js"],
  },
  {
    slug: "dark-pattern-detector",
    name: "Dark Pattern Detector",
    description: "Browser extension",
    repo: "https://github.com/sept1st2c/SakV",
    // No live deploy exists (it's a browser extension, not a hosted site),
    // so the "screenshot" here is the actual GitHub repo page rather than
    // an empty array + icon-only glyph treatment.
    screenshots: ["/projects/dark-pattern-detector/1-landing.png"],
    bullets: [
      "Browser extension to detect and highlight manipulative UI patterns on e-commerce sites.",
    ],
    stack: ["JavaScript", "Flask", "Naïve Bayes", "Next.js"],
  },
];
