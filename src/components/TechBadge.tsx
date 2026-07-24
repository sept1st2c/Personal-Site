import type { IconType } from "react-icons";
import {
  SiNextdotjs,
  SiReact,
  SiExpress,
  SiPrisma,
  SiDocker,
  SiPostgresql,
  SiRedis,
  SiJavascript,
  SiPython,
  SiCplusplus,
} from "react-icons/si";
import {
  LuBrainCircuit,
  LuNetwork,
  LuAudioWaveform,
  LuCloud,
  LuScanEye,
  LuListOrdered,
} from "react-icons/lu";

// Brand-icon lookup for the hero tag row. Simple Icons covers most of the
// stack directly. A few tags have no official brand mark in the installed
// icon set:
// - AWS: react-icons' Simple Icons build ships no "amazonaws" glyph (Amazon
//   restricts reuse of its logo mark), so a generic cloud glyph stands in.
// - LangGraph, LiveKit, AI Agents, Computer Vision, BullMQ: no brand icon
//   exists at all — each gets a sensible generic icon (network / waveform /
//   circuit / scan-eye / ordered-list for a job queue) so no tag renders
//   without one.
const iconMap: Record<string, IconType> = {
  "Next.js": SiNextdotjs,
  "React.js": SiReact,
  "AI Agents": LuBrainCircuit,
  LangGraph: LuNetwork,
  LiveKit: LuAudioWaveform,
  Express: SiExpress,
  Prisma: SiPrisma,
  AWS: LuCloud,
  Docker: SiDocker,
  PostgreSQL: SiPostgresql,
  Redis: SiRedis,
  BullMQ: LuListOrdered,
  "Computer Vision": LuScanEye,
  JavaScript: SiJavascript,
  Python: SiPython,
  "C++": SiCplusplus,
};

export default function TechBadge({ label }: { label: string }) {
  const Icon = iconMap[label];

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold uppercase"
      style={{
        backgroundColor: "var(--color-surface-strong)",
        color: "var(--color-ink)",
        letterSpacing: "0.96px",
      }}
    >
      {Icon ? <Icon size={14} aria-hidden="true" /> : null}
      {label}
    </span>
  );
}
