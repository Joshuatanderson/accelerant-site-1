import React, { useRef, useState } from "react";
import skulpt from "skulpt";

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
      //@ts-ignore
      skulpt.builtinFiles === undefined ||
      //@ts-ignore
      skulpt.builtinFiles["files"][x] === undefined
    )
      throw "File not found: '" + x + "'";
    //@ts-ignore
    return skulpt.builtinFiles["files"][x]; //ts-ignore
  }

  const handleRun = async () => {
    //@ts-ignore
    skulpt.configure({
      output: handleUpdateOutput,
      read: builtinRead,
      //@ts-ignore
      __future__: skulpt.python3,
    }); //ts-ignore

    // TODO: impement turtle
    // TODO: implement handling errors
    try {
      // TODO: ensure that suspendable functions work
      //@ts-ignore
      const module = await skulpt.importMainWithBody(
        "<stdin>",
        false,
        code,
        true
      ); //ts-ignore
    } catch (err) {
      console.error(err);
      //@ts-ignore
      setErrorText(err.message);
    }
  };

  return (
    <>
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
      {/* @ts-ignore */}
      <div ref={output} id="output">
        {createConsoleLines(outputText)}
        <p className="text-red">{errorText}</p>
      </div>
      {/* @ts-ignore */}
      <div ref={canvas} id="mycanvas"></div>
    </>
  );
};

export default CodeRunner;
