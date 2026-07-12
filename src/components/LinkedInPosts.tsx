import { linkedinPosts } from "@/lib/data/linkedin";
import Section from "./Section";

// Standard public "recent activity" URL for a LinkedIn profile. Kept as a
// local constant (rather than sourced from the shared person data) so this
// file has no dependency on other data files that may be edited elsewhere.
const LINKEDIN_RECENT_ACTIVITY_URL =
  "https://www.linkedin.com/in/shubh-gupta-27918428a/recent-activity/all/";

function LinkedInGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"
        fill="var(--color-ink)"
      />
    </svg>
  );
}

function EmptyState() {
  return (
    <div
      className="flex flex-col items-start gap-5 rounded-3xl border p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10"
      style={{
        borderColor: "var(--color-hairline)",
        backgroundColor: "var(--color-canvas-soft)",
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: "var(--color-surface-strong)" }}
          aria-hidden="true"
        >
          <LinkedInGlyph />
        </div>
        <div>
          <p className="text-[15px] font-medium" style={{ color: "var(--color-ink)" }}>
            New posts landing here soon
          </p>
          <p className="mt-1 max-w-[440px] text-[14px] leading-relaxed" style={{ color: "var(--color-muted)" }}>
            This space is reserved for a few highlighted updates. In the meantime, catch the
            latest directly on LinkedIn.
          </p>
        </div>
      </div>
      <a
        href={LINKEDIN_RECENT_ACTIVITY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 whitespace-nowrap text-[14px] font-medium"
        style={{ color: "var(--color-ink)" }}
      >
        View all posts on LinkedIn →
      </a>
    </div>
  );
}

export default function LinkedInPosts() {
  const hasPosts = linkedinPosts.length > 0;

  return (
    <Section id="linkedin" label="Elsewhere" title="Latest on LinkedIn">
      {hasPosts ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {linkedinPosts.slice(0, 3).map((post) => (
            <a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between gap-6 rounded-2xl border p-6 transition-colors hover:bg-[var(--color-surface-strong)]"
              style={{
                borderColor: "var(--color-hairline)",
                backgroundColor: "var(--color-surface-card)",
              }}
            >
              <div>
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-full"
                  style={{ backgroundColor: "var(--color-surface-strong)" }}
                  aria-hidden="true"
                >
                  <LinkedInGlyph />
                </div>
                <p
                  className="text-caption-uppercase mb-2"
                  style={{ color: "var(--color-muted)" }}
                >
                  {post.topic}
                </p>
                <p
                  className="text-[14px] leading-relaxed"
                  style={{ color: "var(--color-body)" }}
                >
                  {post.excerpt}
                </p>
              </div>
              <span
                className="inline-flex items-center gap-1.5 text-[13px] font-medium"
                style={{ color: "var(--color-ink)" }}
              >
                Read full post on LinkedIn
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                  ↗
                </span>
              </span>
            </a>
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </Section>
  );
}
