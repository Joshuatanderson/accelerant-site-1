import fs from "fs";
import matter from "gray-matter";
import Layout from "../components/Layout";

interface Blog {
  posts: Post[];
}

interface Post {
  frontmatter: FrontMatter;
}

interface FrontMatter {
  title: string;
  description: string;
  date: string;
}

export default function Blog({ posts }: Blog) {
  return (
    <Layout>
      {posts.map(({ frontmatter: { title, description, date } }) => (
        <article key={title}>
          <header>
            <h3 className="mb-1 text-3xl font-semibold text-orange-600">
              {title}
            </h3>
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
      //   options
    );

    const frontmatter = {
      ...data,
      date: formattedDate,
    };
    console.log(frontmatter.date);

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
