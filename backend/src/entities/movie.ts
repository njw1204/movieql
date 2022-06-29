interface Movie {
  id: number;
  url?: string;
  imdb_code?: string;
  title?: string;
  year?: number;
  rating?: number;
  runtime?: number;
  genres?: string[];
  summary?: string;
  description_full?: string;
  synopsis?: string;
  background_image?: string;
  small_cover_image?: string;
  medium_cover_image?: string;
  large_cover_image?: string;
}

export default Movie;
