"use client";

import { Movie } from "@/types/movie";
import { useFavorites } from "@/hooks/useFavorites";

export default function FavoriteButton({ movie }: { movie: Movie }) {
  const { isFavorite, toggleFavorite, loaded } = useFavorites();
  const active = loaded && isFavorite(movie.id);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(movie)}
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 backdrop-blur transition hover:scale-110 hover:bg-black/80 active:scale-95"
    >
      <svg
        viewBox="0 0 24 24"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`h-5 w-5 transition duration-200 ${
          active
            ? "fill-red-500 stroke-red-500 drop-shadow-[0_0_6px_rgba(239,68,68,0.9)]"
            : "fill-transparent stroke-white"
        }`}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}