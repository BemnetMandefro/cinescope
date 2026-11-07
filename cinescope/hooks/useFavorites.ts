"use client";

import { useEffect, useState } from "react";
import { Movie } from "@/types/movie";

const STORAGE_KEY = "cinescope-favorites";

function readStored(): Movie[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setFavorites(readStored());
    setLoaded(true);
  }, []);

  function toggleFavorite(movie: Movie) {
    const current = readStored();
    const exists = current.some((m) => m.id === movie.id);
    const next = exists
      ? current.filter((m) => m.id !== movie.id)
      : [...current, movie];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore write errors
    }
    setFavorites(next);
  }

  function isFavorite(id: number) {
    return favorites.some((m) => m.id === id);
  }

  return { favorites, loaded, toggleFavorite, isFavorite };
}