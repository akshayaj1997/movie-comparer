
import React from 'react';
import PropTypes from 'prop-types';
import {Draggable} from 'react-beautiful-dnd';
import {Chip} from '@material-ui/core';

/**
 * Returns list item of movie object in a MUI chip shape for scrollable list
 * @param {Object} props {title, id, deleteItem, index}
 * @param {string} props.title Movie title
 * @param {string/number} props.id imdb id of the movie to uniquely identify it
 * @param {function} props.deleteItemFromGrid callback to delete the item from
 * the list grid
 * @param {any} props.index unique index of the item in the dragdropcontext
 * @return {ReactNode} Card component with the data provided in props
 */
function MovieChip({title, id, deleteItem, index}) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot)=>(
        <Chip {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef} label={title}
          onDelete={()=>{
            deleteItem(id);
          }}/>
      )}
    </Draggable>
  );
}

MovieChip.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.any.isRequired,
  index: PropTypes.any.isRequired,
  deleteItem: PropTypes.func.isRequired,
};
export default MovieChip;
