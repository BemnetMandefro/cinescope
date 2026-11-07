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
    <input
      type="search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search for a movie..."
      className="mb-8 w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-black outline-none focus:border-blue-500"
    />
  );
}