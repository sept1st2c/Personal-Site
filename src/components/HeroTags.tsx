import { PopGroup, PopItem } from "./PopGroup";
import TechBadge from "./TechBadge";

// Kept as its own small component (rather than inlining into Hero.tsx)
// purely so the call site stays simple — actual stagger/pop animation now
// lives in the shared PopGroup/PopItem primitives (see PopGroup.tsx) used
// the same way across the site, instead of a bespoke implementation here.
export default function HeroTags({ tags }: { tags: string[] }) {
  return (
    <PopGroup className="order-5 mt-8 flex flex-wrap gap-2 sm:order-4" stagger={0.04} delayChildren={0.5}>
      {tags.map((tag) => (
        <PopItem key={tag} className="inline-flex transition-transform hover:scale-105">
          <TechBadge label={tag} />
        </PopItem>
      ))}
    </PopGroup>
  );
}
