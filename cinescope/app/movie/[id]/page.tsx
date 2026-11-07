import Image from "next/image";
import Link from "next/link";
import { getMovieDetails, getImageUrl } from "@/lib/tmdb";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovieDetails(id);
  const poster = getImageUrl(movie.poster_path);

  return (
    <main className="mx-auto max-w-5xl p-8">
      <Link href="/" className="text-sm text-blue-500 hover:underline">
        ← Back to trending
      </Link>

      <div className="mt-6 flex flex-col gap-8 md:flex-row">
        {poster ? (
          <Image
            src={poster}
            alt={movie.title}
            width={500}
            height={750}
            className="h-auto w-full rounded-lg md:w-80"
          />
        ) : (
          <div className="flex aspect-[2/3] w-full items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 md:w-80">
            No poster
          </div>
        )}

        <div>
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          {movie.tagline && (
            <p className="mt-2 italic text-neutral-500">{movie.tagline}</p>
          )}
          <p className="mt-4 text-sm text-neutral-500">
            ⭐ {movie.vote_average.toFixed(1)} · {movie.release_date?.slice(0, 4)}
            {movie.runtime ? ` · ${movie.runtime} min` : ""}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="rounded-full bg-neutral-800 px-3 py-1 text-sm text-white"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <p className="mt-6 leading-relaxed">{movie.overview}</p>
        </div>
      </div>
    </main>
  );
}