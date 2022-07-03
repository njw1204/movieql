import {useQuery} from '@apollo/client';
import {Link, useParams} from 'react-router-dom';
import {MOVIE} from '../graphql';

export default function Movie() {
  const {id} = useParams();
  const {data, loading, error} = useQuery(MOVIE, {variables: {id}});

  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div
      style={
        data?.movie?.background_image && {
          color: 'white',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${data?.movie?.background_image})`,
          backgroundSize: 'cover',
        }
      }
    >
      <h1>Movie</h1>
      <div style={{padding: '0 8px 8px'}}>
        {loading ? (
          <h2>Now Loading...</h2>
        ) : (
          <>
            <h2>
              {data.movie.title} ⭐️
              {data.movie.rating.toFixed(1)} (<a href={data.movie.url}>Links</a>
              )
            </h2>
            <p>{[data.movie.year, ...(data.movie.genres ?? [])].join(', ')}</p>
            <p>
              <img
                src={data.movie.medium_cover_image}
                alt={data.movie.title}
                style={{
                  margin: '0 8px 8px 0',
                  float: 'left',
                  border: '1px dashed whitesmoke',
                }}
              />
              <span
                dangerouslySetInnerHTML={{__html: data.movie.description_full}}
              ></span>
            </p>
            <div style={{clear: 'both'}}></div>
          </>
        )}
        <hr />
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}
