import React, {createContext, useReducer} from 'react';
import PropTypes from 'prop-types';
import {ADD_MOVIE, DELETE_FROM_GRID, DELETE_FROM_LIST,
  initialState, moviesReducer, ON_DRAG_END} from '../MovieDetailsReducer';

const Context = createContext();

const ContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(moviesReducer, initialState);
  const deleteFromGrid = (itemId) => {
    dispatch({type: DELETE_FROM_GRID, payload: itemId});
  };
  const deleteFromList = (itemId) => {
    dispatch({type: DELETE_FROM_LIST, payload: itemId});
  };
  const addMovie = (movie) => {
    dispatch({type: ADD_MOVIE, payload: movie});
  };
  const onDragEnd = (result) => {
    dispatch({type: ON_DRAG_END, payload: result});
  };
  return (
    <Context.Provider
      value={{
        state,
        deleteFromGrid,
        deleteFromList,
        addMovie,
        onDragEnd,
      }}
    >
      {children}
    </Context.Provider>
  );
};
ContextProvider.propTypes = {
  children: PropTypes.any,
};
export {ContextProvider, Context};
