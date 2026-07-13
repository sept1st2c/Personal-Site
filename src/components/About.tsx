import { about } from "@/lib/data";
import Section from "./Section";
import Reveal from "./Reveal";

export default function About() {
  return (
    <Section id="about" label="About" title="A bit about me">
      <div className="max-w-[640px] space-y-5">
        {about.paragraphs.map((paragraph, i) => (
          <Reveal key={paragraph} delay={i * 0.1}>
            <p
              className="text-[17px] leading-relaxed"
              style={{ color: "var(--color-body)" }}
            >
              {paragraph}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
