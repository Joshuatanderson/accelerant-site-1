import React, { useRef } from "react";

import { client } from "../utils/sanity";
import dynamic from "next/dynamic";

const ReactHlsPlayer = dynamic(() => import("react-hls-player"), {
  ssr: false,
});

interface ShortProps {
  playbackId: string;
  title: string;
  description?: string;
}

const Short = ({ playbackId, title, description }: ShortProps) => {
  const playerRef = useRef(null);

  return (
    <div className="flex">
      <div className="mx-auto mr-4 py-4 sm:block sm:w-1/2">
        <p className="text-xl font-bold">{title}</p>
        {description && <p className="text-xl text-gray-500">{description}</p>}
      </div>
      <ReactHlsPlayer
        className="snap-start sm:w-1/2"
        playerRef={playerRef}
        // TODO: replace with correct id fetching mechanism
        src={`https://stream.mux.com/${playbackId}.m3u8`}
        autoPlay={false}
        controls={true}
        width="100%"
        height={200}
      />
    </div>
  );
};

export default Short;
