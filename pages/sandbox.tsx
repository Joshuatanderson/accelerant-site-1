import React from "react";
import Sandbox from "../components/Sandbox";

const sandbox = () => {
  return (
    <>
      <p>
        This page is undergoing active development. We're making a python
        environment that can run real code, right in your browser.
      </p>
      <p>It's more fun to build in public. :-) </p>

      <Sandbox />
    </>
  );
};

export default sandbox;
