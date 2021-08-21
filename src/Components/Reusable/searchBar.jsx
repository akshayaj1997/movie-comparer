/* eslint-disable no-use-before-define */
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    'width': 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));
/**
 *  Reusable Search bar component made from MUI
 * @return {func} Search bar component
 */
function SearchBar({options, title, defaultValue}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={options}
        getOptionLabel={(option) => option[title]}
        defaultValue={defaultValue}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="filterSelectedOptions"
            placeholder="Favorites"
          />
        )}
      />
    </div>
  );
}

SearchBar.propTypes = {
  options: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
};
export default SearchBar;

