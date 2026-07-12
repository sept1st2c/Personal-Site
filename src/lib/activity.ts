// Server-side data fetching + merge logic for the unified Activity heatmap.
// Combines GitHub contribution counts with LeetCode submission counts,
// keyed by UTC calendar date, for roughly the trailing 12 months.
//
// Both sources are fetched independently and failures are isolated: if one
// source fails we still return the other, plus flags so the UI/route can
// decide how to degrade.

export const GITHUB_USERNAME = "sept1st2c";
export const LEETCODE_USERNAME = "sept1c";

const DAYS_BACK = 371; // ~53 weeks, matches GitHub's own contribution graph span

export type DayActivity = {
  /** ISO calendar date, UTC day boundary, e.g. "2026-07-11" */
  date: string;
  commits: number;
  submissions: number;
};

export type ActivityResult = {
  days: DayActivity[];
  githubOk: boolean;
  leetcodeOk: boolean;
  githubError?: string;
  leetcodeError?: string;
};

function toUtcDateString(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Every calendar date (UTC) from DAYS_BACK ago through today, inclusive. */
function buildDateRange(): string[] {
  const dates: string[] = [];
  const today = new Date();
  const start = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate() - DAYS_BACK
  );
  const end = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  for (let t = start; t <= end; t += 86400000) {
    dates.push(toUtcDateString(new Date(t)));
  }
  return dates;
}

async function fetchGithubCommits(): Promise<Map<string, number>> {
  const url = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`GitHub contributions API responded ${res.status}`);
  }
  const json = (await res.json()) as {
    contributions?: { date: string; count: number }[];
    error?: string;
  };
  if (!json.contributions || !Array.isArray(json.contributions)) {
    throw new Error(json.error || "GitHub contributions API returned no data");
  }
  const map = new Map<string, number>();
  for (const entry of json.contributions) {
    map.set(entry.date, entry.count);
  }
  return map;
}

async function fetchLeetcodeSubmissions(): Promise<Map<string, number>> {
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: `https://leetcode.com/u/${LEETCODE_USERNAME}/`,
      "User-Agent": "Mozilla/5.0 (compatible; portfolio-activity-fetch/1.0)",
    },
    body: JSON.stringify({
      query: `query userProfileCalendar($username: String!) {
        matchedUser(username: $username) {
          submissionCalendar
        }
      }`,
      variables: { username: LEETCODE_USERNAME },
    }),
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`LeetCode GraphQL responded ${res.status}`);
  }
  const json = (await res.json()) as {
    data?: { matchedUser?: { submissionCalendar?: string } | null };
    errors?: { message: string }[];
  };
  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }
  const raw = json.data?.matchedUser?.submissionCalendar;
  if (!raw) {
    throw new Error("LeetCode GraphQL returned no submissionCalendar (user not found?)");
  }
  const parsed = JSON.parse(raw) as Record<string, number>;
  const map = new Map<string, number>();
  for (const [unixSeconds, count] of Object.entries(parsed)) {
    // Timestamps are UTC day boundaries (seconds). Convert using UTC fields
    // only so the calendar date never shifts across a local timezone.
    const date = new Date(Number(unixSeconds) * 1000);
    map.set(toUtcDateString(date), count);
  }
  return map;
}

export async function getActivityData(): Promise<ActivityResult> {
  const dateRange = buildDateRange();

  const [githubSettled, leetcodeSettled] = await Promise.allSettled([
    fetchGithubCommits(),
    fetchLeetcodeSubmissions(),
  ]);

  const githubOk = githubSettled.status === "fulfilled";
  const leetcodeOk = leetcodeSettled.status === "fulfilled";
  const githubMap = githubOk ? (githubSettled as PromiseFulfilledResult<Map<string, number>>).value : new Map<string, number>();
  const leetcodeMap = leetcodeOk ? (leetcodeSettled as PromiseFulfilledResult<Map<string, number>>).value : new Map<string, number>();

  const days: DayActivity[] = dateRange.map((date) => ({
    date,
    commits: githubMap.get(date) ?? 0,
    submissions: leetcodeMap.get(date) ?? 0,
  }));

  return {
    days,
    githubOk,
    leetcodeOk,
    githubError: githubSettled.status === "rejected" ? String(githubSettled.reason) : undefined,
    leetcodeError: leetcodeSettled.status === "rejected" ? String(leetcodeSettled.reason) : undefined,
  };
}
