import React, {useState} from 'react';
import SearchBar from './Reusable/SearchBar';
import axios from 'axios';
import MovieMetaData from './Reusable/MetaData';
import PropTypes from 'prop-types';
/**
 * Renders the movie search component to be rendered in the modal form
 * @return {ReactNode} search component
 */
function SearchComponent({sendMovieData}) {
  const [movieDisplay, setMovieDisplay] = useState({});
  const [movieOpen, setMovieOpen] = useState(false);
  const loading = JSON.stringify(movieDisplay) !== JSON.stringify({});
  /**
   * props callback to display movie
   * @param {Object} movie
   */
  async function setMovie(movie) {
    const response = await axios.get(`https://www.omdbapi.com/?apikey=15bcf215&i=${movie.imdbID}&r=json`);
    const movies = await response.data;
    if (response.data.Response) sendMovieData(response.data);
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
    <MovieMetaData movie={movieDisplay}/>:<></>}
  </>);
}

SearchComponent.propTypes = {
  sendMovieData: PropTypes.func,
};
export default SearchComponent;
