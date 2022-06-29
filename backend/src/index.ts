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
    """
    영화 목록 조회

    (minimumRating: 최소 평점 필터링)
    """
    movies(minimumRating: Float): [Movie!]!

    """
    영화 단건 조회
    """
    movie(id: ID!): Movie

    """
    댓글 목록 조회

    (movieId: 해당 영화의 댓글만 필터링)
    """
    comments(movieId: ID): [Comment!]!

    """
    댓글 단건 조회
    """
    comment(id: ID!): Comment
  }

  type Mutation {
    """
    댓글 작성
    """
    postComment(movieId: ID!, message: String!): Comment

    """
    댓글 삭제
    """
    deleteComment(id: ID!): Boolean!
  }

  """
  영화
  """
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
    """
    댓글 목록
    """
    comments: [Comment!]!
  }

  """
  댓글
  """
  type Comment {
    id: ID!
    message: String!
    """
    댓글의 대상 영화
    """
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

server.listen({port: process.env.PORT || 4000}).then(({url}) => {
  console.log(`Running on ${url}`);
});
