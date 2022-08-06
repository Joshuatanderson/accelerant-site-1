import { languageOptions } from "languageOptions";
import React, { useRef, useState } from "react";
import { runJavascript } from "../langEnvironments/javascript";
import { runPython } from "../langEnvironments/python";

interface CodeRunnerProps {
  code: string;
  lang: languageOptions;
}

const languageRunnerMap = {
  python: runPython,
  javascript: runJavascript,
};

const CodeRunner = ({ code, lang }: CodeRunnerProps) => {
  const [outputText, setOutputText] = useState<string[]>([]);
  const [errorText, setErrorText] = useState("");
  const [stackTrace, setStackTrace] = useState("");
  const [showStackTrace, setShowStackTrace] = useState(false);
  const output = useRef();
  const canvas = useRef();

  const handleUpdateOutput = async (output: string) => {
    await setOutputText((prev) => [...prev, output]);
  };

  const handleClearOutput = () => {
    setOutputText([]);
  };
  const handleToggleStackTrace = () => {
    setShowStackTrace(!showStackTrace);
  };

  const createConsoleLines = (outputText: string[]) => {
    return outputText.map((line, index) => {
      return (
        <div key={`console:${index}`} className="p-sm">
          <p className="text-xl text-gray-500">{line}</p>
        </div>
      );
    });
  };

  return (
    <>
      <div className="mx-auto py-4 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24 flex justify-between">
        <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none ">
          <button
            onClick={() =>
              languageRunnerMap[lang](
                code,
                handleUpdateOutput,
                setErrorText,
                setStackTrace
              )
            }
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-aDark hover:bg-aPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Run
          </button>
        </div>
        <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
          <button
            onClick={handleToggleStackTrace}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-aDark hover:bg-aPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-5"
          >
            {showStackTrace ? "Hide" : "Show"} Stack Trace
          </button>
          <button
            onClick={handleClearOutput}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-aDark hover:bg-aPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Clear Output
          </button>
        </div>
      </div>
      <div className="bg-white">
        <div className="mx-auto py-6 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <div
              /* @ts-ignore */
              ref={output}
              id="output"
              className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none"
            >
              <p className="text-xl text-red-500">{errorText}</p>
              {showStackTrace && (
                <div id="stacktrace">
                  <p className="text-xl text-grey-700">{stackTrace}</p>
                </div>
              )}

              {createConsoleLines(outputText)}
            </div>

            <div
              id="canvas"
              // @ts-ignore
              ref={canvas}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeRunner;
