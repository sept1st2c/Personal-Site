import { achievements, person } from "@/lib/data";
import Section from "./Section";
import AchievementsMarquee from "./AchievementsMarquee";

export default function Achievements() {
  return (
    <Section id="achievements" label="Recognition" title="Achievements">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {achievements.map((group) => {
            // Items with a supporting photo render as a small photo card;
            // everything else keeps the clean text-list treatment. No
            // placeholder is rendered when `image` is absent, so the list
            // reads as intentional today even with zero images present.
            if (group.image) {
              return (
                <div
                  key={group.category}
                  className="overflow-hidden rounded-xl border"
                  style={{ borderColor: "var(--color-hairline)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- local, owner-supplied achievement photos of arbitrary/unknown dimensions */}
                  <img
                    src={group.image}
                    alt={group.category}
                    className="h-36 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3
                      className="text-title-sm"
                      style={{ color: "var(--color-ink)" }}
                    >
                      {group.category}
                    </h3>
                    <ul className="mt-2 space-y-1.5">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="text-caption"
                          style={{ color: "var(--color-body)" }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            }

            return (
              <div key={group.category}>
                <h3
                  className="text-title-sm"
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
                        className="text-caption"
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
            );
          })}
        </div>
        <AchievementsMarquee />
      </Section>
  );
}
