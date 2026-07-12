import { about } from "@/lib/data";
import Section from "./Section";

export default function About() {
  return (
    <Section id="about" label="About" title="A bit about me">
      <div className="max-w-[640px] space-y-5">
        {about.paragraphs.map((paragraph) => (
          <p
            key={paragraph}
            className="text-[17px] leading-relaxed"
            style={{ color: "var(--color-body)" }}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}
