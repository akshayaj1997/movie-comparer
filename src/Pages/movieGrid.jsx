import React, {Component} from 'react';
import Button from '../Components/Reusable/Button';
import ModalForm from '../Components/Reusable/ModalForm';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {DragDropContext} from 'react-beautiful-dnd';
import {Data} from '../exampleData';
/**
 * Movie grid component
 */
class MovieGrid extends Component {
  /**
     *
     * @param {*} props
     */
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      data: Data,
    };
    this.toggle = this.toggle.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
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
    alert('Saved');
    this.toggle();
  }
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
        <Button text={'Add Movie'} startIcon={<AddCircleOutlineIcon/>}
          size='md' color='default'
          variant='outlined' onClick={()=>{
            this.onAddClick();
          }}/>
        <ModalForm enableSaveButton isopen={this.state.openModal}
          header={'Search Movie'} toggle={this.toggle}
          savefunc={this.onSaveClick}
          SaveButton={'Add Movie'}>
            Hello
        </ModalForm>
      </DragDropContext>
    </>);
  }
}

export default MovieGrid;
