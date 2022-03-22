import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './App.css';
import Footer from './Components/Footer';
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
          <Footer/>
        </Grid>
        <Grid item xs={1}/>
      </Grid>
    </Box>
  );
}

export default App;
