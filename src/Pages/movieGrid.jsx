/* eslint-disable require-jsdoc */

import React from 'react';
import PropTypes from 'prop-types';
import {Droppable} from 'react-beautiful-dnd';
import {Container, Grid, List, Paper} from '@material-ui/core';
import MovieBarGraph from '../Components/Reusable/BarGraph';
import {makeStyles} from '@material-ui/core/styles';
import MovieCard from '../Components/Reusable/movieCard';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    width: '100vw',
  },
  list: {
    flexWrap: 'nowrap',
    overflow: 'scroll',
  },
  paper: {
    backgroundColor: (props) => props.isDraggingOver? 'lightgrey':'white',
    width: '70vw',
    justifyContent: 'center',
    padding: 20,
    height: '60vh',
    display: 'flex',
    borderRadius: 8,
  },
}));
function MovieGrid({deleteItemFromGrid, movies}) {
  const classes = useStyles();
  const deleteItem =(itemId) =>{
    deleteItemFromGrid(itemId);
  };
  return (
    <>
      <Grid container justifyContent="center">
        <Droppable droppableId= {'movies-grid'}
          direction='horizontal'>
          {(provided, snapshot)=>
            <Paper elevation={10}
              className=
                {useStyles({isDraggingOver: snapshot.isDraggingOver}).paper}
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}>
              <Container style={{height: '45vh'}}>
                <MovieBarGraph data={movies}/>
              </Container>
              <List className={classes.list}>
                {movies?.length?
                movies?.map((movie, index) =>
                  <MovieCard key={movie.imdbID} title={movie.Title}
                    index={index}
                    postersrc={movie.Poster}
                    deleteItemFromGrid={deleteItem}
                    rating={movie.imdbRating} id={movie.imdbID}>
                    {movie.Plot}</MovieCard>):<></>}
                {provided.placeholder}
              </List>
              <br/>
            </Paper>
          }
        </Droppable>
      </Grid>
    </>);
}

MovieGrid.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteItemFromGrid: PropTypes.func.isRequired,
};

export default MovieGrid;
