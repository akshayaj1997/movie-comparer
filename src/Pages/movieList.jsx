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
    this.deleteFromGrid = this.deleteFromGrid.bind(this);
  }

  deleteFromGrid(item) {
    this.props.deleteItemFromGrid(item);
  }

  render() {
    return (
      <Grid container justifyContent="center">
        <Droppable droppableId= {this.props.columnId}
          direction='horizontal'>
          {(provided)=>
            <Paper elevation={3} style={{width: '70%', height: 200, padding: 20,
              marginTop: 30, display: 'flex', overflowX: 'scroll'}
            }
            ref={provided.innerRef}
            {...provided.droppableProps}>
              {this.props.movies.map((movie, index) =>
                <MovieCard key={movie.imdbID} title={movie.Title}
                  index={index}
                  postersrc={movie.Poster}
                  deleteItemFromGrid={this.deleteFromGrid}
                  rating={movie.imdbRating} id={movie.imdbID}>
                  {movie.Plot}</MovieCard>)}
              {provided.placeholder}
            </Paper>
          }
        </Droppable>
      </Grid>);
  }
}

MovieList.propTypes = {
  columnId: PropTypes.any,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteItemFromGrid: PropTypes.func.isRequired,
};

export default MovieList;
