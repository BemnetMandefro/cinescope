import { Movie, MovieDetails, MovieResponse } from "@/types/movie";

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

export type Category = "trending" | "popular" | "top_rated" | "now_playing";

export const CATEGORIES: { key: Category; label: string }[] = [
  { key: "trending", label: "Trending" },
  { key: "popular", label: "Popular" },
  { key: "top_rated", label: "Top Rated" },
  { key: "now_playing", label: "Now Playing" },
];

const CATEGORY_ENDPOINTS: Record<Category, string> = {
  trending: "/trending/movie/week",
  popular: "/movie/popular",
  top_rated: "/movie/top_rated",
  now_playing: "/movie/now_playing",
};

export async function getMoviesByCategory(
  category: Category
): Promise<Movie[]> {
  const data = await fetchTMDB<MovieResponse>(CATEGORY_ENDPOINTS[category]);
  return data.results;
}

export async function getTrendingMovies(): Promise<Movie[]> {
  return getMoviesByCategory("trending");
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const data = await fetchTMDB<MovieResponse>(
    `/search/movie?query=${encodeURIComponent(query)}`
  );
  return data.results;
}

export async function getMovieDetails(id: string): Promise<MovieDetails> {
  return fetchTMDB<MovieDetails>(
    `/movie/${id}?append_to_response=credits,videos,images,reviews,recommendations,similar,watch/providers&include_image_language=en,null`
  );
}

export function getImageUrl(path: string | null, size = "w500") {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
}