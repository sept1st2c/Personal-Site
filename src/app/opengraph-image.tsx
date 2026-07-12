import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated (not a static file) so it always matches the live hero photo and
// tagline — the same image Gmail/LinkedIn/iMessage/Slack pull in as the link
// preview when this site's URL gets pasted into a cold email or DM.
export default async function OpengraphImage() {
  const photoBuffer = await readFile(join(process.cwd(), "public", "shubh-gupta.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f5f5f5",
          padding: "80px",
          fontFamily: "Helvetica",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 660 }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 600,
              color: "#a8a29e",
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 22,
            }}
          >
            Portfolio
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 80,
              fontWeight: 800,
              color: "#0c0a09",
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            Shubh Gupta
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#4e4e4e", marginTop: 26 }}>
            Fullstack and Agentic AI Developer
          </div>
        </div>
        <img
          src={photoSrc}
          width={360}
          height={450}
          style={{
            borderRadius: 32,
            objectFit: "cover",
            border: "8px solid #ffffff",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
