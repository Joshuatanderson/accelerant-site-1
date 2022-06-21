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

interface PostProps {
  post: SanityDocument;
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
        console.warn("undefined type");
        return null;
      }
    },
  },
};

export default function Post({ post }: PostProps) {
  const imageProps = useNextSanityImage(client, post?.mainImage);

  return (
    <Layout title="Blog" rootPath="/blog">
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
          <h1>{post.title}</h1>
          <p>
            <span>{post?.author?.name}</span>
            <br />
            <span>{new Date(post._createdAt).toLocaleDateString()}</span>
          </p>
          <article>
            {post?.body && (
              <PortableText value={post?.body} components={components} />
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
  const posts = await client
    .fetch(
      `*[_type == "post" && "${params.slug}" == slug.current]{
        _createdAt,
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

interface slug {
  current: string;
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
  // const paths = await client.fetch(
  //   `*[_type == "post" && slugFieldName.current == ${slug}]`
  // );

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
