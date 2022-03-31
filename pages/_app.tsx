import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@emotion/react";
import { lightTheme } from "../themeOptions";
import { Box, CssBaseline } from "@mui/material";
import Header from "../components/Header";

const classes = {
  container: {
    padding: "0 2rem",
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CssBaseline>
      <Box sx={classes.container}>
        <Header />
        <Component {...pageProps} />
      </Box>
    </CssBaseline>
  );
}

export default MyApp;
