import Link from "next/link";
import React from "react";

const Contact = () => {
  return (
    <section>
      <div className="mx-auto py-4 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <h1 className="text-4xl font-bold leading-tight">Say hello</h1>
      </div>
      <div className="mx-auto py-4 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24 flex justify-between">
        <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none ">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-aDark hover:bg-aPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Link href="mailto:joshua@acceleranteducation.com">Email</Link>
          </button>
        </div>
        {/* <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-aDark hover:bg-aPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Link href="/phone">Phone</Link>
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default Contact;
