import {ApolloServer, gql} from 'apollo-server';
import Comment from './entities/comment';
import Movie from './entities/movie';
import {
  deleteComment,
  getComment,
  getComments,
  postComment,
} from './repositories/comment-repository';
import {getMovie, getMovies} from './repositories/movie-repository';

const typeDefs = gql`
  type Query {
    movies(minimumRating: Float): [Movie!]!
    movie(id: ID!): Movie
    comments(movieId: ID): [Comment!]!
    comment(id: ID!): Comment
  }

  type Mutation {
    postComment(movieId: ID!, message: String!): Comment
    deleteComment(id: ID!): Boolean!
  }

  type Movie {
    id: ID!
    url: String
    imdb_code: String
    title: String
    year: Int
    rating: Float
    runtime: Int
    genres: [String!]
    summary: String
    description_full: String
    synopsis: String
    background_image: String
    small_cover_image: String
    medium_cover_image: String
    large_cover_image: String
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    message: String!
    fromMovie: Movie
  }
`;

const resolvers = {
  Query: {
    movies(_: unknown, {minimumRating}: {minimumRating?: number}) {
      return getMovies(minimumRating);
    },

    movie(_: unknown, {id}: {id: string}) {
      return getMovie(Number(id));
    },

    comments(_: unknown, {movieId}: {movieId?: string}) {
      return getComments(Number(movieId));
    },

    comment(_: unknown, {id}: {id: string}) {
      return getComment(id);
    },
  },

  Mutation: {
    postComment(
      _: unknown,
      {movieId, message}: {movieId: string; message: string}
    ) {
      return postComment(Number(movieId), message);
    },

    deleteComment(_: unknown, {id}: {id: string}) {
      return deleteComment(id);
    },
  },

  Movie: {
    comments(root: Movie) {
      return getComments(root.id);
    },
  },

  Comment: {
    fromMovie(root: Comment) {
      return getMovie(root.movieId);
    },
  },
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
  console.log(`Running on ${url}`);
});
