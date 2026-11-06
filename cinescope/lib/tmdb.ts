import { Movie, MovieResponse } from "@/types/movie";

const BASE_URL = "https://api.themoviedb.org/3";

async function fetchTMDB<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      accept: "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`TMDB request failed: ${res.status}`);
  }

  return res.json();
}

export async function getTrendingMovies(): Promise<Movie[]> {
  const data = await fetchTMDB<MovieResponse>("/trending/movie/week");
  return data.results;
}

export function getImageUrl(path: string | null, size = "w500") {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
}