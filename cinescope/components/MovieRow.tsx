import { Movie } from "@/types/movie";
import MovieCard from "@/components/MovieCard";

export default function MovieRow({
  title,
  movies,
}: {
  title: string;
  movies: Movie[];
}) {
  if (movies.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="mb-2 text-3xl font-display tracking-wide">{title}</h2>
      <div className="scrollbar-neon -mx-6 flex gap-5 overflow-x-auto px-6 py-6">
        {movies.map((movie) => (
          <div key={movie.id} className="w-44 shrink-0">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
}