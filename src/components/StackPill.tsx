import {
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiRedis,
  SiPython,
  SiReact,
  SiDocker,
  SiFlask,
  SiFramer,
  SiVercel,
  SiClerk,
  SiTypescript,
  SiJavascript,
  SiOpencv,
  SiDeepgram,
  SiLivekit,
  SiScikitlearn,
} from "react-icons/si";
import type { IconType } from "react-icons";

/** Maps a stack label to a real brand icon where one exists. Anything not
 * in this table renders as a plain text pill — no invented/approximate
 * logos (e.g. LangGraph, Groq, Monaco have no accurate Simple Icons entry). */
const ICONS: Record<string, IconType> = {
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  PostgreSQL: SiPostgresql,
  "Redis (Upstash)": SiRedis,
  Redis: SiRedis,
  Python: SiPython,
  React: SiReact,
  Docker: SiDocker,
  Flask: SiFlask,
  "Framer Motion": SiFramer,
  Vercel: SiVercel,
  Clerk: SiClerk,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  OpenCV: SiOpencv,
  Deepgram: SiDeepgram,
  LiveKit: SiLivekit,
  "scikit-learn": SiScikitlearn,
};

export default function StackPill({
  label,
  size = "md",
}: {
  label: string;
  size?: "sm" | "md";
}) {
  const Icon = ICONS[label];
  const padding = size === "sm" ? "px-2 py-1 text-[11px]" : "px-2.5 py-1 text-[12px]";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${padding}`}
      style={{
        backgroundColor: "var(--color-surface-strong)",
        color: "var(--color-body)",
      }}
    >
      {Icon && <Icon size={size === "sm" ? 12 : 13} style={{ color: "var(--color-body-strong)" }} aria-hidden="true" />}
      {label}
    </span>
  );
}
