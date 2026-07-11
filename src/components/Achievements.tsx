import { achievements, person } from "@/lib/data";
import Section from "./Section";

export default function Achievements() {
  return (
    <Section id="achievements" label="Recognition" title="Achievements">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {achievements.map((group) => (
          <div key={group.category}>
            <h3
              className="text-[15px] font-semibold"
              style={{ color: "var(--color-ink)" }}
            >
              {group.category}
            </h3>
            <ul className="mt-3 space-y-2">
              {group.items.map((item) => {
                const isLeetcode = group.category === "LeetCode";
                return (
                  <li
                    key={item}
                    className="text-[14px] leading-relaxed"
                    style={{ color: "var(--color-body)" }}
                  >
                    {isLeetcode ? (
                      <a
                        href={person.leetcode}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "var(--color-body)" }}
                      >
                        {item}
                      </a>
                    ) : (
                      item
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
