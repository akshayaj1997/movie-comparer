
import React from 'react';
import PropTypes from 'prop-types';
import {Draggable} from 'react-beautiful-dnd';
import {Chip} from '@material-ui/core';
import {useContext} from 'react';
import {Context} from '../../state/contextProvider/Context';

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
function MovieChip({title, id, index, customClick}) {
  const context = useContext(Context);

  /**
   * deletes item from grid/graph component
   * @param {string} itemId the item that needs to be deleted
   */
  function deleteFromGrid(itemId) {
    context.deleteFromGrid(itemId);
  }
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot)=>(
        <Chip {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef} label={title}
          onDelete={()=>{
            deleteFromGrid(id);
          }}
          clickable
          onClick={customClick}/>
      )}
    </Draggable>
  );
}

MovieChip.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.any.isRequired,
  index: PropTypes.any.isRequired,
  customClick: PropTypes.func.isRequired,
};
export default MovieChip;
