import Link from "next/link";
import { CATEGORIES, Category } from "@/lib/tmdb";

export default function CategoryTabs({ active }: { active: Category }) {
  return (
    <div className="scrollbar-neon -mx-6 -mt-4 mb-2 flex gap-3 overflow-x-auto px-6 py-6">
      {CATEGORIES.map((category) => {
        const isActive = category.key === active;

        return (
          <Link
            key={category.key}
            href={
              category.key === "trending"
                ? "/"
                : `/?category=${category.key}`
            }
            className={`glow-hover shrink-0 rounded-full border px-5 py-2 text-sm font-medium transition ${
              isActive
                ? "border-primary bg-primary text-white shadow-[0_0_18px_rgba(139,92,246,0.5)]"
                : "border-white/15 text-muted hover:border-primary/60 hover:text-white"
            }`}
          >
            {category.label}
          </Link>
        );
      })}
    </div>
  );
}