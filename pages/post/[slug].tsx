import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";

// import { FrontMatter, Post as PostProps } from "../../types/blogPost";
import Layout from "../../components/Layout";
import Image from "next/image";
import { client } from "../../utils/sanity";
import { SanityDocument } from "@sanity/client";
import { SignLanguageTwoTone } from "@mui/icons-material";

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
  return (
    <Layout>
      <article>
        {/* <ReactMarkdown
          components={{ img: mdImage }}
          remarkPlugins={[remarkGfm, remarkUnwrapImages]}
        > */}
        {/* <h2>{post.title}</h2>
        {post.body} */}
        {/* </ReactMarkdown> */}
      </article>
    </Layout>
  );
}

export async function getStaticProps(context: Context) {
  const post = await client
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
  console.log(post);

  return {
    props: {
      post,
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
