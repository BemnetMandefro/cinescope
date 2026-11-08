import { Suspense } from "react";
import { CATEGORIES, getMoviesByCategory, searchMovies } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import Hero from "@/components/Hero";
import CategoryTabs from "@/components/CategoryTabs";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category: categoryParam } = await searchParams;
  const query = q?.trim();

  const activeCategory =
    CATEGORIES.find((c) => c.key === categoryParam) ?? CATEGORIES[0];

  const movies = query
    ? await searchMovies(query)
    : await getMoviesByCategory(activeCategory.key);

  const heroMovie = query ? undefined : movies.find((m) => m.backdrop_path);
  const gridMovies = heroMovie
    ? movies.filter((m) => m.id !== heroMovie.id)
    : movies;

  return (
    <main>
      {heroMovie && (
        <Hero movie={heroMovie} label={`#1 ${activeCategory.label}`} />
      )}

      <section className="mx-auto max-w-7xl px-6 py-10">
        <Suspense>
          <SearchBar />
        </Suspense>

        {!query && <CategoryTabs active={activeCategory.key} />}

        <h1 className="mb-8 text-4xl">
          {query ? `Results for "${query}"` : activeCategory.label}
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