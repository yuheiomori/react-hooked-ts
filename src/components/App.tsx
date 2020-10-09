import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from "./Header";
import Movie, { IMovie } from "./Movie";
import Search from "./Search";

console.log(process.env);
const INITIAL_SEARCH_KEY = "man"
const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const MOVIE_API_URL = `https://www.omdbapi.com/?s=${INITIAL_SEARCH_KEY}&apikey=${OMDB_API_KEY}`; 



const App = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        setMovies(jsonResponse.Search);
        setLoading(false);
      });
  }, []);

  const search = (searchValue: string) => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=${OMDB_API_KEY}`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  };


  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favorite movies</p>

      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
              movies.map((movie: IMovie, index: number) => (
                <Movie key={`${index}-${movie.Title}`} movie={movie} />
              ))
            )}
      </div>
    </div>
  );
};



export default App;
