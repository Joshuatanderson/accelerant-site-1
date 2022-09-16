import React, { useEffect, useRef, useState } from "react";

interface JavascriptEnvironmentProps {
  code: string;
  handleUpdateOutput: (output: string) => Promise<void>;
  setErrorText: (output: string) => void;
  setStackTrace: (output: string) => void;
  isRunning: boolean;
  setIsRunning: (newValue: boolean) => void;
}
const functionsToExtract = [
  "mousePressed",
  "mouseReleased",
  "mouseMoved",
  "mouseDragged",
  "mouseClicked",
  "mouseWheel",
  "keyPressed",
  "keyReleased",
  "createCanvas",
  "resizeCanvas",
  "createP",
  "createcanvasContainer",
  "resizecanvasContainer",
  "bezier",
  "redraw",
  "loop",
  "random",
  "createVector",
  "fill",
  "stroke",
  "noStroke",
  "frameRate",
  "noLoop",
  "noFill",
  "background",
  "line",
  "keyTyped",
  "touchStarted",
  "touchMoved",
  "touchEnded",
  "touchCancelled",
  "deviceMoved",
  "deviceTurned",
  "deviceShaken",
  "keyDown",
  "keyUp",
  "mouseDown",
  // "circle",
  "ellipse",
  "mouseUp",
  "textSize",
  "text",
  "textAlign",
  "mouseOut",
  "mouseOver",
  "windowResized",
];

export const JavascriptEnvironment = ({
  code,
  handleUpdateOutput,
  setErrorText,
  setStackTrace,
  setIsRunning,
  isRunning,
}: JavascriptEnvironmentProps) => {
  const [p5, setP5] = useState<any>();
  // let extractedFunctions;
  // const [extractedFunctions, setExtractedFunctions] = useState<any>();

  useEffect(() => {
    // extractFunctions();
    // console.log(extractedFunctions?.fill);
  }, []);

  const outputLines: string[] = [];

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    /***
     * graphics: graphics instance
     */
    let sketch = async function (graphics: any) {
      // @dev
      // This is done as sugar syntax
      // Instead of users needing to access graphics functions as "graphics.stroke()"
      // functions can be accessed at stroke()
      // the draw, setup, and preload functions still need to be accessed as graphics.draw, graphics.setup, etc.
    };

    // this is done to replicate console logs to the output
    //@ts-ignore
    console.unmodifiedLog = console.log;
    console.log = (input: any) => {
      //@ts-ignore
      console.unmodifiedLog(input);

      if (typeof input === "string") {
        outputLines.push(input);
      }
    };
    eval(code);

    try {
      for (const i in outputLines) {
        handleUpdateOutput(outputLines[i]);
      }
    } catch (err: any) {
      setErrorText(err.message);
      if (err.stack) {
        setStackTrace(err.stack);
      }
    }
    setIsRunning(false);
    // @ts-ignore
    console.log = console.unmodifiedLog;

    // clears old graphics canvases
  }, [isRunning]);

  return <div></div>;
};
