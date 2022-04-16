import React, { useState } from "react";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import lowEstring from "../assets/audio/low_e.m4a";

const App = () => {
  const [strings, setStrings] = useState({
    lowE: false,
    a: false,
    d: false,
    g: false,
    b: false,
    highE: false,
  });

  const pluckString = (e, note) => {
    console.log('Playing.........')
    const audio = new Audio(lowEstring);
    audio.play();
  }

  return (
    <div>
      <Fab 
        size="small" 
        color="secondary" 
        aria-label="add"
        onClick={(e) => pluckString(e, 'lowE')}
      >
        <strong>E</strong>
      </Fab>
      <Fab 
        size="small" 
        color="secondary" 
        aria-abel="add"
        onClick={(e) => pluckString(e, 'A')}
      >
        <strong>A</strong>
      </Fab>
      <Fab 
        size="small" 
        color="secondary" 
        aria-abel="add"
        onClick={(e) => pluckString(e, 'D')}
      >
        <strong>D</strong>
      </Fab>
      <Fab 
        size="small" 
        color="secondary" 
        aria-abel="add"
        onClick={(e) => pluckString(e, 'G')}
      >
        <strong>G</strong>
      </Fab>
      <Fab 
        size="small" 
        color="secondary" 
        aria-abel="add"
        onClick={(e) => pluckString(e, 'B')}
      >
        <strong>B</strong>
      </Fab>
      <Fab 
        size="small" 
        color="secondary" 
        aria-abel="add"
        onClick={(e) => pluckString(e, 'highE')}
      >
        <strong>E</strong>
      </Fab>
    </div>
  );
};
export default App;
