import React, {useState} from 'react';
import SearchBar from '../Components/Reusable/searchBar';
import axios from 'axios';
import MovieMetaData from '../Components/Reusable/metaData';
import PropTypes from 'prop-types';
/**
 * Renders the movie search component to be rendered in the modal form
 * @return {ReactNode} search component
 */
function SearchComponent({sendMovieData}) {
  const [movieDisplay, setMovieDisplay] = useState({});
  /**
   * props callback to display movie
   * @param {object} movie
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
     * @return {func} search component to be rendered on the page
     */
  return (<>
    <SearchBar movieDisplay={setMovie}/>
    {JSON.stringify(movieDisplay) !== JSON.stringify({})?
    <MovieMetaData movie={movieDisplay}/>:<></>}
  </>);
}

SearchComponent.propTypes = {
  sendMovieData: PropTypes.func,
};
export default SearchComponent;
