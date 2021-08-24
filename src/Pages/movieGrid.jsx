/* eslint-disable require-jsdoc */

import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Droppable} from 'react-beautiful-dnd';
import {Container, Grid, List, Paper} from '@material-ui/core';
import MovieBarGraph from '../Components/Reusable/BarGraph';
import {makeStyles} from '@material-ui/core/styles';
import MovieCard from '../Components/Reusable/movieCard';
import MovieChip from '../Components/Reusable/Card';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    display: 'flex',
    marginLeft: '10vw',
  },
  paper: {
    backgroundColor: (props) => props.isDraggingOver? 'lightgrey': '#f8f9fa',
    width: '100vw',
    justifyContent: 'center',
    padding: 20,
    height: '60vh',
    display: 'flex',
    borderRadius: 8,
    margin: '1vw',
  },
  listPaper: {
    overflow: 'scroll',
    borderRadius: 8,
    padding: 10,
    width: '40vw',
  },
}));
function MovieGrid({deleteItemFromGrid, movies}) {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1450);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 1450);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });
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
            <Paper elevation={0}
              className=
                {useStyles({isDraggingOver: snapshot.isDraggingOver}).paper}
              ref={provided.innerRef}
              {...provided.droppableProps}>
              {movies?.length? isDesktop?
              <Paper elevation={10} className={classes.listPaper}>
                <List>
                  {movies?.map((movie, index) =>
                    <MovieCard key={movie.imdbID} title={movie.Title}
                      index={index}
                      postersrc={movie.Poster}
                      deleteItemFromGrid={deleteItem}
                      rating={movie.imdbRating} id={movie.imdbID}>
                      {movie.Plot}</MovieCard>)}
                </List>
              </Paper>:<><div className={classes.list}>
                {movies?.map((movie, index) =>
                  <MovieChip key={movie.imdbID} title={movie.Title}
                    index={index}
                    deleteItem={deleteItem} id={movie.imdbID}/>)}
              </div></>:<></>}
              <Container style={{height: '45vh'}}>
                <MovieBarGraph data={movies}/>
              </Container>
              <br/>
              {provided.placeholder}
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
