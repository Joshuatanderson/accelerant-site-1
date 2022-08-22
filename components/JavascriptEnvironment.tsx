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
    sketch: (p: any) => Promise<void>,
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
    let sketch = async function (p: any) {
      // const setup = () => p.setup();
      const createCanvas = function () {
        console.log("calling create canvas");
        console.log(arguments);
        p.createCanvas(...arguments);
      };
      const stroke = function () {
        p.stroke(...arguments);
      };
      const frameRate = function () {
        p.frameRate(...arguments);
      };
      // const draw = function () {
      //   p.draw(...arguments);
      // };
      const background = function () {
        p.background(...arguments);
      };
      const line = function () {
        p.line(...arguments);
      };
      const loop = function () {
        p.loop(...arguments);
      };
      const noLoop = function () {
        p.noLoop(...arguments);
      };
      const getWidth = () => p.width;
      const getHeight = () => p.height;

      eval(code);
    };

    // const {
    //   height,
    //   draw,
    //   setup,
    //   preload,
    //   mousePressed,
    //   mouseReleased,
    //   mouseMoved,
    //   mouseDragged,
    //   mouseClicked,
    //   mouseWheel,
    //   keyPressed,
    //   keyReleased,
    //   createCanvas,
    //   resizeCanvas,
    //   createcanvasContainer,
    //   resizecanvasContainer,
    //   redraw,
    //   loop,
    //   fill,
    //   stroke,
    //   frameRate,
    //   noLoop,
    //   noFill: noFill,
    //   background,
    //   line,
    //   keyTyped,
    //   touchStarted,
    //   touchMoved,
    //   touchEnded,
    //   touchCancelled,
    //   deviceMoved,
    //   deviceTurned,
    //   deviceShaken,
    //   keyDown,
    //   keyUp,
    //   mouseDown,
    //   mouseUp,
    //   mouseOut,
    //   mouseOver,
    //   windowResized,
    // } = p5;
    // let y = 0;

    // p.setup = () => {
    //   p.createCanvas(720, 400); // Size must be the first statement
    //   p.stroke(255); // Set line drawing color to white
    //   p.frameRate(30);
    //   p.noLoop();
    // };
    // // The statements in draw() are executed until the
    // // program is stopped. Each statement is executed in
    // // sequence and after the last line is read, the first
    // // line is executed again.
    // p.draw = () => {
    //   p.background(0); // Set the background to black
    //   y = y - 1;
    //   if (y < 0) {
    //     y = p.height;
    //   }
    //   p.line(0, y, p.width, y);
    // };

    // p.mousePressed = () => {
    //   p.loop();
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
