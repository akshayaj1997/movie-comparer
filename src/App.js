import React from 'react';
import './App.css';
import ErrorBoundary from './Pages/errorBoundary';
import MoviePage from './Pages/moviePage';

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
    <ErrorBoundary>
      <div className="App">
        <MoviePage/>
      </div>
    </ErrorBoundary>
  );
}

export default App;
