import React from "react";
import Sandbox from "../components/Sandbox";

const sandbox = () => {
  return (
    <>
      <div className="mx-auto px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        {/* <div className="space-y-12"> */}
        <h1 className="text-4xl font-bold leading-tight">Sandbox</h1>
        {/* </div> */}
      </div>
      <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <p className="text-xl text-gray-500">
              This page is undergoing active development. We&apos;re making a
              python environment that can run real code, right in your browser.
            </p>
            <p className="text-xl text-gray-500">
              It&apos;s more fun to build in public. :-)
            </p>
          </div>
        </div>
      </div>

      <Sandbox />
    </>
  );
};

export default sandbox;
