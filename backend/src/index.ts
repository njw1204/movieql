import {ApolloServer} from 'apollo-server';
import {readFileSync} from 'fs';
import path from 'path';
import {Resolvers} from './generated/graphql-types';
import {
  deleteComment,
  getComment,
  getComments,
  postComment,
} from './repositories/comment-repository';
import {getMovie, getMovies} from './repositories/movie-repository';

const typeDefs = readFileSync(
  path.join(__dirname, '..', 'schema.graphql'),
  'utf-8'
);

const resolvers: Resolvers = {
  Query: {
    movies(_, {minimumRating}) {
      return getMovies(Number(minimumRating));
    },

    movie(_, {id}) {
      return getMovie(Number(id)).then(result => result ?? null);
    },

    comments(_, {movieId}) {
      return getComments(Number(movieId));
    },

    comment(_, {id}) {
      return getComment(id) ?? null;
    },
  },

  Mutation: {
    postComment(_, {movieId, message}) {
      return postComment(Number(movieId), message);
    },

    deleteComment(_, {id}) {
      return deleteComment(id);
    },
  },

  Movie: {
    comments(parent) {
      return getComments(parent.id);
    },
  },

  Comment: {
    fromMovie(parent) {
      return getMovie(parent.movieId).then(result => result ?? null);
    },
  },
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen({port: process.env.PORT || 4000}).then(({url}) => {
  console.log(`Running on ${url}`);
});
