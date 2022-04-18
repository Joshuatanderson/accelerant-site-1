import React from "react";

import logo from "../public/logo.png";
import Image from "next/image";
import { Box } from "@mui/material";

import Menu from "./Menu";
import Link from "next/link";

const classes = {
  headerCont: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  invisibleLink: {
    backgroundImage: "none",
  },
};

const Header = React.forwardRef((props, ref) => {
  return (
    <Box sx={classes.headerCont} ref={ref}>
      <Link href="/">
        <a style={classes.invisibleLink}>
          <Image
            layout="fixed"
            width={104.3}
            height={24.9}
            src={logo}
            alt="Accelerant"
          />
        </a>
      </Link>
      <Menu />
    </Box>
  );
});

export default Header;
