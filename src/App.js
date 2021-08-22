import React from 'react';
import './App.css';
import ErrorBoundary from './Pages/errorBoundary';
import MoviePage from './Pages/moviePage';

/**
 * Single App component at the very top of the SPA rendered DOM Tree
 * @return {Component} App component rendered from the root
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
