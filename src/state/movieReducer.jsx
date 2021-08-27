import {createStore} from 'redux';
export const DELETE_FROM_LIST = 'DELETE_FROM_LIST';
export const DELETE_FROM_GRID = 'DELETE_FROM_GRID';
export const ADD_MOVIE = 'ADD_MOVIE';
export const ON_DRAG_END = 'ON_DRAG_END';

/**
 * Initial state of the redux store.
 */
export const initialState = {
  movies: [],
  movieData: {},
  columns: {
    'movies-list': {
      id: 'movies-list',
      title: 'Movies',
      movies: [],
    },
    'movies-grid': {
      id: 'movies-grid',
      title: 'Movies',
      movies: [],
    },
  },
  columnOrder: ['movies-grid', 'movies-list'],
};

/**
 * a reducer is a pure function that takes an action and the previous
 * state of the application and returns the new state.
 * In this case, it is taking in the state of the drag and drop context
 * with the drag and drop results and returning the new drag and drop state
 * of the application.
 * @param {Object} state is the previous state of the redux store
 * passed to the reducer
 * @param {any} action is the action to be performed on the store.
 * @return {Object} new state of the store to be used in the application
 */
export function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_FROM_GRID:
    {
      const movies = state.movies;
      const colMovies = state.columns['movies-grid'].movies;
      return {
        ...state,
        movies: movies.filter((el)=> el.imdbID !== action.payload),
        columns: {
          ...state.columns,
          'movies-grid': {...state.columns['movies-grid'],
            movies: colMovies.filter((el)=> el !== action.payload)}
          ,
        }};}
    case DELETE_FROM_LIST: {
      const movies = state.movies;
      const colMovies = state.columns['movies-list'].movies;
      return {
        ...state,
        movies: movies.filter((el)=> el.imdbID !== action.payload),
        columns: {
          ...state.columns,
          'movies-list': {...state.columns['movies-list'],
            movies: colMovies.filter((el)=> el !== action.payload)}
          ,
        }};}
    case ADD_MOVIE:
      {
        return {
          ...state,
          movies: [...state.movies, action.payload],
          columns: {
            ...state.columns,
            'movies-list': {...state.columns['movies-list'],
              movies: [...state.columns['movies-list'].movies,
                action.payload?.imdbID]}
            ,
          },
        };};
    case ON_DRAG_END: {
      if (!action.payload.destination) {
        return state;
      }

      if (
        action.payload.destination.droppableId ===
        action.payload.source.droppableId &&
            action.payload.destination.index === action.payload.source.index
      ) {
        return state;
      }

      const start = state.columns[action.payload.source.droppableId];
      const finish = state.columns[action.payload.destination.droppableId];

      if (start === finish) {
        const newMovies = Array.from(start.movies);
        newMovies.splice(action.payload.source.index, 1);
        newMovies.splice(action.payload.destination.index, 0,
            action.payload.draggableId);

        const newColumn = {
          ...start,
          movies: newMovies,
        };

        const newState = {
          ...state,
          columns: {
            ...state.columns,
            [newColumn.id]: newColumn,
          },
        };

        return newState;
      }
      /**
     * Moving movie object from one grid to list or vice-versa
    */
      const startMovies = Array.from(start.movies);
      startMovies.splice(action.payload.source.index, 1);
      const newStart = {
        ...start,
        movies: startMovies,
      };

      const finishMovies = Array.from(finish.movies);
      finishMovies.splice(action.payload.destination.index, 0,
          action.payload.draggableId);
      const newFinish = {
        ...finish,
        movies: finishMovies,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };
      return newState;
    }
    default:
      return initialState;
  }
};

export const store = createStore(moviesReducer);
