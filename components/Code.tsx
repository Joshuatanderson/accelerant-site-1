import SyntaxHighlighter from "react-syntax-highlighter";

interface CodeProps {
  document: {
    value: {
      key: string;
      _type: string;
      code: string;
    };
  };
}

export const Code = ({ document }: CodeProps) => {
  return (
    <SyntaxHighlighter language="python">
      {document?.value?.code}
    </SyntaxHighlighter>
  );
};
