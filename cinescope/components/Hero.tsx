import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/types/movie";
import { getImageUrl } from "@/lib/tmdb";

export default function Hero({
  movie,
  label,
}: {
  movie: Movie;
  label: string;
}) {
  const backdrop = getImageUrl(movie.backdrop_path, "w1280");

  return (
    <section className="relative h-[70vh] min-h-[420px] w-full overflow-hidden">
      {backdrop && (
        <Image
          src={backdrop}
          alt={movie.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-transparent" />

      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto max-w-7xl px-6 pb-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
            {label}
          </p>
          <h2 className="font-display text-5xl tracking-wide md:text-7xl">
            {movie.title}
          </h2>
          <p className="mt-4 max-w-xl text-sm text-gray-300 line-clamp-3 md:text-base">
            {movie.overview}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <Link
              href={`/movie/${movie.id}`}
              className="glow-hover rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white"
            >
              View Details
            </Link>
            <span className="text-sm text-muted">
              ⭐ {movie.vote_average.toFixed(1)} ·{" "}
              {movie.release_date?.slice(0, 4)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}