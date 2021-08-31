/* eslint-disable react/prop-types */
import React, {Component} from 'react';
import Button from '../Components/Reusable/Button';
import ModalForm from '../Components/Reusable/ModalForm';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {DragDropContext} from 'react-beautiful-dnd';
import MovieList from '../Components/MovieList';
import SearchComponent from '../Components/Search';
import MovieGrid from '../Components/MovieGrid';
import {connect} from 'react-redux';
import {Grid, IconButton, Snackbar} from '@material-ui/core';
import {CloseOutlined} from '@material-ui/icons';

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
      errorMsg: '',
      showError: false,
      movieData: {},
    };
    this.toggle = this.toggle.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.receiveMovieData = this.receiveMovieData.bind(this);
    this.deleteFromGrid = this.deleteFromGrid.bind(this);
    this.deleteFromList = this.deleteFromList.bind(this);
  }
  /**
   * deletes item from grid/graph component
   * @param {string} itemId the item that needs to be deleted
   */
  deleteFromGrid(itemId) {
    this.props.deleteFromGrid(itemId);
  }

  /**
   * deletes item from list component
   * @param {string} itemId the item that needs to be deleted
   */
  deleteFromList(itemId) {
    this.props.deleteFromList(itemId);
  }
  /**
   * Opens the modal box to add the movie
   */
  onAddClick() {
    this.setState((prevstate)=>
      ({...prevstate, openModal: !prevstate.openModal}));
  }

  /**
   * Function to toggle(open/close) the modal form
   */
  toggle() {
    this.setState((prevState) =>
      ({...prevState, openModal: !prevState.openModal, movieData: {},
        errorMsg: '',
        showError: false}));
  }
  /**
 * Function to be triggered on trying adding the movie to the grid
 */
  onSaveClick() {
    const moviesData = this.state.movieData;
    if (this.props.movies
        .findIndex((el)=> moviesData?.imdbID === el.imdbID) >= 0) {
      this.setState({...this.state,
        errorMsg: 'This movie already exists in the comparitive list.',
        showError: true});
      return;
    }
    if (moviesData?.imdbRating === 'N/A') {
      this.setState({...this.state,
        errorMsg: 'There is no comparable rating on this movie.',
        showError: true}); return;
    };
    this.props.addMovie(moviesData);
    this.toggle();
  }
  /**
  * Operation to be performed on dropping the object
  * @param {Object} result is the result object that is given on dragging
  * and dropping
  */
  onDragEnd(result) {
    this.props.onDragEnd(result);
  };

  /**
   * Callback function which is passed down to the child to
   * receive the data of the movie added
   * @param {Object} data movie object passed while trying to add the movie
   */
  receiveMovieData(data) {
    this.setState((prevState)=>({...prevState, errorMsg: '',
      showError: false, movieData: data}));
  }
  /**
     * render Render a React element into the DOM in the supplied
     * container and return a reference to the component
     * (in this case the movie page)
     * @return {ReactNode} Movie Page Component containing the
     * comparison region and list of movies
     */
  render() {
    return (<>
      <DragDropContext
        onDragEnd = {this.onDragEnd}
      >
        <Grid>
          <ModalForm enableSaveButton isopen={this.state.openModal}
            header={'Search Movie'} toggle={this.toggle}
            savefunc={this.onSaveClick}
            SaveButton={'Add Movie'}>
            <Snackbar open={this.state.showError} autoHideDuration={5000}
              message={this.state.errorMsg}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              onClose={()=>{
                this.setState((prevState)=> ({...prevState, showError: false}));
              }}
              action={
                <IconButton size="small" aria-label="close" color="inherit"
                  onClick={()=>{
                    this.setState((prevState)=>
                      ({...prevState, showError: false}));
                  }}>
                  <CloseOutlined fontSize="small" />
                </IconButton>}
            />
            <SearchComponent sendMovieData= {this.receiveMovieData}/>
          </ModalForm>
          <h1>Movie Comparer</h1>
          {this.props.columnOrder.map((columnId) => {
            const column = this.props.columns[columnId];
            const movies = column.movies.map((movie) =>
              this.props.movies.find((el) => el.imdbID === movie));

            return <div key={column.id}>{columnId==='movies-list'?
          <MovieList movies={movies}
            deleteItemFromGrid={this.deleteFromList}
            columnId={column.id}/>:
         <><MovieGrid movies={movies} deleteItemFromGrid={this.deleteFromGrid}/>
           <Button text={'Add Movie'} startIcon={<AddCircleOutlineIcon/>}
             size='large' color='default'
             variant='outlined' onClick={()=>{
               this.onAddClick();
             }}/></>}<br/></div>;
          })}
        </Grid>
      </DragDropContext>
    </>);
  }
}

const mapStateToProps = (state) =>({
  movies: state.movies,
  movieData: state.movieData,
  columns: state.columns,
  columnOrder: state.columnOrder,
});
const mapDispatchToProps = (dispatch) => ({
  deleteFromList: (itemId) => dispatch({type: 'DELETE_FROM_LIST',
    payload: itemId}),
  deleteFromGrid: (itemId) => dispatch({type: 'DELETE_FROM_GRID',
    payload: itemId}),
  addMovie: (movie) => dispatch({type: 'ADD_MOVIE',
    payload: movie}),
  onDragEnd: (result) => dispatch({type: 'ON_DRAG_END', payload: result}),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
