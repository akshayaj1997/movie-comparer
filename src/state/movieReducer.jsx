import {createStore} from 'redux';
export const DELETE_FROM_LIST = 'DELETE_FROM_LIST';
export const DELETE_FROM_GRID = 'DELETE_FROM_GRID';
export const ADD_MOVIE = 'ADD_MOVIE';
export const ON_DRAG_END = 'ON_DRAG_END';

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
export const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_FROM_GRID:
    {
      const movies = state.movies;
      const colMovies = state.columns['movies-grid'].movies;
      return {
        ...state,
        movies: movies.filter((el)=> el.imdbID !== itemId),
        columns: {
          ...state.columns,
          'movies-grid': {...state.columns['movies-grid'],
            movies: colMovies.filter((el)=> el !== itemId)}
          ,
        }};}
    case DELETE_FROM_LIST: {
      const movies = state.movies;
      const colMovies = state.columns['movies-list'].movies;
      return {
        ...state,
        movies: movies.filter((el)=> el.imdbID !== itemId),
        columns: {
          ...state.columns,
          'movies-list': {...state.columns['movies-list'],
            movies: colMovies.filter((el)=> el !== itemId)}
          ,
        }};}
    case ADD_MOVIE:
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
      };
    case ON_DRAG_END: {
      if (!payload.destination) {
        return state;
      }

      if (
        payload.destination.droppableId === payload.source.droppableId &&
            payload.destination.index === payload.source.index
      ) {
        return state;
      }

      const start = state.columns[payload.source.droppableId];
      const finish = state.columns[payload.destination.droppableId];

      if (start === finish) {
        const newMovies = Array.from(start.movies);
        newMovies.splice(payload.source.index, 1);
        newMovies.splice(payload.destination.index, 0, payload.draggableId);

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
      startMovies.splice(payload.source.index, 1);
      const newStart = {
        ...start,
        movies: startMovies,
      };

      const finishMovies = Array.from(finish.movies);
      finishMovies.splice(payload.destination.index, 0, payload.draggableId);
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

export const store = createStore(moviesReducer, intialState);
