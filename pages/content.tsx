import Link from "next/link";
import Layout from "../components/Layout";
import { SanityDocument } from "@sanity/client";

import { client } from "../utils/sanity";
import groq from "groq";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthUser";
import { useRouter } from "next/router";

interface Content {
  contents: SanityDocument[];
}

export async function getStaticProps() {
  const contents = await client
    .fetch(
      // TODO: break out post && content into separate types?  Or no?
      groq`*[_type == "post" && isPublic == false]{
        title,
        slug,
        excerpt,
        _createdAt,
        _id,
        isPublic,
        categories[]->{code}
      }`
    )
    .catch(console.error);

  console.log(contents);

  return {
    props: {
      contents,
    },
  };
}

export default function Content({ contents }: Content) {
  const { authUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authUser) {
    } else {
      router.push("/login");
    }
  }, []);

  console.log(contents);
  return (
    <Layout title="Content" rootPath="/content">
      {contents.map((content) => (
        <article key={content._id}>
          <header>
            <h6>
              <Link
                href={"/content/[slug]"}
                as={`/content/${content.slug.current}`}
              >
                <a>{content.title}</a>
              </Link>
            </h6>
            <span className="mb-4 text-sm">{content._createdAt}</span>
          </header>
          <section>
            <p className="mb-8">{content.excerpt}</p>
          </section>
        </article>
      ))}
    </Layout>
  );
}
