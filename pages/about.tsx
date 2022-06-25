import Image from "next/image";
import Link from "next/link";
import React from "react";
import Partners from "../components/Partners";
import Team from "../components/Team";

const About = () => {
  return (
    <div>
      <div className="mx-auto py-4 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        {/* <div className="space-y-12"> */}
        <h1 className="text-4xl font-bold leading-tight">About</h1>
        {/* </div> */}
      </div>
      <section>
        <div className="mx-auto py-4 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Our Story
              </h2>
              <p className="text-xl text-gray-500">
                The seed for Accelerant was planted when our founder talked with
                educators across the country and realized that millions of
                children have no access to foundational computer science
                courses. As a self-taught developer, he knew that learning to
                code was really difficult - especially when done outside of a
                well-planned pedagogical system. Accelerant was born out of a
                desire to give equitable access to computer science education to
                everyone.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Team />
      </section>
      <section></section>
      <section>
        <Partners />

        <div className="mx-auto py-4 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24 flex justify-between">
          <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none ">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-aDark hover:bg-aPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Link href="/success-stories">success stories</Link>
            </button>
          </div>
          <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-aDark hover:bg-aPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Link href="/contact">contact us</Link>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
