"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { MovieImage } from "@/types/movie";
import { getImageUrl } from "@/lib/tmdb";

export default function Gallery({
  images,
  title,
}: {
  images: MovieImage[];
  title: string;
}) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);

  const next = useCallback(
    () =>
      setIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );

  const prev = useCallback(
    () =>
      setIndex((i) =>
        i === null ? null : (i - 1 + images.length) % images.length
      ),
    [images.length]
  );

  useEffect(() => {
    if (index === null) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [index, close, next, prev]);

  if (images.length === 0) return null;

  const current = index !== null ? images[index] : null;

  return (
    <section className="mt-16">
      <h2 className="mb-2 text-3xl font-display tracking-wide">Photos</h2>

      <div className="scrollbar-neon -mx-6 flex gap-4 overflow-x-auto px-6 py-6">
        {images.map((image, i) => (
          <button
            key={image.file_path}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Open photo ${i + 1} of ${images.length}`}
            className="glow-hover relative aspect-video w-72 shrink-0 overflow-hidden rounded-xl border border-white/10 hover:border-primary/60"
          >
            <Image
              src={getImageUrl(image.file_path, "w500") ?? ""}
              alt={`${title} still ${i + 1}`}
              fill
              sizes="288px"
              className="object-cover transition duration-300 hover:scale-105"
            />
          </button>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photo viewer`}
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close viewer"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xl text-white transition hover:bg-primary"
          >
            ✕
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous photo"
                className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition hover:bg-primary"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next photo"
                className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition hover:bg-primary"
              >
                ›
              </button>
            </>
          )}

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative h-[80vh] w-[92vw] max-w-6xl"
          >
            <Image
              src={getImageUrl(current.file_path, "w1280") ?? ""}
              alt={`${title} still ${index! + 1}`}
              fill
              sizes="92vw"
              className="object-contain"
            />
          </div>

          <p className="absolute bottom-5 text-sm text-muted">
            {index! + 1} / {images.length}
          </p>
        </div>
      )}
    </section>
  );
}