import React, { useEffect, useRef, useState } from "react";
import groq from "groq";
import { SanityDocument } from "@sanity/client";

import { client } from "../utils/sanity";
import Short from "../components/Short";

interface Shorts {
  shorts: SanityDocument[];
}

export async function getStaticProps() {
  const shorts = await client
    .fetch(
      groq`*[_type == "videoBlogPost" && isShort == true]{
        title,
        description,
        slug,
        _createdAt,
        _id,
        video{asset->},
        document
      }`
    )
    .catch(console.error);

  return {
    props: {
      shorts,
    },
  };
}

const Shorts = ({ shorts }: Shorts) => {
  const container = useRef(null);

  useEffect(() => {
    window.scrollTo({
      // @ts-ignore
      top: container?.current?.offsetTop || 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const makeVideos = (shorts: SanityDocument[]) => {
    return shorts.map((short: SanityDocument) => {
      console.log(short);
      return (
        <Short
          key={short.video.asset._id}
          title={short.title}
          id={short._id}
          description={short.description}
          playbackId={short?.video?.asset?.playbackId}
        />
      );
    });
  };

  return (
    <div
      className={`mx-auto sm:py-4 sm:px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24`}
    >
      <div className="mx-auto py-4 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <h1 className="text-4xl font-bold leading-tight">Shorts</h1>
      </div>

      <div
        ref={container}
        className="flex flex-col snap-y snap-mandatory h-screen w-full overflow-y-auto"
      >
        {makeVideos(shorts)}
      </div>
    </div>
  );
};

export default Shorts;
