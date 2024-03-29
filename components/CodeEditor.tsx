import React, { useRef, useEffect, useState } from "react";

import { basicSetup } from "codemirror";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { oneDark } from "@codemirror/theme-one-dark";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import { EditorState } from "@codemirror/state";
import { languageOptions } from "languageOptions";

interface CodeEditorProps {
  setCode: (code: string) => void;
  lang: languageOptions;
  code: string;
}

const langMap = {
  python: python,
  javascript: javascript,
};

//dev.to/adamcollier/adding-codemirror-6-to-a-react-project-36hl
export const CodeEditor = ({ setCode, lang, code }: CodeEditorProps) => {
  const editor = useRef();

  const onUpdate = EditorView.updateListener.of((v) => {
    setCode(v.state.doc.toString());
  });

  useEffect(() => {
    const startState = EditorState.create({
      doc: code,
      extensions: [
        basicSetup,
        //@ts-ignore
        keymap.of([defaultKeymap, indentWithTab]),
        oneDark,
        langMap[lang](),
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

  //@ts-ignore
  return <div ref={editor} className="px-4"></div>;
};
