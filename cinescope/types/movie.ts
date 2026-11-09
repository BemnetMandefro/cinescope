export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Video {
  id: string;
  key: string;
  site: string;
  type: string;
  name: string;
}

export interface MovieImage {
  file_path: string;
  width: number;
  height: number;
}

export interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
  author_details: {
    rating: number | null;
  };
}

export interface WatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string | null;
}

export interface CountryProviders {
  link: string;
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
}

export interface MovieDetails extends Movie {
  runtime: number | null;
  tagline: string;
  genres: Genre[];
  status: string;
  budget: number;
  revenue: number;
  credits?: { cast: CastMember[]; crew: CrewMember[] };
  videos?: { results: Video[] };
  images?: { backdrops: MovieImage[] };
  reviews?: { results: Review[] };
  similar?: { results: Movie[] };
  "watch/providers"?: { results: Record<string, CountryProviders> };
}