import Link from "next/link";
import Layout from "../components/Layout";
import { SanityDocument } from "@sanity/client";

import { client } from "../utils/sanity";

interface Blog {
  posts: SanityDocument[];
}

export async function getStaticProps() {
  const posts = await client
    .fetch(
      `*[_type == "post"]{
        title,
        slug,
        excerpt,
        _createdAt,
        _id,
        mainImage{
          asset->{
          _id,
          url
        }
      }
    }`
    )
    .catch(console.error);

  return {
    props: {
      posts,
    },
  };
}

export default function Blog({ posts }: Blog) {
  return (
    <Layout>
      {posts.map((post) => (
        <article key={post._id}>
          <header>
            <h6>
              <Link href={"/post/[slug]"} as={`/post/${post.slug.current}`}>
                <a>{post.title}</a>
              </Link>
            </h6>
            <span className="mb-4 text-sm">{post._createdAt}</span>
          </header>
          <section>
            <p className="mb-8">{post.excerpt}</p>
          </section>
        </article>
      ))}
    </Layout>
  );
}
