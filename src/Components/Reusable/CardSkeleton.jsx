import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import {Skeleton} from '@material-ui/lab';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '80%',
    margin: '10%',
  },
  media: {
    maxWidth: '80%',
    height: '80%',
    paddingTop: '100%',
    margin: '10%',
    alignContent: 'center',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: 'Green',
    fontSize: 15,
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));
/**
 * Movie Meta data display element to display the movie data in modal
 * @param {Array} movie object passed to render metadata
 * @return {ReactNode} MovieMetaData movie details display element
 */
function MovieMetaDataSkeleton() {
  const classes = useStyles();

  return (
    Response?
    <Card className={classes.root}>
      <CardHeader
        title={<Skeleton/>}
        subheader={<Skeleton/>}
        action={ <Skeleton/>}
      />
      <CardMedia className={classes.media}
      ><Skeleton className={classes.media}/></CardMedia>
      <CardContent>
        <Skeleton/>
      </CardContent>
      <Skeleton/>
      <Skeleton/>
    </Card>: <Skeleton/>
  );
}
MovieMetaDataSkeleton.propTypes = {
  movie: PropTypes.object,
};
export default MovieMetaDataSkeleton;
