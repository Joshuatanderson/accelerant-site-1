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
      <h1>{display}</h1>
      <p>
        A contact card should automatically download. If not, please click
        below.
      </p>
      <button>
        {/* <Link> */}
        <a download={display} ref={downloadLink} href={`/cards/${code}.vcf`}>
          Download
        </a>
        {/* </Link> */}
      </button>
    </div>
  );
}

export async function getStaticPaths(slug: any) {
  const people = ["joshua", "pronoy"];
  return {
    paths: people.map((slug) => ({
      params: {
        slug: `/post/${slug}`,
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }: GetStaticPropsParams) {
  const person = people[params.slug];
  return {
    props: {
      slug: params.slug,
      display: person.display,
      code: person.code,
    },
  };
}
