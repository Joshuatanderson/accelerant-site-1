import SyntaxHighlighter from "react-syntax-highlighter";

interface CodeProps {
  code: string;
  lang?: string;
}

export const Code = ({ code, lang }: CodeProps) => {
  return (
    <SyntaxHighlighter language={lang || "javascript"}>
      {code}
    </SyntaxHighlighter>
  );
};
