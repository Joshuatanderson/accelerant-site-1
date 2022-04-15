import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import Layout from "../components/Layout";
import { Blog as BlogProps } from "../types/blogPost";

export default function Blog({ posts }: BlogProps) {
  return (
    <Layout>
      {posts.map(({ frontmatter: { title, description, date }, slug }) => (
        <article key={title}>
          <header>
            <h6>
              <Link href={"/post/[slug]"} as={`/post/${slug}`}>
                <a>{title}</a>
              </Link>
            </h6>
            <span className="mb-4 text-sm">{date}</span>
          </header>
          <section>
            <p className="mb-8">{description}</p>
          </section>
        </article>
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(`${process.cwd()}/content/posts`);

  const posts = files.map((filename) => {
    const markdownWithMetadata = fs
      .readFileSync(`content/posts/${filename}`)
      .toString();

    const { data } = matter(markdownWithMetadata);

    // Convert post date to format: Month day, Year
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(data.updatedAt).toLocaleDateString(
      "en-US"
      // options
    );

    const frontmatter = {
      ...data,
      date: formattedDate,
    };

    return {
      slug: filename.replace(".md", ""),
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
}
