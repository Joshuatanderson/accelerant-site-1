import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { defaultKeymap } from "@codemirror/commands";
import { python } from "@codemirror/lang-python";
import React, { useEffect, useRef, useState } from "react";
import { tomorrow } from "thememirror";

interface CodeEditorProps {
  setCode: (code: string) => void;
}

export const CodeEditor = ({ setCode }: CodeEditorProps) => {
  const container = useRef<HTMLDivElement>(null);
  const [editorState, setEditorState] = useState<EditorState>();
  const [view, setView] = useState<EditorView>();
  useEffect(() => {
    initCodeEditor();

    function initCodeEditor() {
      setEditorState(EditorState.create({}));
      setView(
        new EditorView({
          extensions: [
            basicSetup,
            keymap.of(defaultKeymap),
            python(),
            tomorrow,
          ],
          state: editorState,
          parent: container.current,
        })
      );
    }
  }, []);
  return (
    <div>
      <div id="container" ref={container}></div>
    </div>
  );
};
