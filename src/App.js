import React from 'react';
import './App.css';
import MovieGrid from './Pages/movieGrid';

/**
 * Single App component at the very top of the SPA rendered DOM Tree
 * @return {Component} App component rendered from the root
 */
function App() {
  return (
    <div className="App">
      <MovieGrid/>
    </div>
  );
}

export default App;
