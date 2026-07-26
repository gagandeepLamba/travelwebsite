import Link from "next/link";
import { packageCategories } from "@/lib/constants/site";
import { cn } from "@/lib/utils";

export function CategoryFilter({ active }: { active?: string }) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
      <Link
        href="/packages"
        className={cn(
          "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
          !active
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border text-foreground hover:border-primary/50"
        )}
      >
        All packages
      </Link>
      {packageCategories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/packages?category=${cat.slug}`}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            active === cat.slug
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border text-foreground hover:border-primary/50"
          )}
        >
          {cat.label}
        </Link>
      ))}
    </div>
  );
}
