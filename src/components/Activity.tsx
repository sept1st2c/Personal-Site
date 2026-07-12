"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { person } from "@/lib/data";
import Section from "./Section";
import type { ActivityResult, DayActivity } from "@/lib/activity";

const MONTH_LABEL_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
});
const TOOLTIP_DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

type Cell = DayActivity | null;

// Fixed count buckets (not quantiles) so the graph reads consistently
// day-to-day rather than rescaling relative to whatever the max happened to
// be. Tuned to the rough scale of one person's commits + LeetCode
// submissions per day.
function levelFor(total: number): 0 | 1 | 2 | 3 | 4 {
  if (total <= 0) return 0;
  if (total <= 2) return 1;
  if (total <= 5) return 2;
  if (total <= 9) return 3;
  return 4;
}

// Ink at increasing opacity over the canvas-soft base — reuses the site's
// existing warm near-black ink token instead of introducing a new brand
// color, per the design system.
const LEVEL_BACKGROUND: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "var(--color-canvas-soft)",
  1: "rgba(12, 10, 9, 0.14)",
  2: "rgba(12, 10, 9, 0.32)",
  3: "rgba(12, 10, 9, 0.55)",
  4: "rgba(12, 10, 9, 0.85)",
};

function parseUtcDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function tooltipLabel(day: DayActivity): string {
  const dateLabel = TOOLTIP_DATE_FORMAT.format(parseUtcDate(day.date));
  const parts: string[] = [];
  if (day.commits > 0) {
    parts.push(`${day.commits} commit${day.commits === 1 ? "" : "s"}`);
  }
  if (day.submissions > 0) {
    parts.push(`${day.submissions} submission${day.submissions === 1 ? "" : "s"}`);
  }
  if (parts.length === 0) {
    return `${dateLabel} — no activity`;
  }
  return `${dateLabel} — ${parts.join(" · ")}`;
}

/** Group the flat, chronologically-ascending day list into Sun–Sat week
 * columns, padding the first/last week with nulls so every column has
 * exactly 7 rows. */
function buildWeeks(days: DayActivity[]): Cell[][] {
  if (days.length === 0) return [];
  const weeks: Cell[][] = [];
  const firstDow = parseUtcDate(days[0].date).getUTCDay(); // 0 = Sunday
  let currentWeek: Cell[] = new Array(firstDow).fill(null);

  for (const day of days) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
  }
  return weeks;
}

/** Month label for each week column: only shown on the week where the month
 * changes, mirroring GitHub's own contribution graph. */
function monthLabels(weeks: Cell[][]): (string | null)[] {
  let lastMonth = -1;
  return weeks.map((week) => {
    const firstReal = week.find((c): c is DayActivity => c !== null);
    if (!firstReal) return null;
    const month = parseUtcDate(firstReal.date).getUTCMonth();
    if (month !== lastMonth) {
      lastMonth = month;
      return MONTH_LABEL_FORMAT.format(parseUtcDate(firstReal.date));
    }
    return null;
  });
}

const CELL = 11; // px
const GAP = 3; // px

function StaticFallback() {
  return (
    <div className="flex items-center gap-3 sm:gap-6">
      <a
        href={person.leetcode}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col"
      >
        <span className="font-display text-[28px]" style={{ color: "var(--color-ink)" }}>
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
        <span className="font-display text-[28px]" style={{ color: "var(--color-ink)" }}>
          400+
        </span>
        <span className="text-[13px]" style={{ color: "var(--color-muted)" }}>
          problems solved
        </span>
      </a>
      <div className="h-10 w-px" style={{ backgroundColor: "var(--color-hairline)" }} />
      <a
        href={person.github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[14px] font-medium"
        style={{ color: "var(--color-ink)" }}
      >
        View GitHub ↗
      </a>
    </div>
  );
}

function Heatmap({ days }: { days: DayActivity[] }) {
  const weeks = useMemo(() => buildWeeks(days), [days]);
  const labels = useMemo(() => monthLabels(weeks), [weeks]);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const totalCommits = days.reduce((s, d) => s + d.commits, 0);
  const totalSubmissions = days.reduce((s, d) => s + d.submissions, 0);

  // The full 12-month grid is wider than a phone screen, so it scrolls
  // horizontally — but left-to-right chronological order means the
  // *most recent* (most relevant) activity sits off-screen to the right
  // by default. Scroll straight to it on mount instead of leaving it
  // hidden behind an undiscoverable swipe.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth;
  }, [weeks]);

  return (
    <div>
      {/* .above-grain on the scroller itself, not just the cell buttons:
          .scroll-fade-left's mask-image makes this div a stacking-context
          root on its own, which would otherwise trap the buttons'
          individual .above-grain inside a context that sits below
          .grain-layer (same bug class documented in globals.css and
          AchievementsMarquee). */}
      <div ref={scrollerRef} className="above-grain scroll-fade-left overflow-x-auto pb-2">
        <div style={{ width: weeks.length * (CELL + GAP) }}>
          {/* Month labels */}
          <div className="mb-1 flex" style={{ gap: GAP }}>
            {weeks.map((_, wi) => (
              <div
                key={wi}
                style={{ width: CELL, fontSize: "10px", color: "var(--color-muted)" }}
                className="shrink-0"
              >
                {labels[wi] ?? ""}
              </div>
            ))}
          </div>

          {/* Grid: weeks as columns, days as rows */}
          <div className="flex" style={{ gap: GAP }}>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col shrink-0" style={{ gap: GAP }}>
                {week.map((day, di) => {
                  if (!day) {
                    return <div key={di} style={{ width: CELL, height: CELL }} />;
                  }
                  const level = levelFor(day.commits + day.submissions);
                  const key = day.date;
                  const isActive = activeKey === key;
                  return (
                    <div key={di} className="relative">
                      <button
                        type="button"
                        aria-label={tooltipLabel(day)}
                        onMouseEnter={() => setActiveKey(key)}
                        onMouseLeave={() => setActiveKey((k) => (k === key ? null : k))}
                        onFocus={() => setActiveKey(key)}
                        onBlur={() => setActiveKey((k) => (k === key ? null : k))}
                        // Always set (never toggle) on click/tap: touch devices fire a
                        // synthetic mouseenter immediately before the click, so a
                        // toggle here would open-then-instantly-close the tooltip.
                        onClick={() => setActiveKey(key)}
                        style={{
                          width: CELL,
                          height: CELL,
                          backgroundColor: LEVEL_BACKGROUND[level],
                          border:
                            level === 0
                              ? "1px solid var(--color-hairline)"
                              : "1px solid transparent",
                          borderRadius: 2,
                        }}
                        className="above-grain block cursor-pointer transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
                      />
                      {isActive && (
                        <div
                          role="tooltip"
                          className="pointer-events-none absolute bottom-full z-10 mb-1.5 whitespace-nowrap rounded-md px-2 py-1 text-[11px] font-medium shadow-sm"
                          style={{
                            left: wi < 4 ? 0 : undefined,
                            right: wi >= weeks.length - 4 ? 0 : undefined,
                            transform:
                              wi >= 4 && wi < weeks.length - 4 ? "translateX(-45%)" : undefined,
                            backgroundColor: "var(--color-ink)",
                            color: "var(--color-on-primary, #fff)",
                          }}
                        >
                          {tooltipLabel(day)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <p className="text-[13px]" style={{ color: "var(--color-muted)" }}>
          {totalCommits} commit{totalCommits === 1 ? "" : "s"} · {totalSubmissions} submission
          {totalSubmissions === 1 ? "" : "s"} in the last 12 months
        </p>
        <div className="flex items-center gap-1.5 text-[11px]" style={{ color: "var(--color-muted)" }}>
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((lvl) => (
            <span
              key={lvl}
              style={{
                width: CELL,
                height: CELL,
                backgroundColor: LEVEL_BACKGROUND[lvl as 0 | 1 | 2 | 3 | 4],
                border: lvl === 0 ? "1px solid var(--color-hairline)" : "1px solid transparent",
                borderRadius: 2,
              }}
              className="above-grain inline-block"
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

export default function Activity() {
  const [data, setData] = useState<ActivityResult | null>(null);
  const [fetchFailed, setFetchFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/activity")
      .then((res) => {
        if (!res.ok) throw new Error(`status ${res.status}`);
        return res.json() as Promise<ActivityResult>;
      })
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setFetchFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const bothFailed =
    fetchFailed || (data !== null && !data.githubOk && !data.leetcodeOk) || data?.days.length === 0;

  return (
    <Section id="activity" label="Activity" title="On GitHub & LeetCode">
      {bothFailed ? (
        <StaticFallback />
      ) : data ? (
        <Heatmap days={data.days} />
      ) : (
        <div
          aria-hidden
          className="h-[120px] w-full animate-pulse rounded-md"
          style={{ backgroundColor: "var(--color-canvas-soft)" }}
        />
      )}

      <div className="mt-6 flex gap-6 text-[13px]" style={{ color: "var(--color-muted)" }}>
        <a
          href={person.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium hover:underline"
          style={{ color: "var(--color-ink)" }}
        >
          GitHub ↗
        </a>
        <a
          href={person.leetcode}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium hover:underline"
          style={{ color: "var(--color-ink)" }}
        >
          LeetCode ↗
        </a>
      </div>
    </Section>
  );
}
