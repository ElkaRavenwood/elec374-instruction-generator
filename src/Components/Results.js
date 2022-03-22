import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import strings from '../Resources/strings';

const Results = (params) => {
  const { instruction, error } = params;
  return(
    <Grid item xs={12} container spacing={2}>
      <Grid item lg={1} xl={2}/>
      <Grid item container spacing={2} lg={10} xl={8}>
        <Grid item xs={12}><Typography variant="h5">{strings.results.results}:</Typography></Grid>
        <Grid item xs={6}><Typography variant="h6">{strings.results.hexadecimal}:</Typography></Grid>
        <Grid item xs={6}><Typography variant="h6">{instruction.hex}</Typography></Grid>
        <Grid item xs={6}><Typography variant="h6">{strings.results.binary}:</Typography></Grid>
        <Grid item xs={6}><Typography >{instruction.bin}</Typography></Grid>
        <Grid item xs={6}><Typography variant="h6">{strings.results.decimal}:</Typography></Grid>
        <Grid item xs={6}><Typography >{instruction.dec}</Typography></Grid>
        { error ? <>
          <Grid item xs={6}><Typography variant="h6">{strings.results.error}:</Typography></Grid>
          <Grid item xs={6}><Typography variant="h6">{error}</Typography></Grid>
          </> : null
        }
      </Grid>
      <Grid item lg={1} xl={2}/>
  </Grid>
  )
}
export default Results;