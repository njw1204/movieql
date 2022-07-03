import {ApolloClient, gql, InMemoryCache} from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

export const ALL_MOVIES = gql`
  query AllMovies($minimumRating: Float) {
    movies(minimumRating: $minimumRating) {
      id
      url
      imdb_code
      title
      year
      rating
      runtime
      genres
      summary
      description_full
      synopsis
      background_image
      small_cover_image
      medium_cover_image
      large_cover_image
    }
  }
`;

export const MOVIE = gql`
  query Movie($id: ID!) {
    movie(id: $id) {
      id
      url
      imdb_code
      title
      year
      rating
      runtime
      genres
      summary
      description_full
      synopsis
      background_image
      small_cover_image
      medium_cover_image
      large_cover_image
      comments {
        id
        message
      }
    }
  }
`;

export const ALL_COMMENTS = gql`
  query AllComments {
    comments {
      id
      message
      fromMovie {
        id
        title
      }
    }
  }
`;
