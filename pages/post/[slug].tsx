import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import { PortableText } from "@portabletext/react";

// import { FrontMatter, Post as PostProps } from "../../types/blogPost";
import Layout from "../../components/Layout";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "../../utils/sanity";
import { SanityDocument } from "@sanity/client";
import { urlFor } from "../../utils/urlFor";
import { Skeleton } from "@mui/material";

interface PostProps {
  post: SanityDocument;
}

interface Context {
  params: {
    slug: string;
  };
}

const byline = (author: string, date: string) =>
  `${author}.  Last updated on ${date}.`;

const mdImage = (img: any) =>
  img.title ? (
    <figure>
      <Image {...img} width={1} height={1} layout="responsive" />
      <div className="flex flex-col items-center justify-center">
        <div className="text-center">
          <figcaption>{img.title}</figcaption>
        </div>
      </div>
    </figure>
  ) : (
    <Image {...img} width={1} height={1} layout="responsive" />
  );

export default function Post({ post }: PostProps) {
  const imageProps = useNextSanityImage(client, post?.mainImage);
  return (
    <Layout>
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
          <article>
            {post && (
              <PortableText
                value={post?.body}
                components={components}
              />
            )}
          </article>
          <Image {...imageProps} width={1} height={1} layout="responsive" />
        </>
      )}
    </Layout>
  );
}

export async function getStaticProps(context: Context) {
  const posts = await client
    .fetch(
      `*[_type == "post" && "${context.params.slug}" == slug.current]{
        body,
        title,
        author,
        slug,
        date,
        mainImage{asset->{_id,url}}}`
    )
    .catch((err) => console.error(err));

  console.log(posts[0]?.mainImage);

  return {
    props: {
      post: posts[0],
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
