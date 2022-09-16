import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import React from "react";
// @ts-ignore
import { TypographyStyle } from "react-typography";

const _document = () => {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <script src="//toolness.github.io/p5.js-widget/p5-widget.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default _document;
