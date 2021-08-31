import React, {useState} from 'react';
import SearchBar from './Reusable/MovieSearchBar';
import axios from 'axios';
import MovieMetaData from './Reusable/MovieMetaData';
import PropTypes from 'prop-types';
import MovieMetaDataSkeleton from './Reusable/CardSkeleton';
import {APIKey} from '../APIKey';
/**
 * Renders the movie search component to be rendered in the modal form
 * @return {ReactNode} search component
 */
function SearchComponent({sendMovieData}) {
  const [movieDisplay, setMovieDisplay] = useState({});
  const [fetchInProgress, setFetchInProgress] = useState(false);
  const loading = JSON.stringify(movieDisplay) !== JSON.stringify({});
  /**
   * props callback to display movie
   * @param {Object} movie
   */
  async function setMovie(movie) {
    setFetchInProgress(true);
    setMovieDisplay({});
    const response = await axios.get(`https://www.omdbapi.com/?apikey=${APIKey}&i=${movie.imdbID}&r=json`);
    const movies = await response.data;
    setFetchInProgress(false);
    if (movies.Response === 'True') sendMovieData(response.data);
    setMovieDisplay(movies);
  }
  /**
     * render Render a React element into the DOM in the supplied
     * container and return a reference to the component
     * (in this case the search component)
     * @return {ReactNode} search component to be rendered on the modal form
     */
  return (<>
    <SearchBar movieDisplay={setMovie}/>
    {loading ?
    <MovieMetaData movie={movieDisplay}/>:fetchInProgress?
    <MovieMetaDataSkeleton/>:<></>}
  </>);
}

SearchComponent.propTypes = {
  sendMovieData: PropTypes.func,
};
export default SearchComponent;
