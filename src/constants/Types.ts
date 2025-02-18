export interface Genre {
  id: number;
  name: string;
}

export interface Cast {
  id: number;
  name: string;
  profile_path: string;
}

export interface Crew {
  job: string;
  name: string;
  id: number;
  profile_path: string;
}

export interface MediaDetails {
  title?: string;
  name?: string;
  backdrop_path?: string;
  poster_path?: string;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
  tagline?: string;
  overview?: string;
  status?: string;
  genres?: Genre[];
  profile_path?: string;
  credits?: {
    cast: Cast[];
    crew: Crew[];
  };
  runtime?: number;
  vote_count?: number;
}

export interface Movie {
  id: number;
  title: string;
  name: string;
  genre: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  popularity: number;
  overview: string;
  release_date: string;
  media_type: string;
}

export interface ScrollingProps {
  data: Movie[];
  heading: string;
}

export interface CardProps {
  data: Movie;
  index: number;
  label: string;
}
