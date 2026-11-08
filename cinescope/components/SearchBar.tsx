"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") ?? "";
  const [value, setValue] = useState(currentQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value.trim() === currentQuery) return;
      const params = new URLSearchParams();
      if (value.trim()) params.set("q", value.trim());
      router.replace(params.toString() ? `/?${params}` : "/");
    }, 400);

    return () => clearTimeout(timer);
  }, [value, currentQuery, router]);

  return (
    <div className="relative mb-10">
      <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-muted">
        🔍
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search for a movie..."
        className="w-full rounded-full border border-white/10 bg-surface py-4 pl-14 pr-6 text-white placeholder:text-muted outline-none transition focus:border-primary focus:shadow-[0_0_22px_rgba(139,92,246,0.45)]"
      />
    </div>
  );
}
