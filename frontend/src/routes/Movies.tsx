import {useQuery} from '@apollo/client';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {
  AllMoviesDocument,
  AllMoviesQuery,
  AllMoviesQueryVariables,
} from '../graphql/generated/graphql';

const MINIMUM_RATING_LOCAL_KEY = 'movieqlMinimumRating';

export default function Movies() {
  const [minimumRating, setMinimumRating] = useState(() => {
    const defaultState = 8;
    const localState = window.localStorage.getItem(MINIMUM_RATING_LOCAL_KEY);

    if (!localState) {
      return defaultState;
    }

    return isNaN(Number(localState)) ? defaultState : Number(localState);
  });
  const {data, error} = useQuery<AllMoviesQuery, AllMoviesQueryVariables>(
    AllMoviesDocument,
    {
      variables: {minimumRating},
    }
  );

  useEffect(() => {
    window.localStorage.setItem(
      MINIMUM_RATING_LOCAL_KEY,
      String(minimumRating)
    );
  }, [minimumRating]);

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <h1>Home</h1>
      <form>
        <label>
          Minimum Rating(0~9):{' '}
          <input
            value={minimumRating}
            onChange={e =>
              setMinimumRating(
                Math.min(
                  Math.max(
                    0,
                    Number(e.currentTarget.value.replace(/[^0-9]/g, '')) || 0
                  ),
                  9
                )
              )
            }
          />
        </label>
      </form>
      {!data ? (
        <h2>Now Loading...</h2>
      ) : (
        <ul>
          {data?.movies.map(movie => (
            <li
              key={movie.id}
              style={{display: 'inline-block', margin: '16px'}}
            >
              <Link
                to={`/movies/${movie.id}`}
                style={{
                  display: 'inline-block',
                  textAlign: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  border: '1px dashed gray',
                }}
              >
                <h2 style={{margin: '0', padding: '4px'}}>{movie.title}</h2>
                <img
                  src={movie.medium_cover_image ?? undefined}
                  alt={movie.title ?? undefined}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
