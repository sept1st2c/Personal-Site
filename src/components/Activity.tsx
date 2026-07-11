"use client";

import { useState } from "react";
import { person } from "@/lib/data";
import Section from "./Section";

export default function Activity() {
  const [heatmapFailed, setHeatmapFailed] = useState(false);

  return (
    <Section id="activity" label="Activity" title="On GitHub & LeetCode">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto]">
        <div>
          {!heatmapFailed ? (
            // Third-party dynamically generated chart (unknown intrinsic
            // size), with a graceful onError fallback; next/image isn't a
            // good fit here.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`https://ghchart.rshah.org/161311/${person.githubUsername}`}
              alt={`${person.name} GitHub contribution heatmap`}
              loading="lazy"
              onError={() => setHeatmapFailed(true)}
              className="w-full max-w-[720px]"
            />
          ) : (
            <a
              href={person.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-medium"
              style={{ color: "var(--color-ink)" }}
            >
              View GitHub ↗
            </a>
          )}
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <a
            href={person.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col"
          >
            <span
              className="font-display text-[28px]"
              style={{ color: "var(--color-ink)" }}
            >
              1830+
            </span>
            <span className="text-[13px]" style={{ color: "var(--color-muted)" }}>
              LeetCode rating
            </span>
          </a>
          <div className="h-10 w-px" style={{ backgroundColor: "var(--color-hairline)" }} />
          <a
            href={person.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col"
          >
            <span
              className="font-display text-[28px]"
              style={{ color: "var(--color-ink)" }}
            >
              400+
            </span>
            <span className="text-[13px]" style={{ color: "var(--color-muted)" }}>
              problems solved
            </span>
          </a>
        </div>
      </div>
    </Section>
  );
}
