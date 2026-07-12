"use client";

import { useState } from "react";

/**
 * Company mark for the Experience timeline. Three tiers:
 * 1. An explicit `logo` override, when the auto-fetched favicon isn't the
 *    org's actual recognizable mark (e.g. GDG chapter sites don't favicon
 *    their own community logo).
 * 2. The real site favicon (via Google's public favicon service — no
 *    scraping, no API key, works for any domain).
 * 3. A plain two-letter monogram, if the above 404s or is unreachable —
 *    nothing ever renders as a broken image.
 */
export default function CompanyFavicon({
  url,
  monogram,
  logo,
}: {
  url: string;
  monogram: string;
  logo?: string;
}) {
  const [failed, setFailed] = useState(false);
  const hostname = (() => {
    try {
      return new URL(url).hostname;
    } catch {
      return null;
    }
  })();

  const src = logo ?? (hostname ? `https://www.google.com/s2/favicons?domain=${hostname}&sz=64` : null);
  const showImage = src && !failed;

  return (
    <div
      className="flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-full text-[13px] font-semibold"
      style={{
        backgroundColor: "var(--color-surface-strong)",
        color: "var(--color-ink)",
      }}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element -- mix of external favicon service + local override assets, not worth next/image here
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className={logo ? "h-6 w-6 object-contain" : "h-5 w-5"}
          onError={() => setFailed(true)}
        />
      ) : (
        monogram
      )}
    </div>
  );
}
