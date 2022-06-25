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
    await setOutputText((prev) => [...prev, output]);
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
      console.error(err);
      setErrorText(err.message);
    }
  };

  return (
    <ErrorBoundary>
      <button
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={handleRun}
      >
        run
      </button>
      <button
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={handleClearOutput}
      >
        clear output
      </button>
      <div ref={output} id="output">
        {createConsoleLines(outputText)}
        <p className="text-red">{errorText}</p>
      </div>
      <div ref={canvas} id="mycanvas"></div>
    </ErrorBoundary>
  );
};

export default CodeRunner;
