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

  const createNewgraphics = async (
    sketch: (graphics: any) => Promise<void>,
    canvasContainer: any
  ) => {
    new p5(sketch, canvasContainer);
  };

  const canvasContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const importgraphics = async () => {
      const graphics = await (await import("p5")).default;
      // https://github.com/facebook/react/issues/21057
      await setP5(() => graphics);
      // @ts-ignore
      // window.graphics = graphics;
    };
    // const extractFunctions = async () => {
    //   await setExtractedFunctions(

    //   );
    // };
    importgraphics();
    // extractFunctions();
    // console.log(extractedFunctions?.fill);
  }, []);

  const outputLines: string[] = [];

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    // const extractedFunctions = Object.fromEntries(
    //   new Map(
    //     functionsToExtract.map((name) => [
    //       name,
    //       function () {
    //         // const proto = Object.getPrototypeOf(graphics);
    //         // some functions aren't working. This seems to be something with how JS
    //         // deals with prototype inheritance. graphics.circle is valid. graphics["circle"] isn't?
    //         graphics[name](...arguments);
    //       },
    //     ])
    //   )
    // );

    /***
     * graphics: graphics instance
     */
    let sketch = async function (graphics: any) {
      // @dev
      // This is done as sugar syntax
      // Instead of users needing to access graphics functions as "graphics.stroke()"
      // functions can be accessed at stroke()
      // the draw, setup, and preload functions still need to be accessed as graphics.draw, graphics.setup, etc.

      const extractedFunctions = Object.fromEntries(
        new Map(
          functionsToExtract.map((name) => [
            name,
            function () {
              // some functions aren't working. This seems to be something with how JS
              // deals with prototype inheritance. graphics.circle is valid. graphics["circle"] isn't?
              graphics[name](...arguments);
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

      const width = () => graphics.width;
      const height = () => graphics.height;
      const mouseX = () => graphics.mouseX;
      const mouseY = () => graphics.mouseY;
      const CENTER = () => graphics.CENTER;
      const RIGHT = () => graphics.RIGHT;
      const LEFT = () => graphics.LEFT;
      const Vector = () => new graphics.constructor.Vector();
      const circle = function () {
        graphics.circle(...arguments);
      };
      const rect = function () {
        graphics.rect(...arguments);
      };

      eval(code);
    };

    // let y = 400;

    // // The statements in the setup() function
    // // execute once when the program begins
    // graphics.setup = () => {
    //   // createCanvas must be the first statement
    //   createCanvas(720, 400);
    //   stroke(255); // Set line drawing color to white
    //   frameRate(30);
    // };
    // // The statements in draw() are executed until the
    // // program is stopped. Each statement is executed in
    // // sequence and after the last line is read, the first
    // // line is executed again.
    // graphics.draw = () => {
    //   background(50); // Set the background to dark grey
    //   y = y - 1;
    //   if (y < 0) {
    //     y = height();
    //   }
    //   line(0, y, width(), y);
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
      createNewgraphics(sketch, canvasContainer.current);

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
