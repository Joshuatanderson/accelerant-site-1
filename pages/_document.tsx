import { Html, Head, Main, NextScript } from "next/document";
import React from "react";
import { TypographyStyle } from "react-typography";
import typography from "../utils/typography";

const _document = () => {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <TypographyStyle typography={typography} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default _document;
