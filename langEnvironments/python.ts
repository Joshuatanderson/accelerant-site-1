import skulpt from "skulpt";

interface SkulptError {
  $d: any;
  args: any;
  traceback: any;
}

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

export const runPython = async (
  code: string,
  handleUpdateOutput: (output: string) => Promise<void>,
  setErrorText: (output: string) => void,
  setStackTrace: (output: string) => void
) => {
  //@ts-ignore
  skulpt.configure({
    output: handleUpdateOutput,
    read: builtinRead,
    //@ts-ignore
    __future__: skulpt.python3,
  }); //@ts-ignore
  (skulpt.TurtleGraphics || (skulpt.TurtleGraphics = {})).target = "canvas";
  //@ts-ignore
  const promise = skulpt.misceval.asyncToPromise(function () {
    console.log(code);
    //@ts-ignore
    return skulpt.importMainWithBody("<stdin>", false, code, true);
  });

  promise.then(
    function (mod: any) {
      setErrorText("");
      setStackTrace("");
      console.log("success");
    },
    function (err: SkulptError) {
      setErrorText(err.toString());
      if (err.traceback) {
        console.log("has traceback");
        let traceback = "";
        for (let i = 0; i < err.traceback.length; i++) {
          traceback +=
            "\n  at " +
            err.traceback[i].filename +
            " line " +
            err.traceback[i].lineno;
          if ("colno" in err.traceback[i]) {
            traceback += " column " + err.traceback[i].colno;
          }
        }
        setStackTrace(traceback);
      }
      console.error(err);
    }
  );
};
