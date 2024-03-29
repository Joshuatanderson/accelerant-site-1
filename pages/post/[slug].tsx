import React from "react";
import { PortableText } from "@portabletext/react";

import Layout from "../../components/Layout";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "../../utils/sanity";
import { SanityDocument } from "@sanity/client";
import { Skeleton } from "@mui/material";
import groq from "groq";
import { portableTextComponents } from "../../utils/portableTextComponents";
import Sandbox from "../../components/Sandbox";
import Script from "next/script";

interface PostProps {
  post: SanityDocument;
}

interface Context {
  params: {
    slug: string;
  };
}

export default function Post({ post }: PostProps) {
  const imageProps: any = useNextSanityImage(client, post?.mainImage);

  return (
    <Layout title="Blog" rootPath="/blog">
      <Sandbox isP5={true} />
      {!post && (
        <>
          <Skeleton variant="text" height={50} animation="wave" />
          <Skeleton variant="text" animation="wave" />
          <Skeleton variant="text" animation="wave" />
          <Skeleton variant="text" animation="wave" />
          <Skeleton variant="rectangular" height={300} animation="wave" />
        </>
      )}

      {post && (
        <>
          <h1 className="text-4xl font-bold leading-tight">{post.title}</h1>
          <p>
            <span className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              {post?.author?.name}
            </span>
            <br />
            <span>{new Date(post._createdAt).toLocaleDateString()}</span>
          </p>
          <article>
            {post?.body && (
              <PortableText
                value={post?.body}
                components={portableTextComponents}
              />
            )}
          </article>
          {/* <script
            type="text/p5"
            data-p5-version="1.4.2"
            data-autoplay
            data-height="600"
            data-preview-width="600"
            // @ts-ignore
            // src={file}
            // src={new File([new Blob([code])], "code.js", { type: "text/javascript" })}
          /> */}
          <Image {...imageProps} width={1} height={1} layout="responsive" />;
        </>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params }: Context) {
  // Fuck this shit.  Apparently, destructuring in GROQ works in the opposite direction from JS.  Ick.
  const posts = await client
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
  const stringifiedPost = JSON.stringify(posts[0], (key, val) => {
    if (val === undefined) {
      return null;
    }
    return val;
  });

  return {
    props: {
      post: JSON.parse(stringifiedPost),
    },
  };
}

export async function getStaticPaths(slug: string) {
  const posts = await client
    .fetch(
      `*[_type == "post"]{ 
        slug 
      }
  `
    )
    .catch((err) => console.error(err));
  const postSlugs = posts.map((post: SanityDocument) => post.slug);
  return {
    paths: postSlugs.map((slug: slug) => ({
      params: {
        sanitySlug: slug.current,
        slug: `/post/${slug.current}`,
      },
    })),
    fallback: true,
  };
}
