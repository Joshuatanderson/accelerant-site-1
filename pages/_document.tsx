import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

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
