import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";

import { Post as PostProps } from "../../types/blogPost";
import Layout from "../../components/Layout";
import Image from "next/image";

interface GetStaticProps {
  params: {
    slug: string;
  };
}

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

export default function Post({ content, frontmatter }: PostProps) {
  return (
    <Layout>
      <article>
        <ReactMarkdown
          components={{ img: mdImage }}
          remarkPlugins={[remarkGfm, remarkUnwrapImages]}
        >
          {content}
        </ReactMarkdown>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync("content/posts");

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }: GetStaticProps) {
  const markdownWithMetadata = fs
    .readFileSync(path.join("content/posts", slug + ".md"))
    .toString();

  const { data, content } = matter(markdownWithMetadata);

  // Convert post date to format: Month day, Year
  // const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(data.updatedAt).toLocaleDateString(
    "en-US"
    // options
  );

  const frontmatter = {
    ...data,
    date: formattedDate,
  };

  return {
    props: {
      content: `# ${data.title}\n${content}`,
      frontmatter,
    },
  };
}
