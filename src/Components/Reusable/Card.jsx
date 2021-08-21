import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles, createStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
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
      backgroundColor: red[500],
    },
  }),
);
/**
 * Reusable Card component created from MUI cards
 * @return {func} Card component with the data provided in props
 */
function MovieReviewCard({title, postersrc, children, rating}) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="delete">
            <CloseIcon />
          </IconButton>
        }
        title={title}
        subheader={rating}
      />
      <CardMedia
        className={classes.media}
        image={postersrc}
        title={title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {children}
        </Typography>
      </CardContent>
    </Card>
  );
}

MovieReviewCard.propTypes = {
  title: PropTypes.string.isRequired,
  postersrc: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  rating: PropTypes.number.isRequired,
};
export default MovieReviewCard;
