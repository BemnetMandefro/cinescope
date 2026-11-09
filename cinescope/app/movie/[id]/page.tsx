import Image from "next/image";
import Link from "next/link";
import { getMovieDetails, getImageUrl } from "@/lib/tmdb";
import MovieRow from "@/components/MovieRow";
import Gallery from "@/components/Gallery";

function formatMoney(amount: number) {
  if (!amount) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

const FADE_MASK =
  "linear-gradient(to bottom, black 0%, black 30%, transparent 100%)";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovieDetails(id);
  const poster = getImageUrl(movie.poster_path);
  const backdrop = getImageUrl(movie.backdrop_path, "w1280");

  const videos = movie.videos?.results ?? [];
  const trailer =
    videos.find((v) => v.site === "YouTube" && v.type === "Trailer") ??
    videos.find((v) => v.site === "YouTube" && v.type === "Teaser");

  const cast = (movie.credits?.cast ?? []).slice(0, 12);
  const crew = movie.credits?.crew ?? [];

  const directors = Array.from(
    new Set(crew.filter((c) => c.job === "Director").map((c) => c.name))
  );
  const writers = Array.from(
    new Set(
      crew
        .filter((c) => ["Screenplay", "Writer", "Story"].includes(c.job))
        .map((c) => c.name)
    )
  ).slice(0, 3);

  const budget = formatMoney(movie.budget);
  const revenue = formatMoney(movie.revenue);

  const photos = (movie.images?.backdrops ?? []).slice(0, 15);

  const recommended = movie.recommendations?.results ?? [];
  const similar = (
    recommended.length > 0 ? recommended : movie.similar?.results ?? []
  )
    .filter((m) => m.poster_path)
    .slice(0, 12);

  return (
    <main>
      <section className="relative isolate overflow-hidden">
        {backdrop && (
          <div
            className="absolute inset-0 -z-10"
            style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
          >
            <Image
              src={backdrop}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/20 to-background/80" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-transparent" />
          </div>
        )}

        <div className="mx-auto max-w-6xl px-6 pb-24 pt-10">
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

              <dl className="mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
                {directors.length > 0 && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-widest text-muted">
                      {directors.length > 1 ? "Directors" : "Director"}
                    </dt>
                    <dd className="mt-1 text-white">{directors.join(", ")}</dd>
                  </div>
                )}
                {writers.length > 0 && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-widest text-muted">
                      {writers.length > 1 ? "Writers" : "Writer"}
                    </dt>
                    <dd className="mt-1 text-white">{writers.join(", ")}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-muted">
                    Status
                  </dt>
                  <dd className="mt-1 text-white">{movie.status}</dd>
                </div>
                {budget && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-widest text-muted">
                      Budget
                    </dt>
                    <dd className="mt-1 text-white">{budget}</dd>
                  </div>
                )}
                {revenue && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-widest text-muted">
                      Box Office
                    </dt>
                    <dd className="mt-1 text-accent">{revenue}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-10">
        {trailer && (
          <section>
            <h2 className="mb-4 text-3xl font-display tracking-wide">
              Trailer
            </h2>
            <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 shadow-[0_0_30px_rgba(139,92,246,0.25)]">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${trailer.key}`}
                title={`${movie.title} trailer`}
                allow="accelerometer; encrypted-media; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </section>
        )}

        {cast.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-4 text-3xl font-display tracking-wide">Cast</h2>
            <div className="scrollbar-neon flex gap-4 overflow-x-auto pb-4">
              {cast.map((person) => {
                const photo = getImageUrl(person.profile_path, "w185");
                return (
                  <div
                    key={person.id}
                    className="glow-hover w-36 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-surface hover:border-primary/60"
                  >
                    {photo ? (
                      <Image
                        src={photo}
                        alt={person.name}
                        width={185}
                        height={278}
                        className="h-auto w-full"
                      />
                    ) : (
                      <div className="flex aspect-[2/3] items-center justify-center bg-surface-2 text-3xl text-muted">
                        {person.name.charAt(0)}
                      </div>
                    )}
                    <div className="p-3">
                      <p className="truncate text-sm font-semibold">
                        {person.name}
                      </p>
                      <p className="truncate text-xs text-muted">
                        {person.character}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <Gallery images={photos} title={movie.title} />

        <MovieRow title="More Like This" movies={similar} />
      </div>
    </main>
  );
}