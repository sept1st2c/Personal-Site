import { experience } from "@/lib/data";
import Section from "./Section";
import CompanyFavicon from "./CompanyFavicon";

// Two-letter monogram from a company name — e.g. "Vitalis Capital" -> "VC",
// "Tago" -> "TA". No logo image assets exist for any employer, so a clean
// typographic monogram stands in rather than a fabricated logo.
function monogram(name: string) {
  const words = name.split(" ").filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export default function Experience() {
  return (
    <Section id="experience" label="Experience" title="Where I've worked">
        <div>
          {experience.map((item, i) => {
            const isLast = i === experience.length - 1;
            return (
              <div key={item.company} className="relative flex gap-5 sm:gap-6">
                {/* rail + monogram marker */}
                <div className="relative flex w-10 flex-none flex-col items-center">
                  <CompanyFavicon url={item.url} monogram={monogram(item.company)} logo={item.logo} />
                  {!isLast && (
                    <div
                      className="mt-2 w-px flex-1"
                      style={{ backgroundColor: "var(--color-hairline)" }}
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* content */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group -mx-4 -mt-3 mb-6 flex-1 rounded-xl px-4 pb-8 pt-3 transition-colors hover:bg-[var(--color-surface-strong)]"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3
                        className="text-title-md"
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
                        className="text-title-sm"
                        style={{ color: "var(--color-muted)" }}
                      >
                        {item.role}
                      </span>
                    </div>
                    <span
                      className="text-caption tabular-nums sm:text-right"
                      style={{ color: "var(--color-muted-soft)" }}
                    >
                      {item.period}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="max-w-[720px] text-[16px] leading-[1.5]"
                        style={{ color: "var(--color-body)" }}
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </a>
              </div>
            );
          })}
        </div>
      </Section>
  );
}
