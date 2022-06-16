// view at: https://stackblitz.com/edit/vitejs-vite-8s3guc?file=src%2FEditor.tsx&terminal=dev
import React, { useRef, useEffect } from "react";
import { EditorView, ViewUpdate } from "@codemirror/view";
import { EditorState, Extension } from "@codemirror/state";
import { basicSetup } from "codemirror";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";

interface EditorProps {
  value?: string;
  onUpdate?: (update: ViewUpdate) => void;
}

export const CodeEditor = ({ value = "", onUpdate }: EditorProps) => {
  const editor = useRef<HTMLDivElement>(null);
  let state: EditorState;
  let view: EditorView;

  useEffect(() => {
    const extensions: Extension[] = [basicSetup, oneDark];
    if (onUpdate) extensions.push(EditorView.updateListener.of(onUpdate));

    if (!view || !state) {
      state = EditorState.create({
        doc: value,
        extensions: [basicSetup, python(), oneDark],
      });
      view = new EditorView({ state, parent: editor.current! });
    }

    return () => view.destroy();
  }, []);

  return <div ref={editor} />;
};
