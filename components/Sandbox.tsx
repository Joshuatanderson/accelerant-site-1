import { languageOptions } from "languageOptions";
import Script from "next/script";
import React, { useState } from "react";
import stripIndent from "strip-indent";
import { CodeEditor } from "./CodeEditor";
import CodeRunner from "./CodeRunner";
import { JavascriptEnvironment } from "./JavascriptEnvironment";

interface SandboxProps {
  initialCode?: string;
  language?: languageOptions;
  file?: any;
  isP5?: boolean;
}

const Sandbox = ({ initialCode, language, file, isP5 }: SandboxProps) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useState(() => {
    console.log(`isInitialized: ${isInitialized}`);
    setIsInitialized(true);
  }, []);
  return (
    // <iframe sandbox="allow-scripts" className="border-none">
    //   {/* Script should only load once, to prevent duplicate runs */}
    //   {!isInitialized && (
    //     <>
    //       <Script>window && alert("p5 test")</Script>
    //     </>
    //   )}
    // </iframe>
    <div>
      {isInitialized && (
        <Script
          id="p5"
          type="text/p5"
          data-p5-version="1.4.2"
          data-autoplay
          data-height="600"
          strategy="afterInteractive"
          data-preview-width="600"
          // strategy="beforeInteractive"
          // @ts-ignore
          // src={file}
          // src={new File([new Blob([code])], "code.js", { type: "text/javascript" })}
        />
      )}
      ;
    </div>
  );

  // console.log(isP5);
  // const [lang, setLang] = useState<languageOptions>(language || "javascript");
  // const [code, setCode] = useState(
  //   initialCode
  //     ? initialCode
  //     : lang === "javascript"
  //     ? stripIndent(`
  //       graphics.setup = function(){

  //       }

  //       graphics.draw = function(){

  //       }`)
  //     : lang === "python"
  //     ? "print('hello world')"
  //     : ""
  // );
  // return (
  //   <div>
  //     {/* pick language */}
  //     <div className="mx-4 my-2">
  //       <label
  //         htmlFor="language"
  //         className="block text-sm font-medium text-gray-700"
  //       >
  //         Language
  //       </label>
  //       <select
  //         id="language"
  //         name="language"
  //         className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
  //         defaultValue="javascript"
  //         onChange={(e) => setLang(e.target.value as languageOptions)}
  //       >
  //         {/* <option value="python">Python</option> */}
  //         <option value="javascript">JavaScript</option>
  //       </select>
  //     </div>

  //     <div id="sandbox" className="mx-4">
  //       {!isP5 && (
  //         <>
  //           <CodeEditor setCode={setCode} lang={lang} code={code} />
  //           <CodeRunner code={code} lang={lang} />
  //         </>
  //       )}
  //       {/* {isP5 && ( */}
  //       {/* <> */}
  //       {/* <p>I am p5 2</p> */}
  // <script
  //   type="text/p5"
  //   data-p5-version="1.4.2"
  //   data-autoplay
  //   data-height="600"
  //   data-preview-width="600"
  //   // @ts-ignore
  //   // src={file}
  //   // src={new File([new Blob([code])], "code.js", { type: "text/javascript" })}
  // />;
  //       {/* </> */}
  //       {/* )} */}
  //     </div>
  //   </div>
  // );
};

export default Sandbox;
