import React, { useEffect, useRef, useState } from "react";

interface JavascriptEnvironmentProps {
  code: string;
  handleUpdateOutput: (output: string) => Promise<void>;
  setErrorText: (output: string) => void;
  setStackTrace: (output: string) => void;
  isRunning: boolean;
  setIsRunning: (newValue: boolean) => void;
}

export const JavascriptEnvironment = ({
  code,
  handleUpdateOutput,
  setErrorText,
  setStackTrace,
  setIsRunning,
  isRunning,
}: JavascriptEnvironmentProps) => {
  const [p5, setP5] = useState<any>();

  const createNewP5 = async (
    sketch: (p5: any) => Promise<void>,
    canvasContainer: any
  ) => {
    new p5(sketch, canvasContainer);
  };

  const canvasContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const importP5 = async () => {
      const p5 = await (await import("p5")).default;
      // https://github.com/facebook/react/issues/21057
      await setP5(() => p5);
      // @ts-ignore
      // window.p5 = p5;
    };
    importP5();
  }, []);

  const outputLines: string[] = [];

  useEffect(() => {
    if (!isRunning) {
      return;
    }
    /***
     * p5: p5 instance
     */
    let sketch = async function (p5: any) {
      // @dev
      // This is done as sugar syntax
      // Instead of users needing to access p5 functions as "p5.stroke()"
      // functions can be accessed at stroke()
      // the draw, setup, and preload functions still need to be accessed as p5.draw, p5.setup, etc.

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
        "ellipse",
        "mouseUp",
        "textSize",
        "text",
        "textAlign",
        "mouseOut",
        "mouseOver",
        "windowResized",
      ];
      const extractedFunctions = Object.fromEntries(
        new Map(
          functionsToExtract.map((name) => [
            name,
            function () {
              p5[name](...arguments);
            },
          ])
        )
      );

      const {
        mousePressed,
        mouseReleased,
        mouseMoved,
        mouseDragged,
        mouseClicked,
        noStroke,
        mouseWheel,
        textAlign,
        keyPressed,
        bezier,
        keyReleased,
        createCanvas,
        createP,
        resizeCanvas,
        createcanvasContainer,
        resizecanvasContainer,
        redraw,
        loop,
        fill,
        stroke,
        ellipse,
        frameRate,
        noLoop,
        noFill,
        background,
        line,
        textSize,
        keyTyped,
        touchStarted,
        touchMoved,
        touchEnded,
        touchCancelled,
        deviceMoved,
        deviceTurned,
        deviceShaken,
        random,
        keyDown,
        keyUp,
        mouseDown,
        mouseUp,
        mouseOut,
        mouseOver,
        text,
        windowResized,
        createVector,
      } = extractedFunctions;

      const width = () => p5.width;
      const height = () => p5.height;
      const mouseX = () => p5.mouseX;
      const mouseY = () => p5.mouseY;
      const CENTER = () => p5.CENTER;
      const RIGHT = () => p5.RIGHT;
      const LEFT = () => p5.LEFT;
      const Vector = () => new p5.constructor.Vector();

      eval(code);
    };

    // let y = getHeight();

    // // The statements in the setup() function
    // // execute once when the program begins
    // p5.setup = () => {
    //   // createCanvas must be the first statement
    //   createCanvas(720, 400);
    //   stroke(255); // Set line drawing color to white
    //   frameRate(30);
    // };
    // // The statements in draw() are executed until the
    // // program is stopped. Each statement is executed in
    // // sequence and after the last line is read, the first
    // // line is executed again.
    // p5.draw = () => {
    //   background(50); // Set the background to dark grey
    //   y = y - 1;
    //   if (y < 0) {
    //     y = getHeight();
    //   }
    //   line(0, y, getWidth(), y);
    // };

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

    try {
      createNewP5(sketch, canvasContainer.current);

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

    // clears old p5 canvases
    return () => {
      //@ts-ignore
      for (let i = 0; i < canvasContainer.current.children.length; i++) {
        //@ts-ignore
        if (i == 0 && canvasContainer?.current?.children?.length > 1) {
          console.info("removing old canvas");
          canvasContainer?.current?.children[i]?.remove();
        }
      }
    };
  }, [isRunning]);

  return <div ref={canvasContainer} id="canvasContainer"></div>;
};
