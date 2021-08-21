import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles, createStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import {Draggable} from 'react-beautiful-dnd';
import {CardContent, Typography} from '@material-ui/core';
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
function MovieReviewCard({title, postersrc, children, rating, id, index}) {
  const classes = useStyles();
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot)=>(<Card className={classes.root} raised
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        innerRef={provided.innerRef}>
        <CardMedia
          className={classes.media}
          image={postersrc}
          title={title}
        />
        <CardContent>
          <Typography>
            {title}
          </Typography>
          <Typography>
            <Rating value={rating} precision={0.1} size='small' readOnly/>
          </Typography>
        </CardContent>
      </Card>)}
    </Draggable>
  );
}

MovieReviewCard.propTypes = {
  title: PropTypes.string.isRequired,
  postersrc: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
  rating: PropTypes.string.isRequired,
  id: PropTypes.any.isRequired,
  index: PropTypes.any.isRequired,
};
export default MovieReviewCard;
