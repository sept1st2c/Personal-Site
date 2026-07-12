import { SiGithub } from "react-icons/si";

/**
 * Icon-treatment fallback for repo-only projects with no screenshots
 * (currently just Dark Pattern Detector — a browser extension). Keeps the
 * showcase visually intentional instead of showing a blank/broken image.
 */
export default function ProjectGlyph({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        background:
          "radial-gradient(circle at 50% 40%, var(--gradient-lavender), var(--color-canvas-soft) 70%)",
      }}
    >
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full"
        style={{ backgroundColor: "var(--color-surface-card)" }}
      >
        <SiGithub size={26} style={{ color: "var(--color-ink)" }} aria-hidden="true" />
      </div>
    </div>
  );
}
