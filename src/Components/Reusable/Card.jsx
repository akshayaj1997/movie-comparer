
import React from 'react';
import PropTypes from 'prop-types';
import {Draggable} from 'react-beautiful-dnd';
import {Chip} from '@material-ui/core';

/**
 * Reusable Card component created from MUI cards
 * @return {func} Card component with the data provided in props
 */
function MovieChip({title, id, deleteItem, index}) {
// const classes = useStyles();
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
