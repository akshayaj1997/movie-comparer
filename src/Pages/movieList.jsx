

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Droppable} from 'react-beautiful-dnd';
import {Button, Grid, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import MovieImageItem from '../Components/Reusable/movieImageCard';
import {useRef} from 'react';
import {ArrowBackIos, ArrowForwardIos} from '@material-ui/icons';
import ModalForm from '../Components/Reusable/ModalForm';
import MovieMetaData from '../Components/Reusable/metaData';

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
/**
 * Renders movies which have been added to be picked to compare
 * @param {Object} props {deleteItemFromGrid, columnId, movies}
 * @param {function} props.deleteItemFromGrid:callback to delete movie from grid
 * @param {Array} props.movies of the movie objects to be rendered in list
 * @param {string/number} props.columnId to uniquely identify the droppable area
 * @return {ReactNode} returns movie list component
 */
function MovieList({deleteItemFromGrid, columnId, movies}) {
  const classes = useStyles();
  const scrollingListRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [movieData, setMovieData] = useState({});
  const deleteFromGrid = (item) => {
    deleteItemFromGrid(item);
  };

  const handleScrollButtonOnClick = (offset) => {
    const scrollByVal = (window.innerWidth*offset)/100;
    if (scrollingListRef.current) {
      scrollingListRef.current.scroll(
          {left: scrollingListRef.current.scrollLeft+scrollByVal,
            behavior: 'smooth'});
    }
  };

  return (
    <Grid container justifyContent="center">
      <ModalForm
        isopen={openModal}
        enableSaveButton={false}
        header={'Show Movie'} toggle={()=>{
          setOpenModal(!openModal);
        }}>
        <MovieMetaData movie={movieData}/>
      </ModalForm>
      <Button onClick={()=>handleScrollButtonOnClick(-50)}>
        <ArrowBackIos/></Button>
      <Droppable droppableId= {columnId}
        direction='horizontal'>
        {(provided, snapshot)=>
          <Paper elevation={10}
            className=
              {useStyles({isDraggingOver: snapshot.isDraggingOver}).paper}
            ref={provided.innerRef}
            {...provided.droppableProps}>
            <ImageList
              className=
                {classes.imageList}
              cols={100}
              gap={9}
              ref={scrollingListRef}
            >
              {movies.map((movie, index) => (
                <MovieImageItem key={movie.imdbID} title={movie.Title}
                  index={index}
                  postersrc={movie.Poster}
                  deleteItemFromGrid={deleteFromGrid}
                  rating={movie.imdbRating} id={movie.imdbID}
                  customClick={()=>{
                    setMovieData(movie);
                    setOpenModal(!openModal);
                  }}/>
              ))}
              {provided.placeholder}
            </ImageList>
          </Paper>
        }
      </Droppable>
      <Button onClick={()=>handleScrollButtonOnClick(50)}>
        <ArrowForwardIos/></Button>
    </Grid>);
}

MovieList.propTypes = {
  columnId: PropTypes.any,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteItemFromGrid: PropTypes.func.isRequired,
};

export default MovieList;
