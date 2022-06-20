import React, { useState } from "react";
import { CodeEditor } from "./CodeEditor";
import CodeRunner from "./CodeRunner";

const Sandbox = () => {
  const [code, setCode] = useState("");
  return (
    <div>
      <div id="sandbox">
        <CodeEditor setCode={setCode} />
        <CodeRunner code={code} />
      </div>
    </div>
  );
};

export default Sandbox;
