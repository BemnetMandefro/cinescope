"use client";

import { useState } from "react";
import { Review } from "@/types/movie";

const PREVIEW_LENGTH = 400;

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);

  const isLong = review.content.length > PREVIEW_LENGTH;
  const text =
    expanded || !isLong
      ? review.content
      : `${review.content.slice(0, PREVIEW_LENGTH).trimEnd()}...`;

  const date = new Date(review.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

  const rating = review.author_details.rating;

  return (
    <article className="rounded-xl border border-white/10 bg-surface p-6">
      <header className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/20 text-lg font-semibold text-primary">
          {review.author.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold">{review.author}</p>
          <p className="text-xs text-muted">{date}</p>
        </div>

        {rating !== null && (
          <span className="rounded-md bg-black/40 px-3 py-1 text-sm font-semibold text-accent">
            ★ {rating}/10
          </span>
        )}
      </header>

      <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-gray-300">
        {text}
      </p>

      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="mt-3 text-sm font-medium text-primary transition hover:text-accent"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </article>
  );
}

export default function Reviews({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="mb-6 text-3xl font-display tracking-wide">Reviews</h2>
      <div className="grid gap-5 md:grid-cols-2">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}