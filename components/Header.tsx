import React from "react";
import styled from "styled-components";

import { lightTheme } from "../themeOptions";
import logo from "../public/logo.png";
import Image from "next/image";

const HeaderCont = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "120px",
  fontFamily: "Poppins",
  fontSize: 20,
});

const ImgCont = styled.div({});

const Header = () => {
  return (
    <HeaderCont>
      <Image
        layout="fixed"
        width={104.3}
        height={24.9}
        src={logo}
        alt="Accelerant"
      />
      <p>Accelerant</p>
    </HeaderCont>
  );
};

export default Header;
