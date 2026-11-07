import { Suspense } from "react";
import { getTrendingMovies, searchMovies } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import Hero from "@/components/Hero";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim();
  const movies = query ? await searchMovies(query) : await getTrendingMovies();

  const heroMovie = query ? undefined : movies.find((m) => m.backdrop_path);
  const gridMovies = heroMovie
    ? movies.filter((m) => m.id !== heroMovie.id)
    : movies;

  return (
    <main>
      {heroMovie && <Hero movie={heroMovie} />}

      <section className="mx-auto max-w-7xl px-6 py-10">
        <Suspense>
          <SearchBar />
        </Suspense>

        <h1 className="mb-8 text-4xl">
          {query ? `Results for "${query}"` : "Trending This Week"}
        </h1>

        {gridMovies.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {gridMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-muted">No movies found. Try another search.</p>
        )}
      </section>
    </main>
  );
}