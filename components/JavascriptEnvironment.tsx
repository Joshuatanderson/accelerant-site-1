import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const p5 = dynamic(() => import("p5"), { ssr: false });

interface JavascriptEnvironmentProps {
  code: string;
  handleUpdateOutput: (output: string) => Promise<void>;
  setErrorText: (output: string) => void;
  setStackTrace: (output: string) => void;
  isRunning: boolean;
  setIsRunning: () => boolean;
}

export const JavascriptEnvironment = ({
  code,
  handleUpdateOutput,
  setErrorText,
  setStackTrace,
  setIsRunning,
  isRunning,
}: JavascriptEnvironmentProps) => {
  const canvas = useRef(null);
  const outputLines: string[] = [];

  useEffect(() => {
    if (!isRunning) {
      return;
    }
    const sketch = (s: any) => async (code: string) => {
      console.log(s);
      await eval(code);
    };

    // this is done to replicate console logs to the output
    //@ts-ignore
    console.unmodifiedLog = console.log;
    console.log = (input: any) => {
      //@ts-ignore
      console.unmodifiedLog(input);
      outputLines.push(input);
    };

    try {
      // long name to deliberately avoid collision with student code
      new p5(sketch(code), canvas.current);
      console.log("i ran");
      // sketch(sketchInstance, code);
      for (const i in outputLines) {
        handleUpdateOutput(outputLines[i]);
      }
      //@ts-ignore
      console.log = console.unmodifiedLog;
    } catch (err: any) {
      setErrorText(err.message);
      if (err.stack) {
        setStackTrace(err.stack);
      }
    }
    setIsRunning(true);
  }, [isRunning]);

  return <div ref={canvas}></div>;
};
