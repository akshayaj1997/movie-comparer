import React, {Component} from 'react';
import SearchBar from '../Components/Reusable/searchBar';
/**
 * Renders the movie search component to be rendered in the modal form
 */
class SearchComponent extends Component {
  /**
     * render Render a React element into the DOM in the supplied
     * container and return a reference to the component
     * @return {func} search component to be rendered on the page
     */
  render() {
    return (<>
      <SearchBar/>
    </>);
  }
}

export default SearchComponent;
