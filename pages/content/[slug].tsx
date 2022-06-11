import React from "react";
import { PortableText } from "@portabletext/react";

import Layout from "../../components/Layout";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "../../utils/sanity";
import { SanityDocument } from "@sanity/client";
import { Skeleton } from "@mui/material";
import VideoBlogPost from "../../components/VideoBlogPost";
import groq from "groq";
import { Code } from "../../components/Code";

interface contentProps {
  content: SanityDocument;
}

interface Context {
  params: {
    slug: string;
  };
}

const components = {
  types: {
    videoBlogPost: (document: any) => <VideoBlogPost document={document} />,
    code: (document: any) => <Code document={document} />,
    undefined: (document: any) => {
      {
        console.log("undefined type");
        return null;
      }
    },
  },
};

export default function content({ content }: contentProps) {
  const imageProps = useNextSanityImage(client, content?.mainImage);

  return (
    <Layout title="Content" rootPath="/content">
      {!content && (
        <>
          <Skeleton variant="text" height={50} animation="wave" />
          <Skeleton variant="text" animation="wave" />
          <Skeleton variant="text" animation="wave" />
          <Skeleton variant="text" animation="wave" />
          <Skeleton variant="rectangular" height={300} animation="wave" />
        </>
      )}

      {content && (
        <>
          <h1>{content.title}</h1>
          <article>
            {content?.body && (
              <PortableText value={content?.body} components={components} />
            )}
          </article>
          {imageProps && (
            <Image {...imageProps} width={1} height={1} layout="responsive" />
          )}
        </>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params }: Context) {
  // Fuck this shit.  Apparently, destructuring in GROQ works in the opposite direction from JS.  Ick.
  const contents = await client
    .fetch(
      groq`*[_type == "post" && "${params.slug}" == slug.current]{
        body[]{
          _type == 'videoBlogPost' => {
            ...,
            video{asset->},
            _type,
          },
          _type != 'videoBlogPost' => {
            ...
          },
        },
        title,
        category,
        mainImage{asset->{_id,url}},
      }`
    )
    .catch((err) => console.error(err));

  // this is done to prevent build errors on JSON serialization
  const stringifiedContent = JSON.stringify(contents[0], (key, val) => {
    if (val === undefined) {
      return null;
    }
    return val;
  });

  return {
    props: {
      content: JSON.parse(stringifiedContent),
    },
  };
}

interface slug {
  current: string;
}

export async function getStaticPaths(slug: string) {
  const contents = await client
    .fetch(
      `*[_type == "post"]{ 
        slug 
      }
  `
    )
    .catch((err) => console.error(err));
  const contentSlugs = contents.map((content: SanityDocument) => content.slug);

  return {
    paths: contentSlugs.map((slug: slug) => ({
      params: {
        sanitySlug: slug.current,
        slug: `/content/${slug.current}`,
      },
    })),
    fallback: true,
  };
}
