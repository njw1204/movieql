import {useApolloClient} from '@apollo/client';
import {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ALL_COMMENTS} from './graphql';
import Movie from './routes/Movie';
import Movies from './routes/Movies';
import './App.css';

function App() {
  const [init, setInit] = useState(true);
  const apolloClient = useApolloClient();

  useEffect(() => {
    if (init) {
      apolloClient
        .query({
          query: ALL_COMMENTS,
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
