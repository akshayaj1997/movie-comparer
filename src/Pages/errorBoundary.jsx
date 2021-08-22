/* eslint-disable require-jsdoc */
import React from 'react';
import PropTypes from 'prop-types';
/**
 * Error boundary component that will catch all the errors and display the error
 */
class ErrorBoundary extends React.Component {
  /**
     * constructor to the component
     * @param {any} props
     */
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }
  /**
 * error
 * @param {any} _error error
 * @return {void}
 */
  static getDerivedStateFromError(_error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.any.isRequired,
};
export default ErrorBoundary;
