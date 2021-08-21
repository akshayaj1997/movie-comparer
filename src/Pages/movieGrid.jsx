/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import MovieReviewCard from '../Components/Reusable/Card';
import PropTypes from 'prop-types';
import {Droppable} from 'react-beautiful-dnd';
import {Grid, Paper} from '@material-ui/core';
class MovieGrid extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Droppable droppableId= {'movies-grid'}
        direction='horizontal'>
        {(provided)=> <Grid container justifyContent="center"
          ref={provided.innerRef}
          {...provided.droppableProps}>
          <Paper elevation={3} style={{width: '50%', height: 500, padding: 20,
            marginBottom: 30}}>
            <div
              style={{display: 'flex'}}>
              {this.props.movies.map((movie, index) =>
                <MovieReviewCard key={movie.imdbID} title={movie.Title}
                  index={index}
                  postersrc={movie.Poster}
                  rating={movie.imdbRating} id={movie.imdbID}>
                  {movie.Plot}</MovieReviewCard>)}
              {provided.placeholder}
            </div>
          </Paper>
        </Grid>}
      </Droppable>);
  }
}

MovieGrid.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MovieGrid;
