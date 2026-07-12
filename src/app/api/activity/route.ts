import { NextResponse } from "next/server";
import { getActivityData } from "@/lib/activity";

// Server-side route so the LeetCode GraphQL call (which blocks
// cross-origin browser requests) and the GitHub contributions fetch both
// happen on our own backend, with a shared revalidation window.
export async function GET() {
  try {
    const data = await getActivityData();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    // getActivityData isolates per-source failures internally via
    // Promise.allSettled, so reaching here means something unexpected blew
    // up (e.g. a bug, not a single source outage). Fail soft with an empty,
    // all-failed payload so the client falls back to the static stat line.
    return NextResponse.json(
      {
        days: [],
        githubOk: false,
        leetcodeOk: false,
        githubError: "unhandled error",
        leetcodeError: String(err),
      },
      { status: 200 }
    );
  }
}
