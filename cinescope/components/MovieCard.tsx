import Image from "next/image";
import { Movie } from "@/types/movie";
import { getImageUrl } from "@/lib/tmdb";

export default function MovieCard({ movie }: { movie: Movie }) {
  const poster = getImageUrl(movie.poster_path);

  return (
    <div className="overflow-hidden rounded-lg bg-neutral-900 text-white">
      {poster ? (
        <Image
          src={poster}
          alt={movie.title}
          width={500}
          height={750}
          className="h-auto w-full"
        />
      ) : (
        <div className="flex aspect-[2/3] items-center justify-center bg-neutral-800 text-sm text-neutral-400">
          No poster
        </div>
      )}
      <div className="p-3">
        <h2 className="truncate font-semibold">{movie.title}</h2>
        <p className="text-sm text-neutral-400">
          ⭐ {movie.vote_average.toFixed(1)} · {movie.release_date?.slice(0, 4)}
        </p>
      </div>
    </div>
  );
}