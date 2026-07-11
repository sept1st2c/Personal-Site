import { Project } from "@/lib/data";
import EmbedFrame from "./EmbedFrame";

function StackRow({ stack }: { stack: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {stack.map((s) => (
        <span
          key={s}
          className="rounded-full px-2.5 py-1 text-[12px] font-medium"
          style={{
            backgroundColor: "var(--color-surface-strong)",
            color: "var(--color-body)",
          }}
        >
          {s}
        </span>
      ))}
    </div>
  );
}

function CardBody({ project }: { project: Project }) {
  return (
    <div className="p-6">
      <div className="flex items-baseline justify-between gap-4">
        <h3
          className="text-[18px] font-medium"
          style={{ color: "var(--color-ink)" }}
        >
          {project.name}
        </h3>
      </div>
      <p className="mt-1 text-[14px]" style={{ color: "var(--color-muted)" }}>
        {project.description}
      </p>

      <ul className="mt-4 space-y-1.5">
        {project.bullets.map((b) => (
          <li
            key={b}
            className="text-[14px] leading-relaxed"
            style={{ color: "var(--color-body)" }}
          >
            {b}
          </li>
        ))}
      </ul>

      <StackRow stack={project.stack} />

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] font-medium"
            style={{ color: "var(--color-ink)" }}
          >
            Open full demo ↗
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] font-medium"
            style={{ color: "var(--color-ink)" }}
          >
            View on GitHub ↗
          </a>
        )}
      </div>
    </div>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const hasFrame = project.embed === "iframe" || project.embed === "iframe-fallback";

  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{
        borderColor: "var(--color-hairline)",
        backgroundColor: "var(--color-surface-card)",
      }}
    >
      {hasFrame && project.live && (
        <div
          className="h-[260px] w-full border-b"
          style={{ borderColor: "var(--color-hairline)" }}
        >
          <EmbedFrame
            src={project.live}
            title={project.name}
            startFailed={project.embed === "iframe-fallback" ? project.startFailed : false}
            fallbackLabel="View live project"
          />
        </div>
      )}

      {project.embed === "repo" && (
        <div
          className="flex h-[120px] w-full items-center gap-4 border-b px-6"
          style={{ borderColor: "var(--color-hairline)", backgroundColor: "var(--color-canvas-soft)" }}
        >
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: "var(--color-surface-strong)" }}
            aria-hidden="true"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49v-1.9c-2.78.62-3.37-1.36-3.37-1.36-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.36 1.11 2.93.85.09-.67.35-1.11.64-1.37-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 5 0c1.9-1.33 2.74-1.05 2.74-1.05.56 1.41.21 2.45.1 2.71.65.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.79-4.57 5.04.36.32.68.95.68 1.92v2.85c0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.2C22 6.58 17.52 2 12 2Z"
                fill="var(--color-ink)"
              />
            </svg>
          </div>
          <div>
            <p className="text-[15px] font-medium" style={{ color: "var(--color-ink)" }}>
              {project.name}
            </p>
            <p className="text-[13px]" style={{ color: "var(--color-muted)" }}>
              Browser extension · repo only
            </p>
          </div>
        </div>
      )}

      <CardBody project={project} />
    </div>
  );
}
