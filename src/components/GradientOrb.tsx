// The single gradient-orb moment for the whole page: sky -> lavender -> peach,
// soft radial, blurred, decorative only, positioned behind the hero headline.
// Never used as a button fill / text color / card background.
export default function GradientOrb() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -z-10"
      style={{
        top: "-140px",
        left: "-120px",
        width: "560px",
        height: "560px",
        background:
          "radial-gradient(circle at 30% 30%, var(--gradient-sky), var(--gradient-lavender) 45%, var(--gradient-peach) 75%, transparent 78%)",
        filter: "blur(64px)",
        opacity: 0.5,
      }}
    />
  );
}
