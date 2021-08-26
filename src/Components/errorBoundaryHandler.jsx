import {Grid, Paper} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import React from 'react';
/**
 * Returns errors
 * @param {props} props {error} error passed to the handler
 * @return {ReactNode} Error Handler
 */
export function errorBoundaryHandler({error}) {
  const errorMsg = `The page did not load correctly: ${error.message}.`;
  return <Grid xs={9} style={{padding: '12.5vw'}}>
    <Alert severity={'error'}><h4> Something Went Wrong </h4></Alert><br/>
    <Paper elevation={10}>
      {errorMsg}<br/>
      Call Stack: <br/>
      {error.stack}
    </Paper>
  </Grid>;
}

export default errorBoundaryHandler;
