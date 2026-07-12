import { FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { SiGithub, SiLeetcode } from "react-icons/si";
import { person } from "@/lib/data";

const iconLinks = [
  { label: "LinkedIn", href: person.linkedin, Icon: FaLinkedin },
  { label: "X", href: person.twitter, Icon: FaXTwitter },
  { label: "GitHub", href: person.github, Icon: SiGithub },
  { label: "LeetCode", href: person.leetcode, Icon: SiLeetcode },
].filter((link) => link.href);

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      {iconLinks.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-[var(--color-surface-strong)]"
          style={{ borderColor: "var(--color-hairline-strong)", color: "var(--color-ink)" }}
        >
          <Icon size={17} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
