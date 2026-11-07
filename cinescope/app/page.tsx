import { Suspense } from "react";
import { getTrendingMovies, searchMovies } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim();
  const movies = query ? await searchMovies(query) : await getTrendingMovies();

  return (
    <main className="mx-auto max-w-7xl p-8">
      <Suspense>
        <SearchBar />
      </Suspense>

      <h1 className="mb-8 text-3xl font-bold">
        {query ? `Results for "${query}"` : "Trending This Week"}
      </h1>

      {movies.length > 0 ? (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-neutral-500">No movies found. Try another search.</p>
      )}
    </main>
  );
}