import React, { useRef, useState } from "react";
import skulpt from "skulpt";
import ErrorBoundary from "./ErrorBoundary";

interface CodeRunnerProps {
  code: string;
}

const CodeRunner = ({ code }: CodeRunnerProps) => {
  const [outputText, setOutputText] = useState<string[]>([]);
  const [errorText, setErrorText] = useState("");
  const output = useRef();
  const canvas = useRef();

  const handleUpdateOutput = async (output: string) => {
    console.log(output);
    // console.log(code);
    await setOutputText((prev) => [...prev, output]);
    // console.log(outputText);
  };

  const handleClearOutput = () => {
    setOutputText([]);
  };

  const createConsoleLines = (outputText: string[]) => {
    return outputText.map((line, index) => {
      return (
        <div key={`console:${index}`} className="p-sm">
          {line}
        </div>
      );
    });
  };

  function builtinRead(x: string) {
    if (
      skulpt.builtinFiles === undefined ||
      skulpt.builtinFiles["files"][x] === undefined
    )
      throw "File not found: '" + x + "'";
    return skulpt.builtinFiles["files"][x]; //ts-ignore
  }

  const handleRun = async () => {
    console.log(code);
    skulpt.configure({
      output: handleUpdateOutput,
      read: builtinRead,
      __future__: skulpt.python3,
    }); //ts-ignore

    // TODO: impement turtle
    // TODO: implement handling errors
    try {
      // TODO: ensure that suspendable functions work
      const module = await skulpt.importMainWithBody(
        "<stdin>",
        false,
        code,
        true
      ); //ts-ignore
    } catch (err) {
      console.log(err);
      setErrorText(err.message);
    }
  };

  return (
    <ErrorBoundary>
      <button onClick={handleRun}>run</button>
      <button onClick={handleClearOutput}>clear output</button>
      <div ref={output} id="output">
        {createConsoleLines(outputText)}
        <p className="text-red">{errorText}</p>
      </div>
      <div ref={canvas} id="mycanvas"></div>
    </ErrorBoundary>
  );
};

export default CodeRunner;
