import { person } from "@/lib/data";

const links = [
  { label: "Email", href: `mailto:${person.email}` },
  { label: "LinkedIn", href: person.linkedin },
  { label: "GitHub", href: person.github },
  { label: "LeetCode", href: person.leetcode },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      className="border-t"
      style={{ borderColor: "var(--color-hairline)" }}
    >
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-[18px]" style={{ color: "var(--color-ink)" }}>
            {person.name}
          </p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="text-[15px]"
                style={{ color: "var(--color-body)" }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <p className="mt-10 text-[13px]" style={{ color: "var(--color-muted-soft)" }}>
          © {new Date().getFullYear()} {person.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
