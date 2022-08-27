import { languageOptions } from "languageOptions";
import React, { useState } from "react";
import stripIndent from "strip-indent";
import { CodeEditor } from "./CodeEditor";
import CodeRunner from "./CodeRunner";

interface SandboxProps {
  initialCode?: string;
}

const Sandbox = ({ initialCode }: SandboxProps) => {
  console.log(initialCode);
  const [lang, setLang] = useState<languageOptions>("javascript");
  const [code, setCode] = useState(
    initialCode
      ? initialCode
      : lang === "javascript"
      ? stripIndent(`
        p5.setup = function(){
          
        }

        p5.draw = function(){

        }`)
      : lang === "python"
      ? "print('hello world')"
      : ""
  );
  return (
    <div>
      {/* pick language */}
      <div className="mx-4 my-2">
        <label
          htmlFor="language"
          className="block text-sm font-medium text-gray-700"
        >
          Language
        </label>
        <select
          id="language"
          name="language"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          defaultValue="javascript"
          onChange={(e) => setLang(e.target.value as languageOptions)}
        >
          {/* <option value="python">Python</option> */}
          <option value="javascript">JavaScript</option>
        </select>
      </div>

      <div id="sandbox">
        <CodeEditor setCode={setCode} lang={lang} code={code} />
        <CodeRunner code={code} lang={lang} />
      </div>
    </div>
  );
};

export default Sandbox;
