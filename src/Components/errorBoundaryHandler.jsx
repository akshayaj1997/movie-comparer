import React from 'react';
/**
 * Returns errors
 * @param {props} props {error} error passed to the handler
 * @return {ReactNode} Error Handler
 */
export function errorBoundaryHandler({error}) {
  const errorMsg = `The page did not load correctly: ${error.message}.`;
  return <>
    <h3> Something Went Wrong </h3><br/>
    {errorMsg}<br/>
    {error.stack}
  </>;
}

export default errorBoundaryHandler;
