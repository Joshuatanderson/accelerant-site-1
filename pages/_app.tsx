// import "../styles/globals.scss";
import type { AppProps } from "next/app";
import "../styles/tailwind.scss";
import { Box, CssBaseline } from "@mui/material";
import "typeface-quattrocento-sans";
import "typeface-work-sans";
// import { SessionProvider } from "next-auth/react";

import Header from "../components/Header";
import { AuthUserProvider } from "../contexts/AuthUser";

const classes = {
  container: {
    padding: "0 2rem",
  },
};

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <CssBaseline>
      <AuthUserProvider>
        <Box sx={classes.container}>
          <Header />
          <Component {...pageProps} />
        </Box>
      </AuthUserProvider>
    </CssBaseline>
  );
}

export default MyApp;
