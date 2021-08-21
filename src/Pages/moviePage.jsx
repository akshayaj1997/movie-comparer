import React, {Component} from 'react';
import Button from '../Components/Reusable/Button';
import ModalForm from '../Components/Reusable/ModalForm';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {DragDropContext} from 'react-beautiful-dnd';
import {Data} from '../exampleData';
import MovieList from './movieList';
import SearchComponent from './search';
import MovieGrid from './movieGrid';
/**
 * Movie Page component
 */
class MoviePage extends Component {
  /**
     * method used to initialize an object's state in a class.
     * @param {any} props passed to the component
     */
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      movies: Data,
      columns: {
        'movies-list': {
          id: 'movies-list',
          title: 'Movies',
          movies: ['tt0083659', 'tt0083658', 'tt0083660', 'tt0083661'],
        },
        'movies-grid': {
          id: 'movies-grid',
          title: 'Movies',
          movies: [],
        },
      },
      columnOrder: ['movies-grid', 'movies-list'],
    };
    this.toggle = this.toggle.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  /**
   * Opens the modal box
   */
  onAddClick() {
    this.setState((prevstate)=>
      ({...prevstate, openModal: !prevstate.openModal}));
  }

  /**
   * Function to toggle the modal form
   */
  toggle() {
    this.setState((prevState) =>
      ({...prevState, openModal: !prevState.openModal}));
  }
  /**
 * Function to be triggered on saving
 */
  onSaveClick() {
    this.toggle();
  }
  /**
  * What operation must be performed on dropping the object
  * @param {object} result is the result object that is given on dragging
  * and dropping
  */
  onDragEnd(result) {
    const {destination, source, draggableId} = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newMovies = Array.from(start.movies);
      newMovies.splice(source.index, 1);
      newMovies.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        movies: newMovies,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      this.setState(newState);
      return;
    }

    // Moving from one list to another
    const startMovies = Array.from(start.movies);
    startMovies.splice(source.index, 1);
    const newStart = {
      ...start,
      movies: startMovies,
    };

    const finishMovies = Array.from(finish.movies);
    finishMovies.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      movies: finishMovies,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.setState(newState);
  };

  /**
     * render Render a React element into the DOM in the supplied
     * container and return a reference to the component
     * @return {element} Movie Grid Component
     */
  render() {
    return (<>
      <DragDropContext
        onDragEnd = {this.onDragEnd}
      >
        <ModalForm enableSaveButton isopen={this.state.openModal}
          header={'Search Movie'} toggle={this.toggle}
          savefunc={this.onSaveClick}
          SaveButton={'Add Movie'}>
          <SearchComponent/>
        </ModalForm>
        <h1>Movie Comparer</h1>
        {this.state.columnOrder.map((columnId) => {
          const column = this.state.columns[columnId];
          const movies = column.movies.map((movie) =>
            this.state.movies.find((el) => el.imdbID === movie));

          return <div key={column.id}>{columnId==='movies-list'?
          <MovieList movies={movies}
            columnId={column.id}/>:
         <><MovieGrid movies={movies}/>
           <Button text={'Add Movie'} startIcon={<AddCircleOutlineIcon/>}
             size='large' color='default'
             variant='outlined' onClick={()=>{
               this.onAddClick();
             }}/></>}<br/></div>;
        })}
      </DragDropContext>
    </>);
  }
}

export default MoviePage;
