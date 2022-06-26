import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { findDOMNode } from "react-dom";

const people = {
  pronoy: {
    display: "Pronoy Datta",
    code: "pronoy",
    slug: "pronoy",
  },
  joshua: {
    display: "Joshua Anderson",
    code: "joshua",
    slug: "joshua",
  },
};

interface ContactProps {
  slug: string;
  display: string;
  code: string;
}

interface GetStaticPropsParams {
  params: {
    slug: keyof typeof people;
  };
}

export default function Contact({ display, code, slug }: ContactProps) {
  const downloadLink = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (code) {
      downloadLink?.current?.click();
    }
  }, [code]);

  return (
    <div>
      <div className="mx-auto py-4 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <h1 className="text-4xl font-bold leading-tight">{display}</h1>
      </div>

      <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <p className="text-xl text-gray-500">
              A contact card should automatically download. If not, please click
              below.
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto py-4 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24 flex justify-between">
        <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none ">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-aDark hover:bg-aPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <a
              download={display}
              ref={downloadLink}
              href={`/cards/${code}.vcf`}
            >
              Download
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths(slug: any) {
  const people = ["joshua", "pronoy"];
  return {
    paths: people.map((slug) => ({
      params: {
        slug: `${slug}`,
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }: GetStaticPropsParams) {
  const person = people[params.slug];
  return {
    props: {
      slug: params?.slug,
      display: person?.display,
      code: person?.code,
    },
  };
}
