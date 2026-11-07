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
      className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-xl text-white transition hover:scale-110"
    >
      {active ? "❤️" : "🤍"}
    </button>
  );
}