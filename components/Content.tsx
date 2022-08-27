import { Skeleton } from "@mui/material";
import { PortableText } from "@portabletext/react";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import React from "react";
import Layout from "./Layout";

interface ContentProps {
  content: SanityDocument;
  root: string;
  title: string;
  I;
}

export default function Content({
  post,
  root,
  title,
  imageProps,
}: ContentProps) {
  return (
    <Layout title={title} rootPath={`/${root}`}>
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
