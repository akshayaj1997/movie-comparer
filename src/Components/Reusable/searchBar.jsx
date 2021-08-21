// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import axios from 'axios';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Search} from '@material-ui/icons';

/**
 * Reusable Search Bar component created from MUI
 * @return {React.Node} Search Bar component with Movies
 */
export default function SearchBar() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(async () => {
    let active = true;

    if (!loading) {
      return undefined;
    }
    const response = await axios.get('https://www.omdbapi.com/?apikey=15bcf215&s=blade-runner&r=json');
    const movies = await response['Search'];

    if (active) {
      setOptions(movies);
    }

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="search-component"
      style={{width: 300}}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      freeSolo
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.Title}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Movies"
          variant='standard'
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
