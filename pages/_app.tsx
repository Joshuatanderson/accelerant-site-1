// import "../styles/globals.scss";
import type { AppProps } from "next/app";
import "../styles/tailwind.scss";
import { Box, CssBaseline } from "@mui/material";
import "typeface-quattrocento-sans";
import "typeface-work-sans";

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
