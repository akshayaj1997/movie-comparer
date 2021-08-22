/* eslint-disable require-jsdoc */

import React, {Component} from 'react';
import MovieReviewCard from '../Components/Reusable/Card';
import PropTypes from 'prop-types';
import {Droppable} from 'react-beautiful-dnd';
import {Container, Grid, Paper} from '@material-ui/core';
import BarChart from '../Components/Reusable/Graph';
class MovieGrid extends Component {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem(itemId) {
    this.props.deleteItemFromGrid(itemId);
  }
  render() {
    return (
      <>
        <Droppable droppableId= {'movies-grid'}
          direction='horizontal'>
          {(provided)=> <Grid container justifyContent="center"
            ref={provided.innerRef}
            {...provided.droppableProps}>
            <Paper elevation={3} style={{width: '70vw', height: '60vh',
              padding: 20,
              marginBottom: 30}}>
              <div
                style={{display: 'flex'}}>
                {this.props.movies?.length?
                this.props.movies?.map((movie, index) =>
                  <MovieReviewCard key={movie.imdbID} title={movie.Title}
                    index={index}
                    deleteItem={this.deleteItem}
                    id={movie.imdbID} >
                    {movie.Plot}</MovieReviewCard>):<></>}
                {provided.placeholder}
              </div>
              <br/>
              <Container style={{height: '45vh'}}>
                <BarChart movies={this.props.movies} />
              </Container>
            </Paper>
          </Grid>}
        </Droppable>
      </>);
  }
}

MovieGrid.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteItemFromGrid: PropTypes.func.isRequired,
};

export default MovieGrid;
