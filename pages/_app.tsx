import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@emotion/react";
import { lightTheme } from "../themeOptions";
import { CssBaseline } from "@mui/material";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CssBaseline>
      <Component {...pageProps} />
    </CssBaseline>
  );
}

export default MyApp;
