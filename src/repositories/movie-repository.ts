import fetch from 'node-fetch';
import Movie from '../entities/movie';

export function getMovies(minimumRating?: number) {
  const url = minimumRating
    ? `https://yts.mx/api/v2/list_movies.json?minimum_rating=${minimumRating}&sort_by=year`
    : `https://yts.mx/api/v2/list_movies.json?sort_by=year`;

  return fetch(url)
    .then(
      response =>
        response.json() as {
          data?: {
            movies?: Movie[];
          };
        }
    )
    .then(json => json?.data?.movies || []);
}

export function getMovie(id: number) {
  const url = `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`;

  return fetch(url)
    .then(
      response =>
        response.json() as {
          data?: {
            movie?: Movie;
          };
        }
    )
    .then(json => json?.data?.movie);
}
