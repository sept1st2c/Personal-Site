import { education } from "@/lib/data";
import Section from "./Section";

export default function Education() {
  return (
    <Section id="education" label="Education">
      <p className="text-[16px]" style={{ color: "var(--color-body)" }}>
        <span style={{ color: "var(--color-ink)", fontWeight: 500 }}>
          {education.school}
        </span>{" "}
        — {education.degree} — {education.cgpa} — {education.period}
      </p>
    </Section>
  );
}
