import React from "react";
import styled from "styled-components";

import logo from "../public/logo.png";
import Image from "next/image";
import { Box, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import Menu from "./Menu";

const classes = {
  headerCont: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
};

const Header = () => {
  return (
    <Box sx={classes.headerCont}>
      <Image
        layout="fixed"
        width={104.3}
        height={24.9}
        src={logo}
        alt="Accelerant"
      />
      <Menu />
    </Box>
  );
};

export default Header;
