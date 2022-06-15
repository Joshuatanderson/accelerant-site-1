import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { defaultKeymap } from "@codemirror/commands";
import { python } from "@codemirror/lang-python";
import React, { useEffect, useRef, useState } from "react";

export const CodeEditor = () => {
  const container = useRef<HTMLDivElement>(null);
  const [startState, setStartState] = useState<EditorState>();
  const [view, setView] = useState<EditorView>();
  useEffect(() => {
    initCodeEditor();

    function initCodeEditor() {
      setStartState(EditorState.create({}));
      view?.destroy();
      setView(
        new EditorView({
          doc: "hello world",
          extensions: [basicSetup, keymap.of(defaultKeymap), python()],
          state: startState,
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
