"use client";

import Link from "next/link";
import MovieCard from "@/components/MovieCard";
import { useFavorites } from "@/hooks/useFavorites";

export default function FavoritesPage() {
  const { favorites, loaded } = useFavorites();

  return (
    <main className="mx-auto max-w-7xl p-8">
      <Link href="/" className="text-sm text-blue-500 hover:underline">
        ← Back to trending
      </Link>

      <h1 className="mb-8 mt-6 text-3xl font-bold">My Favorites</h1>

      {!loaded ? null : favorites.length > 0 ? (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-neutral-500">
          No favorites yet. Tap the heart on a movie to save it here.
        </p>
      )}
    </main>
  );
}