import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import MovieImageItem from './movieImageCard';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    width: '70vw',
  },
  imageList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      // eslint-disable-next-line max-len
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const itemData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 * @return {ReactNode} ImageList
 */
function HorizontalScrollList({movies, deleteFromGrid}) {
  const classes = useStyles();

  const deleteFromGridItems = (itemId) => {
    deleteFromGrid(itemId);
  };

  return (
    <div className={classes.root}>
      <ImageList className={classes.imageList} cols={2.5}>
        {movies.map((movie, index) => (
          <MovieImageItem key={movie.imdbID} title={movie.Title}
            index={index}
            postersrc={movie.Poster}
            deleteItemFromGrid={deleteFromGridItems}
            rating={movie.imdbRating} id={movie.imdbID}/>
        ))}
      </ImageList>
    </div>
  );
}

HorizontalScrollList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  deleteFromGrid: PropTypes.func.isRequired,
};
export default HorizontalScrollList;
