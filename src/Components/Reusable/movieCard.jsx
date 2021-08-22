import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import {Rating} from '@material-ui/lab';
import {CloseOutlined} from '@material-ui/icons';
import {Draggable} from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
    maxHeight: 200,
    height: 175,
    width: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

/**
 * Reusable Movie List object component
 * @return {ReactNode} Movie List object component
 */
function MovieCard({title, postersrc, children, rating, id, index}) {
  const classes = useStyles();

  return (
    <Draggable draggableId={id} index={index}>
      {(provided)=>(<Paper className={classes.paper}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        innerRef={provided.innerRef}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={postersrc}/>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <Rating value={rating/2} precision={0.1} size='small'
                    readOnly/>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {children}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <CloseOutlined/>
            </Grid>
          </Grid>
        </Grid>
      </Paper>)}
    </Draggable>
  );
}
MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  postersrc: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
  rating: PropTypes.string.isRequired,
  id: PropTypes.any.isRequired,
  index: PropTypes.any.isRequired,
};
export default MovieCard;
