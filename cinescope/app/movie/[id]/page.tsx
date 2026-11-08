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
  const backdrop = getImageUrl(movie.backdrop_path, "w1280");

  return (
    <main className="relative">
      {backdrop && (
        <div className="absolute inset-x-0 top-0 -z-10 h-[75vh] overflow-hidden">
          <Image
            src={backdrop}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        </div>
      )}

      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link
          href="/"
          className="glow-hover inline-block rounded-full border border-white/20 px-5 py-2 text-sm text-white hover:border-primary"
        >
          ← Back
        </Link>

        <div className="mt-10 flex flex-col gap-10 md:flex-row">
          {poster ? (
            <Image
              src={poster}
              alt={movie.title}
              width={500}
              height={750}
              priority
              className="h-auto w-full rounded-xl border border-white/10 shadow-[0_0_40px_rgba(139,92,246,0.35)] md:w-80"
            />
          ) : (
            <div className="flex aspect-[2/3] w-full items-center justify-center rounded-xl bg-surface-2 text-muted md:w-80">
              No poster
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-5xl md:text-7xl">{movie.title}</h1>

            {movie.tagline && (
              <p className="mt-3 italic text-accent">{movie.tagline}</p>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted">
              <span className="rounded-md bg-surface px-3 py-1 font-semibold text-accent">
                ★ {movie.vote_average.toFixed(1)}
              </span>
              <span>{movie.release_date?.slice(0, 4)}</span>
              {movie.runtime ? <span>{movie.runtime} min</span> : null}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full border border-primary/50 bg-primary/10 px-4 py-1 text-sm text-white"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <h2 className="mt-8 text-sm font-semibold uppercase tracking-widest text-muted">
              Overview
            </h2>
            <p className="mt-2 max-w-2xl leading-relaxed text-gray-300">
              {movie.overview || "No overview available."}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
