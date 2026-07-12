import { ReactNode } from "react";

export default function Section({
  id,
  label,
  title,
  children,
  divider = true,
}: {
  id: string;
  label?: string;
  title?: string;
  children: ReactNode;
  divider?: boolean;
}) {
  return (
    <section
      id={id}
      className="mx-auto max-w-[1200px] px-6"
      style={{
        paddingTop: "var(--space-section)",
        paddingBottom: "var(--space-section)",
        borderTop: divider ? "1px solid var(--color-hairline)" : undefined,
      }}
    >
      {(label || title) && (
        <div className="mb-10">
          {label && (
            <p
              className="mb-3 text-[12px] font-semibold uppercase"
              style={{
                color: "var(--color-muted)",
                letterSpacing: "0.96px",
              }}
            >
              {label}
            </p>
          )}
          {title && (
            // .above-grain: without it, the grain layer's soft-light blend
            // sits directly on this dark text and reads as a faint,
            // washed-out tint wherever the atmosphere gradient underneath
            // is strong — the "titles getting low opacity" complaint.
            <h2
              className="above-grain font-display text-[32px] sm:text-[36px]"
              style={{ color: "var(--color-ink)" }}
            >
              {title}
            </h2>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
