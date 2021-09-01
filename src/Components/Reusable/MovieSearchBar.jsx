// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import axios from 'axios';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Search} from '@material-ui/icons';
import PropTypes from 'prop-types';
import {APIKey} from '../../APIKey';

/**
 * Reusable Search Bar component created from MUI
 * @param {function} callback function that returns to movie selected
 * @return {React.Node} Search Bar component with Movies
 */
function SearchBar({movieDisplay}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [noOptionsText, setNoOptionsText] = React.useState('No Options');
  const loading = open && options.length === 0;
  const handleSearchChange = async (value) => {
    const response = await axios.get(`https://www.omdbapi.com/?apikey=${APIKey}&s=${value}&r=json`);
    const responseData = await response.data;
    const movies = responseData.Response==='True' ? (response.data?.Search) :
                    [];
    setOptions(movies);
    if (options.length === 0) setNoOptionsText(responseData.Error);
    if (options.length > 0) movieDisplay(movies);
  };

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="search-component"
      style={{width: '80%'}}
      open={open}
      multiple
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      noOptionsText={noOptionsText}
      freeSolo
      openOnFocus
      getOptionSelected={(option, value) => option.Title === value.Title}
      getOptionLabel={(option) => option.Title}
      options={options}
      loading={loading}
      fullWidth
      // onChange={(event, newValue)=> {
      //   if (options.length>0) movieDisplay(newValue);
      // }
      // }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Movies"
          variant='standard'
          onChange={(e)=> {
            if (e.target.value !== '' || e.target.value !== null) {
              handleSearchChange(e.target.value);
            }
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> :
                 null}
                <Search/>
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

SearchBar.propTypes = {
  movieDisplay: PropTypes.func,
};
export default SearchBar;
