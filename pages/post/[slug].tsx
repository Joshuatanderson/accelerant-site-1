import React from "react";
import { PortableText } from "@portabletext/react";

import Layout from "../../components/Layout";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "../../utils/sanity";
import dynamic from "next/dynamic";
import { SanityDocument } from "@sanity/client";
import { Skeleton } from "@mui/material";

const ReactHlsPlayer = dynamic(() => import("react-hls-player"), {
  ssr: false,
});
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
    videoBlogPost: (document: any) => {
      const playerRef = React.useRef<HTMLVideoElement>(null);

      return (
        <ReactHlsPlayer
          playerRef={playerRef}
          // TODO: replace with correct id fetching mechanism
          src={`https://stream.mux.com/${document?.value?.video?.asset?.playbackId}.m3u8`}
          autoPlay={false}
          controls={true}
          width="100%"
          height="auto"
        />
      );
    },
    undefined: (document: any) => {
      {
        console.log("undefined type");
        return <></>;
      }
    },
  },
};

// const byline = (author: string, date: string) =>
//   `${author}.  Last updated on ${date}.`;

// const mdImage = (img: any) =>
//   img.title ? (
//     <figure>
//       <Image {...img} width={1} height={1} layout="responsive" />
//       <div className="flex flex-col items-center justify-center">
//         b
//         <div className="text-center">
//           <figcaption>{img.title}</figcaption>
//         </div>
//       </div>
//     </figure>
//   ) : (
//     <Image {...img} width={1} height={1} layout="responsive" />
//   );

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

export async function getStaticProps(context: Context) {
  const posts = await client
    .fetch(
      `*[_type == "post" && "${context.params.slug}" == slug.current]{
        _createdAt,
        body[]{
          _type == 'videoBlogPost' => {
            video{asset->},
            _type,
            title,
            ...
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

  console.log(posts[0]);

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
