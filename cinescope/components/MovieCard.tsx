import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/types/movie";
import { getImageUrl } from "@/lib/tmdb";
import FavoriteButton from "@/components/FavoriteButton";

export default function MovieCard({ movie }: { movie: Movie }) {
  const poster = getImageUrl(movie.poster_path);

  return (
    <div className="glow-hover group relative overflow-hidden rounded-xl border border-white/10 bg-surface transition hover:-translate-y-1 hover:border-primary/60">
      <Link href={`/movie/${movie.id}`} className="block">
        <div className="relative">
          {poster ? (
            <Image
              src={poster}
              alt={movie.title}
              width={500}
              height={750}
              className="h-auto w-full transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex aspect-[2/3] items-center justify-center bg-surface-2 text-sm text-muted">
              No poster
            </div>
          )}

          <span className="absolute left-2 top-2 rounded-md bg-black/70 px-2 py-1 text-xs font-semibold text-accent backdrop-blur">
            ★ {movie.vote_average.toFixed(1)}
          </span>
        </div>

        <div className="p-4">
          <h2 className="truncate font-semibold">{movie.title}</h2>
          <p className="mt-1 text-sm text-muted">
            {movie.release_date?.slice(0, 4) || "TBA"}
          </p>
        </div>
      </Link>

      <div className="absolute right-2 top-2">
        <FavoriteButton movie={movie} />
      </div>
    </div>
  );
}
