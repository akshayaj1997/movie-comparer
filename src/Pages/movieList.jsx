/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
// import MovieReviewCard from '../Components/Reusable/Card';
import PropTypes from 'prop-types';
import {Droppable} from 'react-beautiful-dnd';
import {Grid, Paper} from '@material-ui/core';
import MovieCard from '../Components/Reusable/movieCard';
class MovieList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<Grid container justifyContent="center">
      <Paper elevation={3} style={{width: '70%', height: 200, padding: 20,
        marginTop: 30, overflow: 'scroll'}}>
        <Droppable droppableId= {this.props.columnId}
          direction='horizontal'>
          {(provided)=><div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{display: 'flex'}}>
            {this.props.movies.map((movie, index) =>
              <MovieCard key={movie.imdbID} title={movie.Title}
                index={index}
                postersrc={movie.Poster}
                rating={movie.imdbRating} id={movie.imdbID}>
                {movie.Plot}</MovieCard>)}
            {provided.placeholder}
          </div>}
        </Droppable>
      </Paper>
    </Grid>);
  }
}

MovieList.propTypes = {
  columnId: PropTypes.any,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MovieList;
