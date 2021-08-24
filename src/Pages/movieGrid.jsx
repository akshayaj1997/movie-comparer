

import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Droppable} from 'react-beautiful-dnd';
import {Container, Grid, List, Paper} from '@material-ui/core';
import MovieBarGraph from '../Components/Reusable/BarGraph';
import {makeStyles} from '@material-ui/core/styles';
import MovieCard from '../Components/Reusable/movieCard';
import MovieChip from '../Components/Reusable/MovieChip';

const useStyles = makeStyles((theme) => ({
  list: {
    display: 'flex',
    overflow: 'scroll',
    justifyContent: 'center',
    marginInlineEnd: '10vw',
    marginInlineStart: '10vw',
  },
  paper: {
    backgroundColor: (props) => props.isDraggingOver? 'lightgrey': '#f8f9fa',
    width: '100vw',
    justifyContent: 'center',
    display: (props) => props.isDesktop? 'flex':'block',
    padding: 20,
    height: '60vh',
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
/**
 * Renders movies which are being compared and the comparision graph
 * @param {Object} obj {deleteItemFromGrid, movies}
 * @param {function} obj.deleteItemFromGrid: callback to delete movie from grid
 * @param {Array} obj.movie array of the movie objects to be rendered in grid
 * @return {ReactNode} returns movie grid component
 */
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
                {useStyles({isDraggingOver: snapshot.isDraggingOver,
                  isDesktop: isDesktop}).paper}
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
              </Paper>:<List className={classes.list}>
                {movies?.map((movie, index) =>
                  <MovieChip key={movie.imdbID} title={movie.Title}
                    index={index}
                    deleteItem={deleteItem} id={movie.imdbID}/>)}
              </List>:<></>}
              <br/>
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
