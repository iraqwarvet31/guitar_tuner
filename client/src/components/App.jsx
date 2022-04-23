import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import lowEstring from "../assets/audio/low_e.m4a";
import aString from "../assets/audio/a.m4a";
import dString from "../assets/audio/d.m4a";
import gString from "../assets/audio/g.m4a";
import bString from "../assets/audio/b.m4a";
import highEstring from "../assets/audio/high_e.m4a";

const App = () => {
  const canvasRef = useRef(null);

  // useEffect(() => {
  //   const canvas = canvasRef.current
  //   const context = canvas.getContext('2d')
    
  //   //Start drawing
  //   draw(context)
  // }, [draw]);

  // const draw = (ctx, canvasHeight, barX, barWdith, barHeight) => {
  //   ctx.fillStyle = '#000000';
  //   ctx.beginPath();
  //   ctx.arc(barX, canvas.height, barHeight, barWdith, 0, 2*Math.PI);
  //   ctx.fill();
  // }
  const pluckString = (e, note) => {
    const audio = new Audio(note);
    audio.play();
    captureAudio(audio);
  };
  const captureAudio = audio => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContex)();
    const audioSrc = audioCtx.createMediaElementSource(audio);
    const analyser = audioCtx.createAnalyser();

    // Set canvas
    const canvas = canvasRef.current  
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#2DCC70';

    audioSrc.connect(analyser);
    analyser.connect(audioCtx.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    let timeRan = 0;
    let startTime = new Date().getTime();
    let bars = 100;
    const interval = setInterval(() => {
      timeRan++;
      analyser.getByteFrequencyData(dataArray);
      console.log('data: ', dataArray);
      if (new Date().getTime() - startTime > 8000) clearInterval(interval);
      for (let i = 0; i < bars; i++) {
        let bar_x = i * 3;
        let bar_width = 2;
        let bar_height = -(dataArray[i] / 2);
        ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
      }
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
      <div style={{marginTop: 50}}>
        <canvas ref={canvasRef} height={500} width={1000}></canvas>
      </div>
    </div>
  );
};
export default App;
