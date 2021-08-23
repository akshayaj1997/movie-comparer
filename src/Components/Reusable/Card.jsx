/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles, createStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import {Draggable} from 'react-beautiful-dnd';
import {CardContent, Chip, Typography} from '@material-ui/core';
import {Rating} from '@material-ui/lab';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: 200,
    },
    media: {
      width: '100%',
      paddingTop: '100%',
    },
  }),
);
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
