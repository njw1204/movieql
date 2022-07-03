import {useQuery} from '@apollo/client';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {ALL_MOVIES} from '../graphql';

const MINIMUM_RATING_LOCAL_KEY = 'movieqlMinimumRating';

export default function Movies() {
  const [minimumRating, setMinimumRating] = useState(() => {
    const localState = window.localStorage.getItem(MINIMUM_RATING_LOCAL_KEY);
    return (localState && Number(localState)) ?? 8;
  });
  const {data, loading, error} = useQuery(ALL_MOVIES, {
    variables: {minimumRating},
  });

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
      {loading ? (
        <h2>Now Loading...</h2>
      ) : (
        <ul>
          {data.movies.map((movie: any) => (
            <li
              key={movie.id}
              style={{display: 'inline-block', margin: '12px'}}
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
                <img src={movie.medium_cover_image} alt={movie.title} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
