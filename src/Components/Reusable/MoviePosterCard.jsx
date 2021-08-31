import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import {Rating} from '@material-ui/lab';
import {Draggable} from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import {Close} from '@material-ui/icons';
import {IconButton, Paper} from '@material-ui/core';
import {useDispatch} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    width: '70vw',
    margin: 10,
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      // eslint-disable-next-line max-len
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  actionIcon: {
    color: 'white',
  },
}));

/**
 * Returns list item of movie object for horizontally scrollable list
 * @param {Object} props {title, postersrc, rating,
 *   id, index, deleteItemFromGrid, customClick}
 * @param {string} props.title Movie title
 * @param {string} props.postersrc url of the src of the poster of the movie
 * @param {string/number} props.rating rating of the movie
 * @param {string/number} props.id imdb id of the movie to uniquely identify it
 * @param {any} props.index unique index of the item in the dragdropcontext
 * @param {function} props.deleteItemFromGrid callback to delete the item from
 * the list grid
 * @param {function} props.customClick callback to onclick function to display
 * movie meta on clicking movie
 * @return {ReactNode} HorizontalScrollList Component that allows
 * list of children to be horizontally scrollable.
 */
function MovieImageItem({title, postersrc, rating,
  id, index, customClick}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  /**
   * deletes item from list component
   * @param {string} itemId the item that needs to be deleted
   */
  function deleteFromList(itemId) {
    dispatch({type: 'DELETE_FROM_LIST',
      payload: itemId});
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided)=>(
        <ImageListItem
          component={Paper}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}>
          <img src={postersrc} alt={title} height={'100%'}
            onClick={customClick}/>
          <ImageListItemBar
            title= {<ItemTitle title={title} rating={rating/2}/>}
            classes={{
              root: classes.titleBar,
            }}
            position='top'
            actionIcon={<IconButton className={classes.actionIcon}
              onClick={()=>{
                deleteFromList(id);
              }}>
              <Close/>
            </IconButton>}
          />
        </ImageListItem>)}
    </Draggable>
  );
}

MovieImageItem.propTypes = {
  title: PropTypes.string.isRequired,
  postersrc: PropTypes.string.isRequired,
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  index: PropTypes.any.isRequired,
  customClick: PropTypes.func.isRequired,
};

export default MovieImageItem;
/**
 * Movie card title
 * @param {Object} props {title, rating}
 * @param {string} props.title title of the card to be returned
 * @param {string/number} props.rating rating of the movie
 * @return {ReactNode} title for the image
 */
function ItemTitle({title, rating}) {
  return (<>
    {title}
    <br/>
    <Rating value={rating} precision={0.1} size='small'
      readOnly/>
  </>);
}

ItemTitle.propTypes = {
  title: PropTypes.string.isRequired,
  rating: PropTypes.any,
};
