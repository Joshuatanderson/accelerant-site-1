import { Html, Head, Main, NextScript } from "next/document";
import React from "react";
// @ts-ignore
import { TypographyStyle } from "react-typography";

const _document = () => {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default _document;
