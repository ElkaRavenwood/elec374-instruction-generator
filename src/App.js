import { Box, Grid } from '@mui/material';
import './App.css';
import GetInfo from './Components/GetInfo';
import Instructions from './Components/Instructions';

function App() {
  return (
    <Box className="App" mt={2}>
      <Grid container spacing={5}>
        <Grid item xs={1}/>
        {/* <header className="App-header"/> */}
        <Grid item xs={10}>
          <Instructions/>
          <GetInfo/>
        </Grid>
        <Grid item xs={1}/>

      </Grid>
    </Box>
  );
}

export default App;
