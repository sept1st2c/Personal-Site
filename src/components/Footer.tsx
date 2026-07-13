import { person } from "@/lib/data";
import Reveal from "./Reveal";
import { PopGroup, PopItem } from "./PopGroup";

const links = [
  { label: "Email", href: `mailto:${person.email}` },
  { label: "LinkedIn", href: person.linkedin },
  { label: "X", href: person.twitter },
  { label: "GitHub", href: person.github },
  { label: "LeetCode", href: person.leetcode },
].filter((link) => link.href);

export default function Footer() {
  return (
    <footer
      id="footer"
      className="border-t"
      style={{ borderColor: "var(--color-hairline)" }}
    >
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-[18px]" style={{ color: "var(--color-ink)" }}>
              {person.name}
            </p>
            <PopGroup as="nav" className="flex flex-wrap gap-x-6 gap-y-2" stagger={0.06}>
              {links.map((link) => (
                <PopItem key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="link-underline text-[15px]"
                    style={{ color: "var(--color-body)" }}
                  >
                    {link.label}
                  </a>
                </PopItem>
              ))}
            </PopGroup>
          </div>
          <p className="mt-10 text-[13px]" style={{ color: "var(--color-muted-soft)" }}>
            © {new Date().getFullYear()} {person.name}. All rights reserved.
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
