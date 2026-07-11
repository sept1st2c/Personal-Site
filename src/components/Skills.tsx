import { skillGroups } from "@/lib/data";
import Section from "./Section";

export default function Skills() {
  return (
    <Section id="skills" label="Toolbox" title="Skills">
      <div className="space-y-6">
        {skillGroups.map((group) => (
          <div
            key={group.label}
            className="flex flex-col gap-3 py-4 sm:flex-row sm:gap-8"
            style={{ borderTop: "1px solid var(--color-hairline-soft)" }}
          >
            <p
              className="w-full shrink-0 text-[13px] font-semibold uppercase sm:w-[180px]"
              style={{ color: "var(--color-muted)", letterSpacing: "0.06em" }}
            >
              {group.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full px-3 py-1 text-[13px] font-medium"
                  style={{
                    backgroundColor: "var(--color-surface-strong)",
                    color: "var(--color-ink)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
