import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './App.css';
import Footer from './Components/Footer';
import GetInfo from './Components/GetInfo';
import Instructions from './Components/Instructions';
import Results from './Components/Results';
import History from './Components/History';

function App() {
  const [error, setError] = useState("");
  const [instruction, setInstruction] = useState({
    hex: "",
    bin: "",
    dec: "",
  });
  const [history, setHistory] = useState([]);
  return (
    <Box className="App" mt={2}>
      <Grid container spacing={5}>
        <Grid item xs={1}/>
        {/* <header className="App-header"/> */}
        <Grid item xs={10}>
          <Instructions/>
        </Grid>
        <Grid item xs={1}/> <Grid item xs={1}/>
        <Grid item xs={10}>
          <GetInfo onSetError={setError} onSetInstruction={setInstruction} onSetHistory={setHistory}/>
        </Grid>
        <Grid item xs={1}/> <Grid item xs={1}/>
        <Grid item xs={10}>
          <Results error={error} instruction={instruction} />
        </Grid>
        <Grid item xs={1}/> <Grid item xs={1}/>
        <Grid item xs={10}>
          <History history={history}/>
        </Grid>
        <Grid item xs={1}/> <Grid item xs={1}/>
        <Grid item xs={10}>
          <Footer/>
        </Grid>
        <Grid item xs={1}/>
      </Grid>
    </Box>
  );
}

export default App;
