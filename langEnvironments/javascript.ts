import p5 from "p5";

export const runJavascript = async (
  code: string,
  // TODO: implement console output
  handleUpdateOutput: (output: string) => Promise<void>,
  setErrorText: (output: string) => void,
  // TODO: set stack trace
  setStackTrace: (output: string) => void
) => {
  try {
    // this is done to replicate console logs to the output
    const outputLines: string[] = [];
    //@ts-ignore
    console.unmodifiedLog = console.log;
    console.log = (input: any) => {
      //@ts-ignore
      console.unmodifiedLog(input);
      outputLines.push(input);
    };
    await eval(code);
    for (const i in outputLines) {
      handleUpdateOutput(outputLines[i]);
    }
    //@ts-ignore
    console.log = console.unmodifiedLog;
  } catch (err: any) {
    setErrorText(err.message);
  }
};
