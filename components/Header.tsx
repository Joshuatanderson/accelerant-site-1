import React from "react";
import styled from "styled-components";

import logo from "../public/logo.png";
import Image from "next/image";
import { Box, Button } from "@mui/material";

import Menu from "./Menu";
import Link from "next/link";

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
      <Link href="/">
        <Image
          layout="fixed"
          width={104.3}
          height={24.9}
          src={logo}
          alt="Accelerant"
        />
      </Link>
      <Menu />
    </Box>
  );
};

export default Header;
