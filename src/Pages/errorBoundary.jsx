import React from 'react';
import PropTypes from 'prop-types';
import ModalForm from '../Components/Reusable/ModalForm';
/**
 * Error boundary component that will catch all the errors and display the error
 */
class ErrorBoundary extends React.Component {
  /**
     * method used to initialize an object's state in a class.
     * @param {any} props passed to the component
     */
  constructor(props) {
    super(props);
    this.state = {hasError: false, errorInfo: ''};
  }
  /**
 * Update state so the next render will show the fallback UI.
 * @param {error} _error error
 * @return {object} value to update the state of the error
 */
  static getDerivedStateFromError(_error) {
    return {hasError: true};
  }

  /**
   * Error will be caught and displayed on the UI
   * @param {any} error The error that was thrown.
   * @param {any} errorInfo An object with a componentStack key containing
   * information about which component threw the error.
   */
  componentDidCatch(error, errorInfo) {
    this.setState((prevState)=>({
      ...prevState,
      errorInfo: `${error},${errorInfo}`,
    }));
  }
  /**
   * render Render a React element into the DOM in the supplied
   * container and return a reference to the component
   * (in this case the error boundary)
   * @return {ReactNode} returns error boundary component
   */
  render() {
    if (this.state.hasError) {
      <>
        <ModalForm ></ModalForm> <img src={require('../Fallback.png')}/></>;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.any.isRequired,
};
export default ErrorBoundary;
