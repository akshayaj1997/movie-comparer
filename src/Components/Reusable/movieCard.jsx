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
import {Hidden} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
  },
  closeButton: {
    marginTop: -theme.spacing(2),
    marginRight: '-100%',
    zIndex: 100,
    maxWidth: '30px',
    maxHeight: '30px',
  },
}));

/**
 * Reusable Movie List object component
 * @return {ReactNode} Movie List object component
 */
function MovieCard({title, postersrc, children, rating, id, index,
  deleteItemFromGrid}) {
  const classes = useStyles();

  return (
    <Draggable draggableId={id} index={index}>
      {(provided)=>(<Paper className={classes.paper}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        innerRef={provided.innerRef}>
        <CloseOutlined className={classes.closeButton}
          onClick={()=>deleteItemFromGrid(id)}/>
        <Grid container spacing={2}>
          <Hidden smDown>
            <Grid item xs={1} sm={3} md={3} lg={3} xl={3}>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={postersrc}/>
              </ButtonBase>
            </Grid>
          </Hidden>
          <Hidden xlUp smDown>
            <Grid item sm={8}>
              <Typography gutterBottom variant="subtitle1">
                {title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <Rating value={rating/2} precision={0.1} size='small'
                  readOnly/>
              </Typography>
            </Grid>
          </Hidden>
          <Hidden lgDown>
            <Grid item xl={9} container>
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
            </Grid>
          </Hidden>
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
  deleteItemFromGrid: PropTypes.func.isRequired,
};
export default MovieCard;
