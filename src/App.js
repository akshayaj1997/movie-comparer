import React from 'react';
import './App.css';
import {ErrorBoundary} from 'react-error-boundary';
import MoviePage from './Pages/MovieComparePage';
import errorBoundaryHandler from './Components/errorBoundaryHandler';
import {Provider} from 'react-redux';
import {store} from './state/MovieDetailsReducer';

/**
 * SPA application root for an application that compares movies by graphing the
 * IMDb rating of films. The page is divided into 2 parts + Search functionality
 * 1. Movie Grid which contains the graphing region for visual comparision of
 * the movies
 * 2. Movie List that contain the list of movies we can add to the comparison
 * After searching for a movie, the user will be able to view
 * the metadata in the movie details section in the wireframe
 * @return {ReactNode} App component rendered from the root
 */
function App() {
  return (
    <ErrorBoundary FallbackComponent={errorBoundaryHandler}>
      <div className="App">
        <Provider store={store}>
          <MoviePage/>
        </Provider>
      </div>
    </ErrorBoundary>
  );
}

export default App;
