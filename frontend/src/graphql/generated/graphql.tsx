import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** 댓글 */
export type Comment = {
  __typename?: 'Comment';
  /** 댓글의 대상 영화 */
  fromMovie?: Maybe<Movie>;
  id: Scalars['ID'];
  message: Scalars['String'];
};

/** 영화 */
export type Movie = {
  __typename?: 'Movie';
  background_image?: Maybe<Scalars['String']>;
  /** 댓글 목록 */
  comments: Array<Comment>;
  description_full?: Maybe<Scalars['String']>;
  genres?: Maybe<Array<Scalars['String']>>;
  id: Scalars['ID'];
  imdb_code?: Maybe<Scalars['String']>;
  large_cover_image?: Maybe<Scalars['String']>;
  medium_cover_image?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Float']>;
  runtime?: Maybe<Scalars['Int']>;
  small_cover_image?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  synopsis?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** 댓글 삭제 */
  deleteComment: Scalars['Boolean'];
  /** 댓글 작성 */
  postComment?: Maybe<Comment>;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID'];
};


export type MutationPostCommentArgs = {
  message: Scalars['String'];
  movieId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  /** 댓글 단건 조회 */
  comment?: Maybe<Comment>;
  /**
   * 댓글 목록 조회
   *
   * (movieId: 해당 영화의 댓글만 필터링)
   */
  comments: Array<Comment>;
  /** 영화 단건 조회 */
  movie?: Maybe<Movie>;
  /**
   * 영화 목록 조회
   *
   * (minimumRating: 최소 평점 필터링)
   */
  movies: Array<Movie>;
};


export type QueryCommentArgs = {
  id: Scalars['ID'];
};


export type QueryCommentsArgs = {
  movieId?: InputMaybe<Scalars['ID']>;
};


export type QueryMovieArgs = {
  id: Scalars['ID'];
};


export type QueryMoviesArgs = {
  minimumRating?: InputMaybe<Scalars['Float']>;
};

export type AllMoviesQueryVariables = Exact<{
  minimumRating?: InputMaybe<Scalars['Float']>;
}>;


export type AllMoviesQuery = { __typename?: 'Query', movies: Array<{ __typename?: 'Movie', id: string, url?: string | null, imdb_code?: string | null, title?: string | null, year?: number | null, rating?: number | null, runtime?: number | null, genres?: Array<string> | null, summary?: string | null, description_full?: string | null, synopsis?: string | null, background_image?: string | null, small_cover_image?: string | null, medium_cover_image?: string | null, large_cover_image?: string | null }> };

export type MovieQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MovieQuery = { __typename?: 'Query', movie?: { __typename?: 'Movie', id: string, url?: string | null, imdb_code?: string | null, title?: string | null, year?: number | null, rating?: number | null, runtime?: number | null, genres?: Array<string> | null, summary?: string | null, description_full?: string | null, synopsis?: string | null, background_image?: string | null, small_cover_image?: string | null, medium_cover_image?: string | null, large_cover_image?: string | null, comments: Array<{ __typename?: 'Comment', id: string, message: string }> } | null };

export type AllCommentsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCommentsQuery = { __typename?: 'Query', comments: Array<{ __typename?: 'Comment', id: string, message: string, fromMovie?: { __typename?: 'Movie', id: string, title?: string | null } | null }> };


export const AllMoviesDocument = gql`
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

/**
 * __useAllMoviesQuery__
 *
 * To run a query within a React component, call `useAllMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllMoviesQuery({
 *   variables: {
 *      minimumRating: // value for 'minimumRating'
 *   },
 * });
 */
export function useAllMoviesQuery(baseOptions?: Apollo.QueryHookOptions<AllMoviesQuery, AllMoviesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllMoviesQuery, AllMoviesQueryVariables>(AllMoviesDocument, options);
      }
export function useAllMoviesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllMoviesQuery, AllMoviesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllMoviesQuery, AllMoviesQueryVariables>(AllMoviesDocument, options);
        }
export type AllMoviesQueryHookResult = ReturnType<typeof useAllMoviesQuery>;
export type AllMoviesLazyQueryHookResult = ReturnType<typeof useAllMoviesLazyQuery>;
export type AllMoviesQueryResult = Apollo.QueryResult<AllMoviesQuery, AllMoviesQueryVariables>;
export const MovieDocument = gql`
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

/**
 * __useMovieQuery__
 *
 * To run a query within a React component, call `useMovieQuery` and pass it any options that fit your needs.
 * When your component renders, `useMovieQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMovieQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMovieQuery(baseOptions: Apollo.QueryHookOptions<MovieQuery, MovieQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MovieQuery, MovieQueryVariables>(MovieDocument, options);
      }
export function useMovieLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MovieQuery, MovieQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MovieQuery, MovieQueryVariables>(MovieDocument, options);
        }
export type MovieQueryHookResult = ReturnType<typeof useMovieQuery>;
export type MovieLazyQueryHookResult = ReturnType<typeof useMovieLazyQuery>;
export type MovieQueryResult = Apollo.QueryResult<MovieQuery, MovieQueryVariables>;
export const AllCommentsDocument = gql`
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

/**
 * __useAllCommentsQuery__
 *
 * To run a query within a React component, call `useAllCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllCommentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllCommentsQuery(baseOptions?: Apollo.QueryHookOptions<AllCommentsQuery, AllCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllCommentsQuery, AllCommentsQueryVariables>(AllCommentsDocument, options);
      }
export function useAllCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllCommentsQuery, AllCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllCommentsQuery, AllCommentsQueryVariables>(AllCommentsDocument, options);
        }
export type AllCommentsQueryHookResult = ReturnType<typeof useAllCommentsQuery>;
export type AllCommentsLazyQueryHookResult = ReturnType<typeof useAllCommentsLazyQuery>;
export type AllCommentsQueryResult = Apollo.QueryResult<AllCommentsQuery, AllCommentsQueryVariables>;