import {ApolloServer, gql} from 'apollo-server';

const typeDefs = gql`
  type Query {
    movies(minimumRating: Float): [Movie!]!
    movie(id: ID!): Movie
    comments: [Comment!]!
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
  }
`;

const resolvers = {
  Query: {},
  Mutation: {},
  Movie: {},
  Comment: {},
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
  console.log(`Running on ${url}`);
});
