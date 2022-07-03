import {useApolloClient} from '@apollo/client';
import {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Movie from './routes/Movie';
import Movies from './routes/Movies';
import './App.css';
import {
  AllCommentsDocument,
  AllCommentsQuery,
} from './graphql/generated/graphql';

function App() {
  const [init, setInit] = useState(true);
  const apolloClient = useApolloClient();

  useEffect(() => {
    if (init) {
      apolloClient
        .query<AllCommentsQuery>({
          query: AllCommentsDocument,
        })
        .then(result => console.log(result.data.comments));
    }

    setInit(false);
  }, [init, apolloClient]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movies/:id" element={<Movie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
