import React from 'react';
import strings from '../Resources/strings';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const History = (params) => {
  const { history } = params;
  
  const Row = (props) => {
    const { row } = props;

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>{row[strings.instruction_info.instruction]}</TableCell>
          <TableCell>{row[strings.results.hexadecimal]}</TableCell>
          <TableCell>{row[strings.results.decimal]}</TableCell>
          <TableCell>{row[strings.results.binary]}</TableCell>
          <TableCell>{row[strings.results.c_type]}</TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  return (
    <Grid container>
      <Grid item xs={12}><Typography variant="h5">Past Instructions</Typography></Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>{strings.instruction_info.instruction}</TableCell>
                <TableCell>{strings.results.hexadecimal}</TableCell>
                <TableCell>{strings.results.decimal}</TableCell>
                <TableCell>{strings.results.binary}</TableCell>
                <TableCell>{strings.results.c_type}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((row, i) => (
                <Row key={i} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default History;