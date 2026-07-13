import { achievements, person } from "@/lib/data";
import Section from "./Section";
import AchievementsMarquee from "./AchievementsMarquee";
import Reveal from "./Reveal";
import { PopGroup, PopItem } from "./PopGroup";

export default function Achievements() {
  return (
    <Section id="achievements" label="Recognition" title="Achievements">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {achievements.map((group, i) => {
            // Items with a supporting photo render as a small photo card;
            // everything else keeps the clean text-list treatment. No
            // placeholder is rendered when `image` is absent, so the list
            // reads as intentional today even with zero images present.
            if (group.image) {
              return (
                <Reveal key={group.category} delay={i * 0.08}>
                  <div
                    className="hover-lift overflow-hidden rounded-xl border"
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
                      <PopGroup as="ul" className="mt-2 space-y-1.5" stagger={0.05}>
                        {group.items.map((item) => (
                          <PopItem
                            key={item}
                            as="li"
                            className="text-caption"
                            style={{ color: "var(--color-body)" }}
                          >
                            {item}
                          </PopItem>
                        ))}
                      </PopGroup>
                    </div>
                  </div>
                </Reveal>
              );
            }

            return (
              <Reveal key={group.category} delay={i * 0.08}>
                <div>
                  <h3
                    className="text-title-sm"
                    style={{ color: "var(--color-ink)" }}
                  >
                    {group.category}
                  </h3>
                  <PopGroup as="ul" className="mt-3 space-y-2" stagger={0.05}>
                    {group.items.map((item) => {
                      const isLeetcode = group.category === "LeetCode";
                      return (
                        <PopItem
                          key={item}
                          as="li"
                          className="text-caption"
                          style={{ color: "var(--color-body)" }}
                        >
                          {isLeetcode ? (
                            <a
                              href={person.leetcode}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="link-underline"
                              style={{ color: "var(--color-body)" }}
                            >
                              {item}
                            </a>
                          ) : (
                            item
                          )}
                        </PopItem>
                      );
                    })}
                  </PopGroup>
                </div>
              </Reveal>
            );
          })}
        </div>
        <AchievementsMarquee />
      </Section>
  );
}
