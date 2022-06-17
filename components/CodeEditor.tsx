import React, { useRef, useEffect, useState } from "react";

import { basicSetup } from "codemirror";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { oneDark } from "@codemirror/theme-one-dark";
import { python } from "@codemirror/lang-python";
import { EditorState } from "@codemirror/state";

//dev.to/adamcollier/adding-codemirror-6-to-a-react-project-36hl
export const CodeEditor = () => {
  const editor = useRef();
  const [code, setCode] = useState("");

  const onUpdate = EditorView.updateListener.of((v) => {
    setCode(v.state.doc.toString());
  });

  useEffect(() => {
    const startState = EditorState.create({
      doc: "print('Hello World')",
      extensions: [
        basicSetup,
        keymap.of([defaultKeymap, indentWithTab]),
        oneDark,
        python(),
        onUpdate,
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: editor.current,
    });
    return () => {
      view.destroy();
    };
  }, []);

  return <div ref={editor}></div>;
};
