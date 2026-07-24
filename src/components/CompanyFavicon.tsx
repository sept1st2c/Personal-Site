"use client";

import { useState } from "react";

/**
 * Company mark for the Experience timeline. Three tiers:
 * 1. An explicit `logo` override, when the auto-fetched favicon isn't the
 *    org's actual recognizable mark.
 * 2. The real site favicon (via Google's public favicon service — no
 *    scraping, no API key, works for any domain).
 * 3. A plain two-letter monogram, if the above 404s or is unreachable —
 *    nothing ever renders as a broken image.
 *
 * `invertFavicon` flips an auto-fetched favicon's colors via CSS filter —
 * needed for RecMaf, whose favicon is a near-white glyph on a transparent
 * background (confirmed by zooming into the rendered badge: it was
 * essentially invisible against this component's own light circular
 * background). `invert()` only touches RGB, not alpha, so the transparent
 * parts of the icon stay transparent and only the glyph itself darkens.
 * Never applied to an explicit `logo` override, since those are already
 * correctly-colored local assets (e.g. gdg.png).
 */
export default function CompanyFavicon({
  url,
  monogram,
  logo,
  invertFavicon,
}: {
  url: string;
  monogram: string;
  logo?: string;
  invertFavicon?: boolean;
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
          style={!logo && invertFavicon ? { filter: "invert(1)" } : undefined}
          onError={() => setFailed(true)}
        />
      ) : (
        monogram
      )}
    </div>
  );
}
