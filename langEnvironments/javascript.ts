export const runJavascript = async (
  code: string,
  handleUpdateOutput: (output: string) => Promise<void>,
  setErrorText: (output: string) => void,
  setStackTrace: (output: string) => void
) => {};
