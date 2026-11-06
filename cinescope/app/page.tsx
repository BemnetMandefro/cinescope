import { getTrendingMovies } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";

export default async function Home() {
  const movies = await getTrendingMovies();

  return (
    <main className="mx-auto max-w-7xl p-8">
      <h1 className="mb-8 text-3xl font-bold">Trending This Week</h1>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}