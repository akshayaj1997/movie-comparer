import React from 'react';
import './App.css';
import MoviePage from './Pages/moviePage';

/**
 * Single App component at the very top of the SPA rendered DOM Tree
 * @return {Component} App component rendered from the root
 */
function App() {
  return (
    <div className="App">
      <MoviePage/>
    </div>
  );
}

export default App;
