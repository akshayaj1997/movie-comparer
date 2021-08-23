/* eslint-disable require-jsdoc */

import React from 'react';
import PropTypes from 'prop-types';
import {Droppable} from 'react-beautiful-dnd';
import {Grid, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import MovieImageItem from '../Components/Reusable/movieImageCard';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    width: '100vw',
  },
  imageList: {
    flexWrap: 'nowrap',
  },
  paper: {
    backgroundColor: (props) => props.isDraggingOver? 'lightgray':'white',
    width: '70vw',
    height: '30vh',
    justifyContent: 'center',
    padding: 20,
    display: 'flex',
    borderRadius: 8,
  },
}));
function MovieList({deleteItemFromGrid, columnId, movies}) {
  const classes = useStyles();
  const deleteFromGrid = (item) => {
    deleteItemFromGrid(item);
  };

  return (
    <Grid container justifyContent="center">
      <Droppable droppableId= {columnId}
        direction='horizontal'>
        {(provided, snapshot)=>
          <Paper elevation={10}
            className=
              {useStyles({isDraggingOver: snapshot.isDraggingOver}).paper}
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}>
            <ImageList
              className=
                {classes.imageList}
              cols={100}
              gap={9} rowHeight={'35vh'}
            >
              {movies.map((movie, index) => (
                <MovieImageItem key={movie.imdbID} title={movie.Title}
                  index={index}
                  postersrc={movie.Poster}
                  deleteItemFromGrid={deleteFromGrid}
                  rating={movie.imdbRating} id={movie.imdbID}/>
              ))}
              {provided.placeholder}
            </ImageList>
          </Paper>
        }
      </Droppable>
    </Grid>);
}

MovieList.propTypes = {
  columnId: PropTypes.any,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteItemFromGrid: PropTypes.func.isRequired,
};

export default MovieList;
