/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import SearchBar from './Reusable/MovieSearchBar';
import axios from 'axios';
import PropTypes from 'prop-types';
import {APIKey} from '../APIKey';
import {Button, TextField} from '@material-ui/core';
// import {useDispatch} from 'react-redux';
// import {ADD_MOVIE} from '../state/MovieDetailsReducer';
/**
 * Renders the movie search component to be rendered in the modal form
 * @return {ReactNode} search component
 */
function SearchComponent({sendMovieData}) {
  const [moviesList, setMoviesList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  // const [fetchInProgress, setFetchInProgress] = useState(false);
  // const loading = JSON.stringify(movieDisplay) !== JSON.stringify({});
  // const dispatch = useDispatch();
  /**
   * props callback to display movie
   * @param {Object} movie
   */
  async function setMovie(movie=[]) {
    const movies = [];
    const data = movie.Search;
    // eslint-disable-next-line guard-for-in
    for (const m in data) {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=${APIKey}&i=${data[m].imdbID}&r=json`);
      const newMovie = await response.data;
      movies.push(newMovie);
    };
    // if (movies.Response === 'True') {
    //   dispatch({type: ADD_MOVIE, payload: movies});
    // }
    if (movies.length > 0) sendMovieData(movies);
  }
  const handleSearch = async (value) => {
    const response = await axios.get(`https://www.omdbapi.com/?apikey=${APIKey}&s=${value}&r=json`);
    const responseData = await response.data;
    setMoviesList(responseData);
    setMovie(responseData);
  };

  return (<>
    {/* <SearchBar movieDisplay={setMovie}/>
    {JSON.stringify(moviesList)} */}
    <TextField
      value={searchValue}
      label="Search Movies"
      variant='standard'
      onChange={(e)=> {
        if (e.target.value !== '' || e.target.value !== null) {
          setSearchValue(e.target.value);
          console.log(e.target.value);
        }
      }}/>
    <Button onClick={()=>{
      handleSearch(searchValue);
    }}>Search</Button>
    <br/>
    {JSON.stringify(moviesList)}
    {/* {loading ?
    <MovieMetaData movie={movieDisplay}/>:fetchInProgress?
    <MovieMetaDataSkeleton/>:<></>} */}
  </>);
}

SearchComponent.propTypes = {
  sendMovieData: PropTypes.func,
};
export default SearchComponent;
