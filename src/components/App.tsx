import React, { useReducer, useEffect , Reducer} from 'react';
import '../App.css';
import Header from "./Header";
import Movie, { IMovie } from "./Movie";
import Search from "./Search";


const INITIAL_SEARCH_KEY = "man"
const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const MOVIE_API_URL = `https://www.omdbapi.com/?s=${INITIAL_SEARCH_KEY}&apikey=${OMDB_API_KEY}`; 

enum ActionType {
  SEARCH_MOVIES_REQUEST = "SEARCH_MOVIES_REQUEST",
  SEARCH_MOVIES_SUCCESS = "SEARCH_MOVIES_SUCCESS",
  SEARCH_MOVIES_FAILURE = "SEARCH_MOVIES_FAILURE"
}

interface IAppState {
  loading: boolean
  movies: IMovie[]
  errorMessage?: string | null
}

interface IAppAction {
  type: ActionType,
  payload?: IAppState["movies"]
  error?: IAppState["errorMessage"]
}


const initialState: IAppState = {
  loading: true,
  movies: [],
  errorMessage: null
};


const reducer = (state:  IAppState, action: IAppAction): IAppState => {
  switch (action.type) {
    case ActionType.SEARCH_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case ActionType.SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        // !でエラー回避
        movies: action.payload!
      };
    case ActionType.SEARCH_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.error!
      };
    default:
      return state;
  }
};



const App = () => {

  const [state, dispatch] = useReducer<Reducer<IAppState, IAppAction>>(reducer, initialState)

  

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
          type: ActionType.SEARCH_MOVIES_SUCCESS,
          payload: jsonResponse.Search
        })
      });
  }, []);

  const search = (searchValue: string) => {
    dispatch({
      type: ActionType.SEARCH_MOVIES_REQUEST,
    })

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=${OMDB_API_KEY}`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          dispatch({
            type: ActionType.SEARCH_MOVIES_SUCCESS,
            payload: jsonResponse.Search
          })

        } else {
          dispatch({
            type: ActionType.SEARCH_MOVIES_FAILURE,
            error: jsonResponse.Error
          })
        }
      });
  };

  const {movies, errorMessage, loading} = state;


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
