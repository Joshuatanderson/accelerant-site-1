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
import Sandbox from "../../components/Sandbox";
import { portableTextComponents } from "../../utils/portableTextComponents";

interface contentProps {
  content: SanityDocument;
}

interface Context {
  params: {
    slug: string;
  };
}

export default function Content({ content }: contentProps) {
  const imageProps: any = useNextSanityImage(client, content?.mainImage);
  console.log(content);
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
          <h1 className="text-4xl font-bold leading-tight">{content.title}</h1>
          <article>
            {content?.body && (
              <PortableText
                value={content?.body}
                components={portableTextComponents}
              />
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
        _createdAt,
        body[]{
          _type == 'videoBlogPost' => {
            ...,
            video{asset->},
            _type,
          },
          _type == "image" => {
            ...,
            asset->,
            _type,
          },
          _type != 'videoBlogPost' && _type != "image" => {
            ...
          },
        },
        title,
        author->,
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
