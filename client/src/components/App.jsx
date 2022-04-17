import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import lowEstring from "../assets/audio/low_e.m4a";
import aString from "../assets/audio/a.m4a";
import dString from "../assets/audio/d.m4a";
import gString from "../assets/audio/g.m4a";
import bString from "../assets/audio/b.m4a";
import highEstring from "../assets/audio/high_e.m4a";

const App = () => {
  const pluckString = (e, note) => {
    const audio = new Audio(note);
    audio.play();
    captureAudio(audio);
  };
  const captureAudio = (audio) => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContex)();
    const audioSrc = audioCtx.createMediaElementSource(audio);
    const analyser = audioCtx.createAnalyser();

    audioSrc.connect(analyser);
    analyser.connect(audioCtx.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    let timeRan = 0;
    let startTime = new Date().getTime();
    const interval = setInterval(() => {
      timeRan++;
      analyser.getByteFrequencyData(dataArray);
      console.log('data: ', dataArray);
      if (new Date().getTime() - startTime > 8000) clearInterval(interval);
    });
  };
  
  return (
    <div>
      <Fab
        size="small"
        color="secondary"
        aria-label="add"
        onClick={(e) => pluckString(e, lowEstring)}
      >
        <strong>E</strong>
      </Fab>
      <Fab
        size="small"
        color="secondary"
        aria-abel="add"
        onClick={(e) => pluckString(e, aString)}
      >
        <strong>A</strong>
      </Fab>
      <Fab
        size="small"
        color="secondary"
        aria-abel="add"
        onClick={(e) => pluckString(e, dString)}
      >
        <strong>D</strong>
      </Fab>
      <Fab
        size="small"
        color="secondary"
        aria-abel="add"
        onClick={(e) => pluckString(e, gString)}
      >
        <strong>G</strong>
      </Fab>
      <Fab
        size="small"
        color="secondary"
        aria-abel="add"
        onClick={(e) => pluckString(e, bString)}
      >
        <strong>B</strong>
      </Fab>
      <Fab
        size="small"
        color="secondary"
        aria-abel="add"
        onClick={(e) => pluckString(e, highEstring)}
      >
        <strong>E</strong>
      </Fab>
    </div>
  );
};
export default App;
