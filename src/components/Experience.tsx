import { experience } from "@/lib/data";
import Section from "./Section";

export default function Experience() {
  return (
    <Section id="experience" label="Experience" title="Where I've worked">
      <div>
        {experience.map((item, i) => (
          <a
            key={item.company}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block py-8"
            style={{
              borderTop: i === 0 ? undefined : "1px solid var(--color-hairline)",
            }}
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3
                  className="text-[18px] font-medium"
                  style={{ color: "var(--color-ink)" }}
                >
                  {item.company}
                  <span
                    className="ml-1 inline-block transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </h3>
                <span
                  className="text-[15px]"
                  style={{ color: "var(--color-muted)" }}
                >
                  {item.role}
                </span>
              </div>
              <span
                className="text-[14px]"
                style={{ color: "var(--color-muted-soft)" }}
              >
                {item.period}
              </span>
            </div>

            <ul className="mt-4 space-y-2">
              {item.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="max-w-[720px] text-[16px] leading-relaxed"
                  style={{ color: "var(--color-body)" }}
                >
                  {bullet}
                </li>
              ))}
            </ul>
          </a>
        ))}
      </div>
    </Section>
  );
}
